import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'sam247/openredaction-site';
const TO_EMAIL = 'sampettiford@googlemail.com';

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

    if (!GITHUB_TOKEN) {
      console.error('GitHub token not configured');
      return NextResponse.json(
        { error: 'Form service not configured' },
        { status: 500 }
      );
    }

    // Create GitHub issue with form data
    const issueTitle = `Contact Form: ${name} - ${interest || 'General Inquiry'}`;

    const issueBody = `
## Contact Form Submission

**From:** ${name} <${email}>
**Company:** ${company || 'Not provided'}
**Use Case/Industry:** ${useCase || 'Not provided'}
**Interest:** ${interest || 'Not specified'}

### Message:
${message}

---
**Submitted:** ${new Date().toISOString()}
**Source:** OpenRedaction Contact Form
    `.trim();

    // Create GitHub issue
    const issueResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: issueTitle,
        body: issueBody,
        labels: ['contact-form', 'auto-generated'],
      }),
    });

    if (!issueResponse.ok) {
      const errorData = await issueResponse.json();
      console.error('GitHub issue creation failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: 500 }
      );
    }

    const issueData = await issueResponse.json();
    console.log('Contact form issue created successfully:', {
      issueNumber: issueData.number,
      issueUrl: issueData.html_url,
      name,
      email,
      interest
    });

    // TODO: Add email notification here when Resend is available again
    // For now, GitHub will send notifications to repo watchers

    return NextResponse.json({
      success: true,
      issueUrl: issueData.html_url
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
