/**
 * RAG Service
 * Handles retrieval-augmented generation logic
 */

import { generateEmbedding } from './embedding-utils';
import { searchSimilarContent } from './db';

export interface RetrievalResult {
  content: string;
  contentType: string;
  category?: string;
  similarity: number;
  metadata?: any;
}

export interface RAGContext {
  query: string;
  retrievedChunks: RetrievalResult[];
  contextText: string;
  sources: string[];
}

/**
 * Retrieve relevant context for a user query
 */
export async function retrieveContext(
  query: string,
  topK: number = 5,
  similarityThreshold: number = 0.5
): Promise<RAGContext> {
  try {
    // 1. Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);

    // 2. Search for similar content
    const searchResult = await searchSimilarContent(queryEmbedding, topK);

    if (!searchResult.success || searchResult.results.length === 0) {
      return {
        query,
        retrievedChunks: [],
        contextText: '',
        sources: []
      };
    }

    // 3. Filter by similarity threshold
    const relevantChunks = searchResult.results
      .filter(result => result.similarity >= similarityThreshold)
      .map(result => ({
        content: result.content,
        contentType: result.content_type,
        category: result.category,
        similarity: result.similarity,
        metadata: result.metadata
      }));

    // 4. Format context text
    const contextText = relevantChunks
      .map((chunk, idx) => `[Source ${idx + 1}] ${chunk.content}`)
      .join('\n\n');

    // 5. Extract source types
    const sources = [...new Set(relevantChunks.map(c => c.contentType))];

    return {
      query,
      retrievedChunks: relevantChunks,
      contextText,
      sources
    };
  } catch (error) {
    console.error('Error retrieving context:', error);
    return {
      query,
      retrievedChunks: [],
      contextText: '',
      sources: []
    };
  }
}

/**
 * Build enhanced prompt with RAG context
 */
export function buildRAGPrompt(
  userQuery: string,
  ragContext: RAGContext,
  conversationHistory: Array<{ role: string; content: string }> = []
): string {
  const systemPrompt = `You are an assistant that answers questions about Abdullah Malik's portfolio.
Answer concisely and professionally using ONLY the information provided in the context below.
If the answer is not in the context, politely say you don't have that information and suggest connecting via LinkedIn.

IMPORTANT RULES:
- Only use facts from the provided context
- Be friendly and professional
- Keep responses concise (2-3 sentences)
- If unsure, acknowledge it
- For contact requests, mention: LinkedIn: https://www.linkedin.com/in/muhammad-abdullah-athar

=== CONTEXT FROM PORTFOLIO ===
${ragContext.contextText || 'No relevant context found.'}
=== END CONTEXT ===`;

  // Build conversation history
  const historyText = conversationHistory
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');

  // Combine everything
  return `${systemPrompt}\n\n${historyText ? historyText + '\n\n' : ''}User: ${userQuery}\nAssistant:`;
}

/**
 * Get fallback system prompt (when RAG fails or no context found)
 */
export function getFallbackPrompt(): string {
  return `You are an assistant for Abdullah Malik's portfolio.
I apologize, but I'm having trouble accessing detailed information right now.
For accurate information, please visit:
- GitHub: https://github.com/AbdullahMalik17
- LinkedIn: https://www.linkedin.com/in/muhammad-abdullah-athar
- Portfolio: https://portfolio-ai-assistant-of-malik-five.vercel.app/

What general questions can I help you with?`;
}
