import { NextResponse } from 'next/server';
import OpenAI from 'openai';
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

const TOOLS: OpenAI.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'scroll_to_section',
      description: 'Scrolls the browser to a specific section of the portfolio (home, about, skills, certifications, projects, contact)',
      parameters: {
        type: 'object',
        properties: {
          section: {
            type: 'string',
            description: 'The target section ID: home, about, skills, certifications, projects, contact',
          },
        },
        required: ['section'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'open_resume',
      description: "Opens Abdullah Malik's resume in a new browser tab",
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'focus_contact_form',
      description: 'Scrolls to and focuses the email/name input fields in the contact form',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
];

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

    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterKey) {
      return NextResponse.json({
        success: true,
        response: getFallbackResponse(),
        model: 'fallback',
      });
    }

    try {
      const openai = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: openRouterKey,
        defaultHeaders: {
          'HTTP-Referer': 'https://portfolio-ai-assistant-of-malik.vercel.app',
          'X-Title': "Abdullah Malik Portfolio AI Assistant",
        },
      });

      const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001';

      // Build message array with system instructions and bounded history
      const messages: OpenAI.ChatCompletionMessageParam[] = [
        { role: 'system', content: PORTFOLIO_SYSTEM_PROMPT },
        ...history.slice(-8).map((msg) => ({
          role: msg.role === 'assistant' ? ('assistant' as const) : ('user' as const),
          content: msg.content,
        })),
        { role: 'user', content: message },
      ];

      const stream = await openai.chat.completions.create({
        model,
        messages,
        tools: TOOLS,
        stream: true,
        temperature: 0.6,
      });

      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            const toolCallMap = new Map<number, { name: string; arguments: string }>();

            for await (const chunk of stream) {
              const delta = chunk.choices[0]?.delta;
              if (!delta) continue;

              // Stream delta text tokens
              if (delta.content) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ text: delta.content })}\n\n`)
                );
              }

              // Accumulate streaming tool calls
              if (delta.tool_calls) {
                for (const tc of delta.tool_calls) {
                  const idx = tc.index;
                  const existing = toolCallMap.get(idx) || { name: '', arguments: '' };
                  if (tc.function?.name) existing.name = tc.function.name;
                  if (tc.function?.arguments) existing.arguments += tc.function.arguments;
                  toolCallMap.set(idx, existing);
                }
              }
            }

            // Emit accumulated tool calls once stream completes
            for (const [, call] of toolCallMap) {
              let parsedArgs = {};
              try {
                if (call.arguments) parsedArgs = JSON.parse(call.arguments);
              } catch {
                parsedArgs = {};
              }
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ action: call.name, args: parsedArgs })}\n\n`)
              );
            }

            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (err) {
            console.error('OpenRouter stream processing error:', err);
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
      console.error('OpenRouter Chat completion error:', error);
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
  return `I'm Abdullah Malik's AI Assistant. 

Here are his core highlights:
- **Education**: Pursuing BS Data Science at Islamia University of Bahawalpur (IUB). Mastered Agentic AI at Panaversity & PIAIC.
- **GitHub Honors**: Starstruck (Bronze Tier — MalikClaw 16+ Stars), Pull Shark (Hackathon 2), Pair Extraordinaire (Claude collaboration).
- **Flagship Systems**: MalikClaw (Go edge runtime <10MB RAM, MCP Market listed), Digital FTE (Cloud Sentry + Local Executive), and Customer Success AI.
- **Stack**: Python, Go, TypeScript, Next.js, Model Context Protocol (MCP), Kafka, pgvector, Docker.

Feel free to ask me about his projects, architecture designs, or open his resume!`;
}
