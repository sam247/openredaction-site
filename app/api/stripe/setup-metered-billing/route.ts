import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

/**
 * API route to set up metered billing for OpenRedaction API
 * This creates:
 * 1. A meter to track API requests
 * 2. A base subscription price (£9/month)
 * 3. A metered price for API requests (with 50k included, then per-request overage)
 * 
 * Run this once to set up your Stripe products and prices
 */
export async function POST(request: NextRequest) {
  try {
    // Step 1: Create a meter to track API requests
    const meter = await stripe.billing.meters.create({
      display_name: 'OpenRedaction API Requests',
      event_name: 'openredaction_api_requests',
      default_aggregation: {
        formula: 'sum',
      },
      value_settings: {
        event_payload_key: 'value',
      },
      customer_mapping: {
        type: 'by_id',
        event_payload_key: 'stripe_customer_id',
      },
    });

    console.log('Created meter:', meter.id);

    // Step 2: Get or create the OpenRedaction API product
    let product;
    const products = await stripe.products.list({ limit: 100, active: true });
    const existingProduct = products.data.find(p => p.name === 'OpenRedaction API');
    
    if (existingProduct) {
      product = existingProduct;
      console.log('Using existing product:', product.id);
    } else {
      product = await stripe.products.create({
        name: 'OpenRedaction API',
        description: 'OpenRedaction API - AI-assist PII detection and redaction service',
      });
      console.log('Created product:', product.id);
    }

    // Step 3: Create base subscription price (£9/month = 900 pence)
    const basePrice = await stripe.prices.create({
      product: product.id,
      currency: 'gbp',
      unit_amount: 900, // £9.00
      recurring: {
        interval: 'month',
        usage_type: 'licensed',
      },
    });

    console.log('Created base price:', basePrice.id);

    // Step 4: Create metered price for API requests
    // This uses graduated pricing: first 50k requests are free (included in base), then charge per 1000 requests
    const meteredPrice = await stripe.prices.create({
      product: product.id,
      currency: 'gbp',
      billing_scheme: 'tiered',
      recurring: {
        interval: 'month',
        usage_type: 'metered',
        meter: meter.id,
      },
      tiers_mode: 'graduated',
      tiers: [
        {
          up_to: 50000, // First 50,000 requests included (covered by base subscription)
          unit_amount: 0, // Free
        },
        {
          up_to: 'inf', // Everything above 50k
          unit_amount: 20, // £0.20 per 1000 requests (20 pence per 1000)
        },
      ],
      transform_quantity: {
        divide_by: 1000, // Bill per 1000 requests
        round: 'up',
      },
    });

    console.log('Created metered price:', meteredPrice.id);

    return NextResponse.json({
      success: true,
      meter: {
        id: meter.id,
        display_name: meter.display_name,
        event_name: meter.event_name,
      },
      product: {
        id: product.id,
        name: product.name,
      },
      prices: {
        base: {
          id: basePrice.id,
          amount: basePrice.unit_amount,
          currency: basePrice.currency,
        },
        metered: {
          id: meteredPrice.id,
          currency: meteredPrice.currency,
        },
      },
      message: 'Metered billing setup complete! Add these to your .env.local:',
      env_vars: {
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_live_xxxxx',  // Your publishable key
        STRIPE_SECRET_KEY: 'sk_live_xxxxx',  // Your secret key
        NEXT_PUBLIC_STRIPE_BASE_PRICE_ID: basePrice.id,
        NEXT_PUBLIC_STRIPE_METERED_PRICE_ID: meteredPrice.id,
        STRIPE_METER_ID: meter.id,
        STRIPE_METER_EVENT_NAME: meter.event_name,
      },
    });
  } catch (error: any) {
    console.error('Error setting up metered billing:', error);
    return NextResponse.json(
      { 
        error: error.message,
        details: error.type,
      },
      { status: 500 }
    );
  }
}

