/**
 * OpenAI Vector Store & Assistant Operations
 * Handles thread management, file uploads, and Assistant interactions
 */

import { getOpenAIClient, getAssistantId, getVectorStoreId } from './openai-client';

export interface ChatResponse {
  response: string;
  threadId: string;
  citations: string[];
  model: string;
}

export interface UploadResult {
  success: boolean;
  filesUploaded: number;
  fileIds: string[];
  error?: string;
}

/**
 * Create a new conversation thread
 */
export async function createThread(): Promise<string> {
  const openai = getOpenAIClient();

  const thread = await openai.beta.threads.create();
  return thread.id;
}

/**
 * Add a message to a thread
 */
export async function addMessageToThread(
  threadId: string,
  content: string
): Promise<void> {
  const openai = getOpenAIClient();

  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content
  });
}

/**
 * Run Assistant on a thread and wait for completion
 */
export async function runAssistantOnThread(
  threadId: string
): Promise<ChatResponse> {
  const openai = getOpenAIClient();
  const assistantId = getAssistantId();

  // Start the assistant run
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId
  });

  // Poll for completion
  let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);

  while (runStatus.status === 'queued' || runStatus.status === 'in_progress') {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
    runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
  }

  // Check for errors
  if (runStatus.status === 'failed') {
    throw new Error(`Assistant run failed: ${runStatus.last_error?.message || 'Unknown error'}`);
  }

  if (runStatus.status === 'cancelled') {
    throw new Error('Assistant run was cancelled');
  }

  if (runStatus.status === 'expired') {
    throw new Error('Assistant run expired');
  }

  // Get the assistant's response
  const messages = await openai.beta.threads.messages.list(threadId, {
    order: 'desc',
    limit: 1
  });

  const lastMessage = messages.data[0];

  if (!lastMessage || lastMessage.role !== 'assistant') {
    throw new Error('No assistant response found');
  }

  // Extract text and citations
  const textContent = lastMessage.content.filter(c => c.type === 'text');
  const responseText = textContent
    .map(c => (c.type === 'text' ? c.text.value : ''))
    .join('\n');

  const citations: string[] = [];
  for (const content of textContent) {
    if (content.type === 'text' && content.text.annotations) {
      for (const annotation of content.text.annotations) {
        if (annotation.type === 'file_citation') {
          citations.push(annotation.file_citation.file_id);
        }
      }
    }
  }

  return {
    response: responseText,
    threadId,
    citations,
    model: runStatus.model || 'gpt-4o-mini'
  };
}

/**
 * Main chat function - handles thread creation/retrieval and message processing
 */
export async function chatWithAssistant(
  userMessage: string,
  threadId?: string
): Promise<ChatResponse> {
  const openai = getOpenAIClient();

  try {
    // Create new thread or use existing one
    let currentThreadId = threadId;

    if (!currentThreadId) {
      currentThreadId = await createThread();
      console.log(`Created new thread: ${currentThreadId}`);
    } else {
      // Verify thread exists
      try {
        await openai.beta.threads.retrieve(currentThreadId);
      } catch {
        console.warn(`Thread ${currentThreadId} not found, creating new one`);
        currentThreadId = await createThread();
      }
    }

    // Add user message to thread
    await addMessageToThread(currentThreadId, userMessage);

    // Run assistant and get response
    const response = await runAssistantOnThread(currentThreadId);

    return response;
  } catch (error) {
    console.error('Error in chatWithAssistant:', error);
    throw error;
  }
}

/**
 * Upload portfolio files to Vector Store
 */
export async function uploadPortfolioToVectorStore(
  files: Array<{ filename: string; content: string }>
): Promise<UploadResult> {
  const openai = getOpenAIClient();
  const vectorStoreId = getVectorStoreId();

  try {
    const fileIds: string[] = [];

    console.log(`Uploading ${files.length} files to Vector Store...`);

    // Upload each file
    for (const file of files) {
      try {
        const uploadedFile = await openai.files.create({
          file: new File([file.content], file.filename, { type: 'text/plain' }),
          purpose: 'assistants'
        });

        fileIds.push(uploadedFile.id);
        console.log(`✓ Uploaded: ${file.filename} → ${uploadedFile.id}`);
      } catch (error) {
        console.error(`✗ Failed to upload ${file.filename}:`, error);
        // Continue with other files
      }
    }

    if (fileIds.length === 0) {
      return {
        success: false,
        filesUploaded: 0,
        fileIds: [],
        error: 'No files were successfully uploaded'
      };
    }

    // Add files to Vector Store
    console.log(`Adding ${fileIds.length} files to Vector Store...`);
    // @ts-expect-error - TypeScript types for vectorStores.fileBatches are not up to date with the API
    await openai.beta.vectorStores.fileBatches.createAndPoll(vectorStoreId, {
      file_ids: fileIds
    });

    console.log('✓ Files added to Vector Store successfully');

    return {
      success: true,
      filesUploaded: fileIds.length,
      fileIds
    };
  } catch (error) {
    console.error('Error uploading to Vector Store:', error);
    return {
      success: false,
      filesUploaded: 0,
      fileIds: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get Vector Store file count
 */
export async function getVectorStoreFileCount(): Promise<number> {
  const openai = getOpenAIClient();
  const vectorStoreId = getVectorStoreId();

  try {
    // @ts-expect-error - TypeScript types for vectorStores are not up to date with the API
    const vectorStore = await openai.beta.vectorStores.retrieve(vectorStoreId);
    return vectorStore.file_counts.completed || 0;
  } catch (error) {
    console.error('Error getting Vector Store file count:', error);
    return 0;
  }
}

/**
 * Clear all files from Vector Store
 */
export async function clearVectorStore(): Promise<boolean> {
  const openai = getOpenAIClient();
  const vectorStoreId = getVectorStoreId();

  try {
    // List all files in the Vector Store
    // @ts-expect-error - TypeScript types for vectorStores.files are not up to date with the API
    const files = await openai.beta.vectorStores.files.list(vectorStoreId);

    // Delete each file
    for (const file of files.data) {
      // @ts-expect-error - TypeScript types for vectorStores.files are not up to date with the API
      await openai.beta.vectorStores.files.del(vectorStoreId, file.id);
      console.log(`Deleted file: ${file.id}`);
    }

    console.log(`Cleared ${files.data.length} files from Vector Store`);
    return true;
  } catch (error) {
    console.error('Error clearing Vector Store:', error);
    return false;
  }
}
