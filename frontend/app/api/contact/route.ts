import { NextRequest, NextResponse } from 'next/server';
import { saveContact } from '@/app/lib/db';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to database first - this is the primary action
    console.log('Saving contact to database...');
    const dbResult = await saveContact({ name, email, phone, subject, message });

    if (!dbResult.success) {
      console.error('Failed to save to database:', dbResult.error);
      return NextResponse.json(
        { success: false, error: 'Failed to save your message. Please try again.' },
        { status: 500 }
      );
    }

    console.log('Contact saved to database with ID:', dbResult.data?.id);

    // Try to send email notification (optional - don't fail if this doesn't work)
    let emailSent = false;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(resendApiKey);

        const recipientEmail = process.env.NOTIFICATION_EMAIL || 'muhammadabdullah51700@gmail.com';
        console.log('Attempting to send email to:', recipientEmail);

        const { error } = await resend.emails.send({
          from: 'Portfolio Contact Form <onboarding@resend.dev>',
          to: [recipientEmail],
          replyTo: email,
          subject: `New Contact: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); color: white; padding: 20px; text-align: center;">
                <h1>New Contact Form Submission</h1>
              </div>
              <div style="background: #f9f9f9; padding: 30px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <div style="background: white; padding: 15px; border-left: 3px solid #06b6d4;">${message}</div>
              </div>
            </div>
          `,
        });

        if (!error) {
          emailSent = true;
          console.log('Email notification sent successfully!');
        } else {
          console.error('Email error:', error);
        }
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    } else {
      console.log('RESEND_API_KEY not configured - skipping email notification');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received successfully!',
        emailSent
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send message'
      },
      { status: 500 }
    );
  }
}
