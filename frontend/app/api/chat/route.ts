import { NextResponse } from 'next/server';
import { chat, getFallbackResponse } from '@/app/lib/rag-service';

// Ensure this route runs on Node.js (not edge)
export const runtime = 'nodejs';

type ChatRequest = {
  message: string;
  thread_id?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequest;
    const { message, thread_id } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid request: message is required' },
        { status: 400 }
      );
    }

    // Check for API keys
    const openaiKey = process.env.OPENAI_API_KEY;
    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;

    if (!openaiKey || !assistantId || !vectorStoreId) {
      console.error('Missing OpenAI configuration:', {
        hasKey: !!openaiKey,
        hasAssistant: !!assistantId,
        hasVectorStore: !!vectorStoreId
      });

      return NextResponse.json({
        success: true,
        response: getFallbackResponse(),
        model: 'fallback',
        rag: {
          enabled: false,
          error: 'OpenAI not configured'
        }
      });
    }

    // Extract actual user query (remove system prefix if present)
    const userQuery = message.split('User:').pop()?.trim() || message;

    try {
      console.log('Sending message to OpenAI Assistant...');
      console.log('Thread ID:', thread_id || 'new thread');
      console.log('Query:', userQuery);

      // Chat with Assistant using File Search
      const result = await chat(userQuery, thread_id);

      console.log('✓ Received response from Assistant');
      console.log('Thread ID:', result.threadId);
      console.log('Citations:', result.citations.length);

      return NextResponse.json({
        success: true,
        response: result.response,
        thread_id: result.threadId,
        model: result.model,
        rag: {
          enabled: true,
          citations: result.citations.length,
          threadBased: true
        }
      });
    } catch (error) {
      // If OpenAI fails, return fallback response
      console.error('OpenAI Assistant error:', error);

      return NextResponse.json({
        success: true,
        response: getFallbackResponse(),
        model: 'fallback',
        rag: {
          enabled: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Chat API error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
