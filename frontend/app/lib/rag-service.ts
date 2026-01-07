/**
 * RAG Service (OpenAI Assistant-based)
 * Handles retrieval-augmented generation using OpenAI Assistants API
 */

import { chatWithAssistant, ChatResponse } from './openai-vector-store';

/**
 * Main chat function with Assistant
 * Uses OpenAI's Assistants API with File Search for RAG
 */
export async function chat(
  userMessage: string,
  threadId?: string
): Promise<ChatResponse> {
  return await chatWithAssistant(userMessage, threadId);
}

/**
 * Get fallback response when system is unavailable
 */
export function getFallbackResponse(): string {
  return `I apologize, but I'm having trouble accessing detailed information right now.
For accurate information about Abdullah Malik, please visit:
- LinkedIn: https://www.linkedin.com/in/muhammad-abdullah-athar
- GitHub: https://github.com/AbdullahMalik17
- Portfolio: https://portfolio-ai-assistant-of-malik-five.vercel.app/

What general questions can I help you with?`;
}

// Re-export types for convenience
export type { ChatResponse } from './openai-vector-store';
