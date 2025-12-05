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
 *   value: number,      // Number of API requests (usually 1 per call)
 * }
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

    // Record the meter event
    // Timestamp is required by Stripe API
    const meterEvent = await stripe.billing.meterEvents.create({
      event_name: meterEventName,
      timestamp: Math.floor(Date.now() / 1000), // Current Unix timestamp in seconds
      payload: {
        stripe_customer_id: customerId,
        value: String(value), // Stripe expects value as a string
      },
    });

    return NextResponse.json({
      success: true,
      event_id: meterEvent.identifier || 'unknown',
      customer_id: customerId,
      value: value,
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