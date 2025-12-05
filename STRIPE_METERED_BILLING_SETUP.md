# Stripe Metered Billing Setup for OpenRedaction API

This guide explains how to set up metered billing for the OpenRedaction API using Stripe.

## Overview

The metered billing setup includes:
- **Base subscription**: £9/month (includes 50,000 API requests)
- **Metered overage**: £0.20 per 1,000 requests above 50,000

## Setup Steps

### 1. Run the Setup Script

First, make sure your Stripe secret key is set in your environment:

```bash
# In your .env.local or environment variables
STRIPE_SECRET_KEY=sk_live_xxxxx  # Your Stripe secret key
```

Then, call the setup endpoint (you can do this via curl or Postman):

```bash
curl -X POST http://localhost:3000/api/stripe/setup-metered-billing \
  -H "Content-Type: application/json"
```

Or if deployed:

```bash
curl -X POST https://openredaction.com/api/stripe/setup-metered-billing \
  -H "Content-Type: application/json"
```

This will create:
- A meter to track API requests
- A product for "OpenRedaction API"
- A base subscription price (£9/month)
- A metered price for overage billing

### 2. Add Environment Variables

After running the setup, add these to your `.env.local`:

```env
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx  # Your Stripe publishable key
STRIPE_SECRET_KEY=sk_live_xxxxx  # Your Stripe secret key

# Metered Billing IDs (from setup response)
NEXT_PUBLIC_STRIPE_BASE_PRICE_ID=price_xxxxx
NEXT_PUBLIC_STRIPE_METERED_PRICE_ID=price_xxxxx
STRIPE_METER_ID=mtr_xxxxx
STRIPE_METER_EVENT_NAME=openredaction_api_requests
```

### 3. Set Up Webhooks ✅

**Webhook is configured!**

- **Endpoint URL**: `https://openredaction.com/api/webhooks/stripe`
- **Webhook Secret**: `whsec_oAr8gywKHBFoB0QUR7N4T5J5lbtwm4kX`

**Events configured:**
- `checkout.session.completed` - When a customer completes checkout
- `customer.subscription.created` - When a subscription is created
- `customer.subscription.updated` - When a subscription is updated
- `customer.subscription.deleted` - When a subscription is cancelled
- `invoice.payment_succeeded` - When payment succeeds
- `invoice.payment_failed` - When payment fails

**Add to your `.env.local`:**
```env
STRIPE_WEBHOOK_SECRET=whsec_oAr8gywKHBFoB0QUR7N4T5J5lbtwm4kX
```

### 4. Record Usage in Your Backend API

When a customer makes an API request, record the usage by calling:

```bash
POST /api/stripe/record-usage
Content-Type: application/json

{
  "customerId": "cus_xxxxx",  // Stripe customer ID
  "value": 1                   // Number of requests (usually 1)
}
```

**Important**: You need to map API keys to Stripe customer IDs. Store this mapping in your database:
- When a customer subscribes (via `checkout.session.completed` webhook), store: `api_key → customer_id`
- When processing API requests, look up the customer_id from the API key
- Then call the record-usage endpoint

### 5. Update Your Backend API

In your OpenRedaction API backend (the one that processes `/ai-detect` requests):

```javascript
// After processing an API request successfully
async function recordUsage(apiKey, requestCount = 1) {
  // 1. Look up customer_id from api_key in your database
  const customerId = await getCustomerIdFromApiKey(apiKey);
  
  if (!customerId) {
    // Free tier - no usage recording needed
    return;
  }

  // 2. Record usage via the Next.js API route
  await fetch('https://openredaction.com/api/stripe/record-usage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerId: customerId,
      value: requestCount,
    }),
  });
}
```

## How It Works

1. **Customer subscribes**: They pay £9/month via Stripe Checkout
2. **Subscription created**: Webhook receives `checkout.session.completed`, you generate an API key and store the mapping
3. **API usage**: Each API request is recorded via `/api/stripe/record-usage`
4. **Billing**: At the end of the month:
   - First 50,000 requests: Covered by base subscription
   - Requests 50,001+: Charged at £0.20 per 1,000 requests
5. **Invoice**: Stripe automatically generates an invoice with base + usage charges

## Testing

### Test Meter Events

You can manually record test usage in the Stripe Dashboard:
1. Go to **Billing** → **Meters**
2. Select your meter
3. Click **Add usage** → **Manually input usage**
4. Enter a customer ID and value

### Test Webhooks Locally

Use Stripe CLI to forward webhooks to your local server:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Pricing Details

- **Base subscription**: £9/month (includes 50,000 requests)
- **Overage**: £0.20 per 1,000 requests above 50,000
- **Billing period**: Monthly
- **Currency**: GBP

## Next Steps

1. ✅ Run the setup endpoint
2. ✅ Add environment variables
3. ✅ Set up webhooks in Stripe Dashboard
4. ⏳ Update your backend API to record usage
5. ⏳ Test the full flow end-to-end

Let me know when you're ready for webhook setup!

