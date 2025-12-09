import { NextResponse } from 'next/server';
import { getEmbeddingsCount } from '@/app/lib/db';
import { retrieveContext } from '@/app/lib/rag-service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || 'What are your skills?';

  try {
    // 1. Check if embeddings exist
    const countResult = await getEmbeddingsCount();

    if (countResult.count === 0) {
      return NextResponse.json({
        success: false,
        error: 'No embeddings found. Run POST /api/index-portfolio first.'
      }, { status: 400 });
    }

    // 2. Test retrieval
    const ragContext = await retrieveContext(query, 5, 0.3);

    // 3. Return test results
    return NextResponse.json({
      success: true,
      test: {
        query,
        embeddingsInDatabase: countResult.count,
        retrievedChunks: ragContext.retrievedChunks.length,
        sources: ragContext.sources,
        topResults: ragContext.retrievedChunks.map(chunk => ({
          content: chunk.content.substring(0, 100) + '...',
          type: chunk.contentType,
          category: chunk.category,
          similarity: chunk.similarity.toFixed(3)
        }))
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
