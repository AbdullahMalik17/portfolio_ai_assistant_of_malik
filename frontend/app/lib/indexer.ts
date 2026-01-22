/**
 * Indexing Orchestrator (OpenAI Vector Store)
 * Handles the process of uploading portfolio content to OpenAI Vector Store
 */

import { uploadPortfolioToVectorStore, getVectorStoreFileCount } from './openai-vector-store';
import { preparePortfolioFiles } from './embedding-utils';

export interface IndexingResult {
  success: boolean;
  totalFiles?: number;
  filesUploaded?: number;
  vectorStoreCount?: number;
  error?: string;
}

/**
 * Index all portfolio content into OpenAI Vector Store
 */
export async function indexPortfolioContent(): Promise<IndexingResult> {
  console.log('Starting portfolio content indexing to OpenAI Vector Store...');

  try {
    // 1. Prepare content files
    console.log('Step 1: Preparing portfolio files...');
    const files = preparePortfolioFiles();
    console.log(`Prepared ${files.length} portfolio files`);

    // 2. Upload to Vector Store
    console.log('Step 2: Uploading files to OpenAI Vector Store...');
    const uploadResult = await uploadPortfolioToVectorStore(files);

    if (!uploadResult.success) {
      throw new Error(uploadResult.error || 'Failed to upload files to Vector Store');
    }

    console.log(`✓ Successfully uploaded ${uploadResult.filesUploaded} files`);

    // 3. Verify
    console.log('Step 3: Verifying Vector Store...');
    const fileCount = await getVectorStoreFileCount();
    console.log(`Vector Store now contains ${fileCount} files`);

    console.log('\n=== Indexing Complete ===');
    console.log(`Total files: ${files.length}`);
    console.log(`Successfully uploaded: ${uploadResult.filesUploaded}`);
    console.log(`Vector Store count: ${fileCount}`);

    return {
      success: true,
      totalFiles: files.length,
      filesUploaded: uploadResult.filesUploaded,
      vectorStoreCount: fileCount
    };
  } catch (error) {
    console.error('Indexing failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
