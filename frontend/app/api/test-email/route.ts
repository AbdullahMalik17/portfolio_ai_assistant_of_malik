import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'RESEND_API_KEY not configured',
      }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('Testing email send...');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('NOTIFICATION_EMAIL:', process.env.NOTIFICATION_EMAIL);

    const { data, error } = await resend.emails.send({
      from: 'Test Email <onboarding@resend.dev>',
      to: [process.env.NOTIFICATION_EMAIL || 'muhammadabdullah51700@gmail.com'],
      subject: '🧪 Test Email from Portfolio',
      html: `
        <h1>Test Email</h1>
        <p>If you receive this, Resend is working correctly!</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      `,
    });

    if (error) {
      console.error('Test email error:', error);
      return NextResponse.json({
        success: false,
        error: error,
        config: {
          apiKeyExists: !!process.env.RESEND_API_KEY,
          email: process.env.NOTIFICATION_EMAIL
        }
      }, { status: 500 });
    }

    console.log('Test email sent!', data);

    return NextResponse.json({
      success: true,
      message: 'Test email sent! Check your inbox (and spam folder)',
      data: data,
      sentTo: process.env.NOTIFICATION_EMAIL
    });

  } catch (error) {
    console.error('Test email exception:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
