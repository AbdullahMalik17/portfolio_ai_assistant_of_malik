import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PORTFOLIO_SYSTEM_PROMPT } from '@/app/lib/portfolio-context';

export const runtime = 'nodejs';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatRequest = {
  message: string;
  history?: ChatMessage[];
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequest;
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid request: message is required' },
        { status: 400 }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      return NextResponse.json({
        success: true,
        response: getFallbackResponse(),
        model: 'fallback',
      });
    }

    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
        systemInstruction: PORTFOLIO_SYSTEM_PROMPT,
      });

      // Build conversation history for persistent memory
      const chatHistory = history.map((msg) => ({
        role: msg.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: msg.content }],
      }));

      const chat = model.startChat({ history: chatHistory });

      // Stream response
      const result = await chat.sendMessageStream(message);

      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result.stream) {
              const text = chunk.text();
              if (text) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
              }
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (err) {
            console.error('Gemini stream error:', err);
            controller.error(err);
          }
        },
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    } catch (error) {
      console.error('Gemini Chat error:', error);
      return NextResponse.json({
        success: true,
        response: getFallbackResponse(),
        model: 'fallback',
      });
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('Chat API error:', msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

function getFallbackResponse(): string {
  return `I'm Abdullah Malik's AI assistant. I can tell you about his skills, projects, and experience.

Key highlights:
- Full-Stack Developer & AI Specialist
- Built 7+ production AI projects (Digital FTE, Customer Success AI, Physical AI Platform)
- Tech: Python, FastAPI, Next.js, TypeScript, OpenAI, PostgreSQL, Kafka, Docker, Kubernetes

Ask me anything specific about his work!`;
}
