/**
 * OpenAI Client Configuration
 * Centralized OpenAI client initialization
 */

import OpenAI from 'openai';

/**
 * Initialize OpenAI client with API key from environment
 */
export function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured in environment variables');
  }

  return new OpenAI({
    apiKey
  });
}

/**
 * Get Assistant ID from environment
 */
export function getAssistantId(): string {
  const assistantId = process.env.OPENAI_ASSISTANT_ID;

  if (!assistantId) {
    throw new Error('OPENAI_ASSISTANT_ID is not configured in environment variables');
  }

  return assistantId;
}

/**
 * Get Vector Store ID from environment
 */
export function getVectorStoreId(): string {
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;

  if (!vectorStoreId) {
    throw new Error('OPENAI_VECTOR_STORE_ID is not configured in environment variables');
  }

  return vectorStoreId;
}
