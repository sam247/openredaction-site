/**
 * Script to set up Stripe metered billing
 * Run with: STRIPE_SECRET_KEY=sk_live_xxx npx tsx scripts/setup-stripe-metered-billing.ts
 * Or set STRIPE_SECRET_KEY in your environment before running
 */

import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error('❌ Error: STRIPE_SECRET_KEY environment variable is required');
  console.error('   Set it with: export STRIPE_SECRET_KEY=sk_live_xxx');
  console.error('   Or run: STRIPE_SECRET_KEY=sk_live_xxx npx tsx scripts/setup-stripe-metered-billing.ts');
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey);

async function setupMeteredBilling() {
  try {
    console.log('🚀 Setting up Stripe metered billing...\n');

    // Step 1: Find or create a meter to track API requests
    console.log('1. Finding or creating meter...');
    const meters = await stripe.billing.meters.list({ limit: 100 });
    let meter = meters.data.find(m => m.event_name === 'openredaction_api_requests' && m.status === 'active');
    
    if (meter) {
      console.log('✅ Using existing meter:', meter.id);
      console.log('   Event name:', meter.event_name);
    } else {
      meter = await stripe.billing.meters.create({
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
      console.log('✅ Created meter:', meter.id);
      console.log('   Event name:', meter.event_name);
    }

    // Step 2: Get or create the OpenRedaction API product
    console.log('\n2. Finding or creating product...');
    const products = await stripe.products.list({ limit: 100, active: true });
    let product = products.data.find(p => p.name === 'OpenRedaction API');
    
    if (product) {
      console.log('✅ Using existing product:', product.id);
    } else {
      product = await stripe.products.create({
        name: 'OpenRedaction API',
        description: 'OpenRedaction API - AI-assist PII detection and redaction service',
      });
      console.log('✅ Created product:', product.id);
    }

    // Step 3: Check for existing base price or create new one
    console.log('\n3. Setting up base subscription price...');
    const prices = await stripe.prices.list({ product: product.id, limit: 100 });
    let basePrice = prices.data.find(
      p => p.recurring?.interval === 'month' && 
           p.recurring?.usage_type === 'licensed' && 
           p.unit_amount === 900
    );

    if (basePrice) {
      console.log('✅ Using existing base price:', basePrice.id);
    } else {
      basePrice = await stripe.prices.create({
        product: product.id,
        currency: 'gbp',
        unit_amount: 900, // £9.00
        recurring: {
          interval: 'month',
          usage_type: 'licensed',
        },
      });
      console.log('✅ Created base price:', basePrice.id);
    }

    // Step 4: Create metered price for API requests
    // Strategy: Since Stripe doesn't support transform_quantity with tiered pricing,
    // we'll report usage in "thousands of requests" to the meter instead of individual requests.
    // This allows us to use simple per-unit pricing: £0.20 per "thousand requests"
    // When recording usage, divide by 1000 before sending to Stripe
    console.log('\n4. Creating metered price for overage...');
    console.log('   Note: Report usage in "thousands of requests" (divide by 1000 when recording)');
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
          up_to: 50, // First 50 "units" = 50,000 requests (since we report in thousands)
          unit_amount: 0, // Free (covered by base subscription)
        },
        {
          up_to: 'inf', // Everything above 50 units (50k requests)
          unit_amount: 20, // 20 pence per unit = £0.20 per 1000 requests
        },
      ],
    });
    console.log('✅ Created metered price:', meteredPrice.id);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ Setup complete! Add these to your .env.local:\n');
    console.log(`NEXT_PUBLIC_STRIPE_BASE_PRICE_ID=${basePrice.id}`);
    console.log(`NEXT_PUBLIC_STRIPE_METERED_PRICE_ID=${meteredPrice.id}`);
    console.log(`STRIPE_METER_ID=${meter.id}`);
    console.log(`STRIPE_METER_EVENT_NAME=${meter.event_name}`);
    console.log('\n' + '='.repeat(60));
    console.log('\n📝 Important: When recording usage, divide by 1000 before sending to Stripe');
    console.log('   Example: 75,000 requests → report as 75 (thousands of requests)');
    console.log('   This allows the tiered pricing to work correctly.\n');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.type) {
      console.error('   Type:', error.type);
    }
    process.exit(1);
  }
}

setupMeteredBilling();

