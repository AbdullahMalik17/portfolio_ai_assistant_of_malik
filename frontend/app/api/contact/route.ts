import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveContact } from '@/app/lib/db';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Save to database first
    console.log('Saving contact to database...');
    const dbResult = await saveContact({ name, email, phone, subject, message });

    if (!dbResult.success) {
      console.error('Failed to save to database:', dbResult.error);
      // Continue anyway - we still want to send the email
    } else {
      console.log('Contact saved to database with ID:', dbResult.data?.id);
    }

    // Log what we're about to send
    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'your-email@gmail.com';
    console.log('Attempting to send email to:', recipientEmail);
    console.log('From:', name, '(' + email + ')');

    // Send email using Resend
    // TODO: Switch back to custom domain once verified: contact@client.message.com
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: [recipientEmail], // Your Gmail address
      replyTo: email, // Sender's email for easy reply
      subject: `New Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 8px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              }
              .content {
                background: white;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #667eea;
                display: block;
                margin-bottom: 5px;
              }
              .value {
                background-color: #f4f4f4;
                padding: 10px;
                border-radius: 4px;
                border-left: 3px solid #667eea;
              }
              .message-box {
                background-color: #f4f4f4;
                padding: 15px;
                border-radius: 4px;
                border-left: 3px solid #667eea;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                color: #666;
                font-size: 12px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">📬 New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">📋 Subject:</span>
                  <div class="value"><strong>${subject}</strong></div>
                </div>

                <div class="field">
                  <span class="label">👤 Name:</span>
                  <div class="value">${name}</div>
                </div>

                <div class="field">
                  <span class="label">📧 Email:</span>
                  <div class="value">
                    <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                  </div>
                </div>

                ${phone ? `
                <div class="field">
                  <span class="label">📞 Phone:</span>
                  <div class="value">
                    <a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a>
                  </div>
                </div>
                ` : ''}

                <div class="field">
                  <span class="label">💬 Message:</span>
                  <div class="message-box">${message}</div>
                </div>

                <div class="footer">
                  <p>Received on ${new Date().toLocaleString('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'long'
                  })}</p>
                  <p style="margin-top: 10px;">
                    <a href="mailto:${email}?subject=Re: Your message"
                       style="color: #667eea; text-decoration: none;">
                      Click here to reply directly
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { success: false, error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    console.log('Email sent successfully!');
    console.log('Email ID:', data?.id);
    console.log('To:', recipientEmail);
    console.log('Check your email (and spam folder) for the notification.');

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!'
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
