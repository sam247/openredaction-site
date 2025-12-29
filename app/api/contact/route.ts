import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, useCase, interest, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_APP_PASSWORD, // App-specific password
      },
    });

    // Email content
    const emailContent = `
New Contact Form Submission from OpenRedaction

From: ${name} <${email}>
Company: ${company || 'Not provided'}
Use Case/Industry: ${useCase || 'Not provided'}
Interest: ${interest || 'Not specified'}

Message:
${message}

---
Sent from OpenRedaction contact form
Timestamp: ${new Date().toISOString()}
    `.trim();

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'sampettiford@googlemail.com',
      subject: `OpenRedaction Contact Form: ${name} - ${interest || 'General Inquiry'}`,
      text: emailContent,
      replyTo: email,
    });

    console.log('Contact form email sent successfully:', { name, email, interest });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
