import { NextResponse } from 'next/server';
import { initContactsTable, initEmbeddingsTable } from '@/app/lib/db';
import { indexPortfolioContent } from '@/app/lib/indexer';

export const maxDuration = 60; // Allow up to 60 seconds for init + indexing

export async function GET() {
  try {
    // Initialize contacts table
    console.log('Initializing contacts table...');
    const contactsResult = await initContactsTable();

    // Initialize embeddings table
    console.log('Initializing embeddings table...');
    const embeddingsResult = await initEmbeddingsTable();

    if (contactsResult.success && embeddingsResult.success) {
      // Auto-index portfolio content on first deployment
      console.log('Starting automatic portfolio indexing...');
      const indexResult = await indexPortfolioContent(true);

      return NextResponse.json({
        success: true,
        message: 'Database initialized successfully',
        indexing: indexResult.success ? 'completed' : 'failed',
        indexStats: indexResult.success ? {
          totalChunks: indexResult.totalChunks,
          successCount: indexResult.successCount,
          failureCount: indexResult.failureCount,
          databaseCount: indexResult.databaseCount
        } : { error: indexResult.error }
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to initialize database tables'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
