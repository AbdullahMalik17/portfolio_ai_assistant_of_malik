import { NextResponse } from 'next/server';
import { indexPortfolioContent } from '@/app/lib/indexer';
import { getVectorStoreFileCount } from '@/app/lib/openai-vector-store';

export const runtime = 'nodejs';
export const maxDuration = 60; // Allow up to 60 seconds for indexing

/**
 * POST /api/index-portfolio
 * Trigger portfolio content upload to OpenAI Vector Store
 */
export async function POST() {
  try {
    console.log('Starting portfolio indexing...');
    const result = await indexPortfolioContent();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Portfolio uploaded to Vector Store successfully',
        stats: {
          totalFiles: result.totalFiles,
          filesUploaded: result.filesUploaded,
          vectorStoreCount: result.vectorStoreCount
        }
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Indexing API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/index-portfolio
 * Check Vector Store status
 */
export async function GET() {
  try {
    // Check if OpenAI is configured
    const openaiKey = process.env.OPENAI_API_KEY;
    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;

    if (!openaiKey || !vectorStoreId) {
      return NextResponse.json({
        success: true,
        count: 0,
        status: 'not_configured',
        message: 'OpenAI Vector Store not configured'
      });
    }

    const count = await getVectorStoreFileCount();

    return NextResponse.json({
      success: true,
      count,
      status: count > 0 ? 'indexed' : 'not_indexed',
      message: count > 0 ? `${count} files in Vector Store` : 'Vector Store is empty'
    });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to check status'
      },
      { status: 500 }
    );
  }
}
