import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json();

    // For metered billing, we need both base price and metered price
    const basePriceId = process.env.NEXT_PUBLIC_STRIPE_BASE_PRICE_ID;
    const meteredPriceId = process.env.NEXT_PUBLIC_STRIPE_METERED_PRICE_ID;

    // If metered billing is configured, use both prices
    // Otherwise, fall back to single price (legacy)
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    if (basePriceId && meteredPriceId) {
      // Metered billing: base subscription + metered usage
      lineItems.push(
        {
          price: basePriceId,
          quantity: 1,
        },
        {
          price: meteredPriceId,
          // Metered prices don't need quantity - usage is reported separately
        }
      );
    } else if (priceId) {
      // Legacy: single price
      lineItems.push({
        price: priceId,
        quantity: 1,
      });
    } else {
      return NextResponse.json(
        { error: 'Price ID or metered billing configuration is required' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/pricing`,
      metadata: {
        // Store user info if available
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

