import { NextResponse } from 'next/server';
import { retrieveContext, buildRAGPrompt, getFallbackPrompt } from '@/app/lib/rag-service';

// Ensure this route runs on Node.js (not edge)
export const runtime = 'nodejs';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatRequest = {
  message: string;
  conversation_history?: ChatMessage[];
};

// Helper function to build fallback prompt when database is not available
function buildFallbackPrompt(userQuery: string, conversation_history?: ChatMessage[]): string {
  const systemPrompt = `You are an assistant that responds to questions about Abdullah Malik, the portfolio owner. Answer concisely, in a friendly and professional tone, only using information provided below. If unsure or the answer is not included, clearly state you are unsure.

**Portfolio Owner Information:**
- Name: Abdullah Malik
- Profession: Software Engineer and AI Enthusiast
- Skills/Technologies: HTML, CSS, JavaScript, TypeScript, Python, React, Next.js, OpenAI Agent SDK, N8n, FastAPI, Docker, Git
- Experience: 2+ years
- Education: Panaversity, PIAIC
- Main Repository: https://github.com/AbdullahMalik17/AbdullahMalik17
- Web Development Projects: https://github.com/AbdullahMalik17/Projects-of-html
- AI Projects: https://github.com/AbdullahMalik17/Agentic_AI/tree/main/_Projects
- Contact: LinkedIn: https://www.linkedin.com/in/muhammad-abdullah-athar

**Response Guidelines:**
- Use only the details above
- Do not speculate. If a fact is not provided, reply "I am unsure"
- Keep responses concise, friendly, and professional
- If unsure, suggest connecting via LinkedIn

**Output Format:**
- Reply with 1-3 sentences, using plain text
- Do not include bullet points or headings`;

  const historyText = (conversation_history || [])
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');

  return `${systemPrompt}\n\n${historyText ? historyText + '\n\n' : ''}User: ${userQuery}\nAssistant:`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequest;
    const { message, conversation_history } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid request: message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Server not configured: GEMINI_API_KEY missing' },
        { status: 503 }
      );
    }

    // Extract actual user query (remove system prefix if present)
    const userQuery = message.split('User:').pop()?.trim() || message;

    // RAG: Retrieve relevant context (with error handling for missing database)
    let prompt: string;
    let ragEnabled = false;
    let ragContext;

    try {
      console.log('Retrieving context for query:', userQuery);
      ragContext = await retrieveContext(userQuery, 5, 0.5);

      console.log(`Retrieved ${ragContext.retrievedChunks.length} relevant chunks`);
      console.log('Sources:', ragContext.sources);

      // Build prompt with RAG context
      if (ragContext.retrievedChunks.length > 0) {
        prompt = buildRAGPrompt(userQuery, ragContext, conversation_history);
        ragEnabled = true;
      } else {
        // Fallback to basic prompt if no context found
        console.warn('No relevant context found, using fallback');
        prompt = buildFallbackPrompt(userQuery, conversation_history);
      }
    } catch (error) {
      // If RAG fails (e.g., database not configured), use fallback prompt
      console.warn('RAG retrieval failed, using fallback prompt:', error);
      prompt = buildFallbackPrompt(userQuery, conversation_history);
    }

    // Generate response with Gemini
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent(prompt);
    const text =
      result.response?.text?.() ??
      (
        (Array.isArray((result as any).candidates) &&
          (result as any).candidates[0]?.content?.parts?.[0]?.text) ||
        'I apologize, but I could not generate a response.'
      );

    return NextResponse.json({
      success: true,
      response: text,
      model: 'gemini-2.5-flash',
      rag: ragEnabled && ragContext ? {
        chunksRetrieved: ragContext.retrievedChunks.length,
        sources: ragContext.sources
      } : {
        chunksRetrieved: 0,
        sources: [],
        fallback: true
      }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Chat API error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}


