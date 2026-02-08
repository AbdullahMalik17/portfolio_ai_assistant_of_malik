import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'AI service not configured' },
        { status: 503 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a professional writing assistant. Refine this rough project idea into a clear, professional project inquiry for a full-stack developer portfolio.

Guidelines:
- Keep the refined message concise (2-4 sentences)
- Maintain a professional but friendly tone
- Preserve the original intent and key details
- Make it suitable for a contact form submission
- Do not add placeholder information the user didn't provide
- Return ONLY the refined message, no explanations or quotation marks

Rough message to refine:
${message}`;

    const result = await model.generateContent(prompt);
    const refinedMessage = result.response.text().trim();

    if (!refinedMessage) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate refined message' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      response: refinedMessage
    });

  } catch (error) {
    console.error('AI refinement error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to refine message' },
      { status: 500 }
    );
  }
}
