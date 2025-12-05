import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const meterEventName = process.env.STRIPE_METER_EVENT_NAME || 'openredaction_api_requests';

/**
 * API route to record usage for metered billing
 * This should be called by your backend API after processing each API request
 * 
 * POST /api/stripe/record-usage
 * Body: {
 *   customerId: string, // Stripe customer ID
 *   value: number,      // Number of API requests (will be divided by 1000 for billing)
 * }
 * 
 * Note: Usage is reported in "thousands of requests" to work with tiered pricing.
 * The value is automatically divided by 1000 before sending to Stripe.
 */
export async function POST(request: NextRequest) {
  try {
    const { customerId, value } = await request.json();

    if (!customerId || value === undefined) {
      return NextResponse.json(
        { error: 'customerId and value are required' },
        { status: 400 }
      );
    }

    // Convert individual requests to "thousands of requests" for tiered pricing
    // This allows us to use £0.20 per 1000 requests pricing
    const valueInThousands = value / 1000;

    // Record the meter event
    // Timestamp is required by Stripe API - use current time
    const meterEvent = await stripe.billing.meterEvents.create({
      event_name: meterEventName,
      timestamp: Math.floor(Date.now() / 1000), // Current Unix timestamp
      payload: {
        stripe_customer_id: customerId,
        value: String(valueInThousands), // Report in thousands for tiered pricing (must be string)
      },
    });

    // The Stripe SDK returns the meter event directly
    const eventId = (meterEvent as any).id || (meterEvent as any).identifier || 'unknown';

    return NextResponse.json({
      success: true,
      event_id: eventId,
      customer_id: customerId,
      requests: value,
      value_reported: valueInThousands, // Value sent to Stripe (in thousands)
    });
  } catch (error: any) {
    console.error('Error recording usage:', error);
    return NextResponse.json(
      { 
        error: error.message,
        details: error.type,
      },
      { status: 500 }
    );
  }
}
