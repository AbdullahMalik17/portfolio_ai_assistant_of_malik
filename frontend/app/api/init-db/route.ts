import { NextResponse } from 'next/server';
import { initContactsTable } from '@/app/lib/db';
import { indexPortfolioContent } from '@/app/lib/indexer';

export const maxDuration = 60; // Allow up to 60 seconds for init + indexing

export async function GET() {
  try {
    // Initialize contacts table (still using PostgreSQL)
    console.log('Initializing contacts table...');
    const contactsResult = await initContactsTable();

    if (!contactsResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Failed to initialize contacts table'
      }, { status: 500 });
    }

    console.log('✓ Contacts table initialized successfully');

    // Check if OpenAI is configured for vector storage
    const openaiKey = process.env.OPENAI_API_KEY;
    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;

    if (!openaiKey || !assistantId || !vectorStoreId) {
      console.warn('OpenAI not configured - skipping portfolio indexing');
      return NextResponse.json({
        success: true,
        message: 'Database initialized (contacts only)',
        indexing: 'skipped',
        note: 'OpenAI Vector Store not configured. Run setup script first.'
      });
    }

    // Auto-index portfolio content to OpenAI Vector Store
    console.log('Starting automatic portfolio indexing to OpenAI Vector Store...');
    try {
      const indexResult = await indexPortfolioContent();

      return NextResponse.json({
        success: true,
        message: 'Database initialized and portfolio indexed to OpenAI Vector Store',
        indexing: indexResult.success ? 'completed' : 'failed',
        indexStats: indexResult.success ? {
          totalFiles: indexResult.totalFiles,
          filesUploaded: indexResult.filesUploaded,
          vectorStoreCount: indexResult.vectorStoreCount
        } : { error: indexResult.error }
      });
    } catch (indexError) {
      console.error('Portfolio indexing failed:', indexError);
      return NextResponse.json({
        success: true,
        message: 'Database initialized but portfolio indexing failed',
        indexing: 'failed',
        indexError: indexError instanceof Error ? indexError.message : 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
