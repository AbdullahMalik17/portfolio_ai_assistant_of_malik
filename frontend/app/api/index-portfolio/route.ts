import { NextResponse } from 'next/server';
import { indexPortfolioContent } from '@/app/lib/indexer';

export const runtime = 'nodejs';
export const maxDuration = 60; // Allow up to 60 seconds for indexing

/**
 * POST /api/index-portfolio
 * Trigger portfolio content indexing
 */
export async function POST(req: Request) {
  try {
    const { clearFirst } = await req.json().catch(() => ({ clearFirst: true }));

    const result = await indexPortfolioContent(clearFirst);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Portfolio indexed successfully',
        stats: {
          totalChunks: result.totalChunks,
          successCount: result.successCount,
          failureCount: result.failureCount,
          databaseCount: result.databaseCount
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
 * Check indexing status
 */
export async function GET() {
  try {
    const { getEmbeddingsCount } = await import('@/app/lib/db');
    const result = await getEmbeddingsCount();

    return NextResponse.json({
      success: true,
      count: result.count,
      status: result.count > 0 ? 'indexed' : 'not_indexed'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to check status' },
      { status: 500 }
    );
  }
}
