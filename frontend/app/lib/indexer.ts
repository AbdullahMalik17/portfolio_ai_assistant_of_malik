/**
 * Indexing Orchestrator
 * Handles the process of indexing portfolio content into the vector database
 */

import {
  initEmbeddingsTable,
  clearEmbeddings,
  insertEmbedding,
  createVectorIndex,
  getEmbeddingsCount
} from './db';
import { preparePortfolioChunks, generateEmbedding } from './embedding-utils';

export interface IndexingResult {
  success: boolean;
  totalChunks?: number;
  successCount?: number;
  failureCount?: number;
  databaseCount?: number;
  error?: string;
}

/**
 * Index all portfolio content into the vector database
 * @param clearFirst - Whether to clear existing embeddings before indexing
 */
export async function indexPortfolioContent(clearFirst: boolean = true): Promise<IndexingResult> {
  console.log('Starting portfolio content indexing...');

  try {
    // 1. Initialize table
    console.log('Step 1: Initializing embeddings table...');
    const initResult = await initEmbeddingsTable();
    if (!initResult.success) {
      throw new Error('Failed to initialize embeddings table');
    }

    // 2. Clear existing embeddings if requested
    if (clearFirst) {
      console.log('Step 2: Clearing existing embeddings...');
      const clearResult = await clearEmbeddings();
      if (!clearResult.success) {
        console.warn('Warning: Failed to clear embeddings, continuing anyway');
      }
    }

    // 3. Prepare content chunks
    console.log('Step 3: Preparing content chunks...');
    const chunks = preparePortfolioChunks();
    console.log(`Prepared ${chunks.length} content chunks`);

    // 4. Generate embeddings and insert
    console.log('Step 4: Generating embeddings and inserting into database...');
    let successCount = 0;
    let failureCount = 0;

    for (const chunk of chunks) {
      try {
        // Generate embedding
        const embedding = await generateEmbedding(chunk.content);

        // Insert into database
        const insertResult = await insertEmbedding(
          chunk.content,
          chunk.contentType,
          embedding,
          chunk.category,
          chunk.metadata
        );

        if (insertResult.success) {
          successCount++;
          console.log(`✓ Indexed [${chunk.contentType}]: ${chunk.content.substring(0, 50)}...`);
        } else {
          failureCount++;
          console.error(`✗ Failed to index [${chunk.contentType}]:`, insertResult.error);
        }
      } catch (error) {
        failureCount++;
        console.error(`✗ Error processing chunk [${chunk.contentType}]:`, error);
      }
    }

    // 5. Create vector index for optimal search performance
    console.log('Step 5: Creating vector index...');
    const indexResult = await createVectorIndex();
    if (!indexResult.success) {
      console.warn('Warning: Failed to create vector index, search may be slower');
    }

    // 6. Verify
    const countResult = await getEmbeddingsCount();
    console.log('\n=== Indexing Complete ===');
    console.log(`Total chunks: ${chunks.length}`);
    console.log(`Successfully indexed: ${successCount}`);
    console.log(`Failed: ${failureCount}`);
    console.log(`Database count: ${countResult.count}`);

    return {
      success: true,
      totalChunks: chunks.length,
      successCount,
      failureCount,
      databaseCount: countResult.count
    };
  } catch (error) {
    console.error('Indexing failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
