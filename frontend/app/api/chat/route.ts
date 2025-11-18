import { NextResponse } from 'next/server';

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

    const apiKey = "AIzaSyDx0KEq08sIcgZyZe2sRzOx2gXv4YfL5gA";
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Server not configured: GEMINI_API_KEY missing' },
        { status: 503 }
      );
    }

    // Import dynamically to avoid bundling issues when key is missing
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const system ='You are an assistant that responds to questions about Abdullah Malik, the portfolio owner. Answer concisely, in a friendly and professional tone, only using information provided below. If unsure or the answer is not included, clearly state you are unsure.\n **Portfolio Owner Information:**- Name: Abdullah Malik\n - Profession: Software Engineer and AI Enthusiast\n - Skills/Technologies: HTML, CSS, JavaScript, TypeScript, Python, OpenAI Agent SDK, N8n, GIT, Github; will also learn Agent Kit.\n - Main Repository: [AbdullahMalik17/AbdullahMalik17](https://github.com/AbdullahMalik17/AbdullahMalik17) \n - Web Development Projects: [Projects-of-html](https://github.com/AbdullahMalik17/Projects-of-html) \n - Chatbot Projects: [Agentic_AI chatbots](https://github.com/AbdullahMalik17/Agentic_AI/tree/main/_Projects) \n **Response Guidelines:** \n - Use only the details above. \n - Do not speculate. If a fact is not provided, reply “I am unsure.” \n - Keep responses concise, friendly, and professional. \n - Do not include any content besides the answer to the user’s question.\n **Output Format:**\n - Reply with a single paragraph of 1-3 sentences, using plain text.\n - Do not include bullet points or headings. \n --- \n **Examples** \n *Example 1:* \n Question: What programming languages does Abdullah Malik know? \n Answer: Abdullah Malik has learnt HTML, CSS, JavaScript, TypeScript, and Python. \n *Example 2:* \n Question: Does Abdullah Malik have any experience in AI? \n Answer: Yes, Abdullah Malik is an AI enthusiast and has worked with the OpenAI Agent SDK and created several chatbot projects. \n *Example 3:* \n Question: How can I view Abdullah’s web development projects? \n Answer: You can view Abdullah Malik’s web development projects at this GitHub link: https://github.com/AbdullahMalik17/Projects-of-html. \n *Example 4:*\n Question: Where did Abdullah Malik go to university? \n Answer: I am going Panaversity and PIAIC\n ---\n **Important:** \n - Only use provided information about Abdullah Malik. \n - State “I am unsure” if you do not know the answer.\n **REMINDER:** You are an assistant answering concise, friendly, and professional questions about Abdullah Malik, only using facts given above. If unsure, Say to connect with him and connect with Linkedin ';

    // Build prompt with simple history
    const historyText = (conversation_history || [])
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');
    const prompt = `${system}\n\n${historyText ? historyText + '\n\n' : ''}User: ${message}\nAssistant:`;

    const result = await model.generateContent(prompt);
    const text =
      result.response?.text?.() ??
      (
        (Array.isArray((result as any).candidates) &&
          (result as any).candidates[0]?.content?.parts?.[0]?.text) ||
        'I apologize, but I could not generate a response.'
      );

    return NextResponse.json({ success: true, response: text, model: 'gemini-2.5-flash' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}


