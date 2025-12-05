# Stripe Webhook Setup - ✅ Configured

## Webhook Configuration

**Status**: ✅ Active and configured

- **Endpoint URL**: `https://openredaction.com/api/webhooks/stripe`
- **Webhook Secret**: `whsec_oAr8gywKHBFoB0QUR7N4T5J5lbtwm4kX`
- **Environment Variable**: `STRIPE_WEBHOOK_SECRET=whsec_oAr8gywKHBFoB0QUR7N4T5J5lbtwm4kX`

## Events Being Listened To

The webhook endpoint handles the following Stripe events:

1. **`checkout.session.completed`**
   - Triggered when a customer completes checkout
   - Use this to generate API keys and store customer_id → api_key mapping
   - Access: `session.customer`, `session.subscription`

2. **`customer.subscription.created`**
   - Triggered when a subscription is created
   - Use this to activate API access for the customer

3. **`customer.subscription.updated`**
   - Triggered when subscription details change
   - Use this to update customer's access level

4. **`customer.subscription.deleted`**
   - Triggered when a subscription is cancelled
   - Use this to downgrade customer to free tier

5. **`invoice.payment_succeeded`**
   - Triggered when payment succeeds
   - For metered billing, this includes usage charges

6. **`invoice.payment_failed`**
   - Triggered when payment fails
   - Use this to notify customer or suspend API access

## Webhook Handler Location

The webhook handler is located at:
- **File**: `app/api/webhooks/stripe/route.ts`
- **Method**: POST
- **Verification**: Uses Stripe signature verification for security

## Testing Webhooks Locally

To test webhooks locally, use Stripe CLI:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This will give you a test webhook secret (different from production) that you can use in your local `.env.local`.

## Next Steps

1. ✅ Webhook endpoint is configured in Stripe Dashboard
2. ✅ Webhook secret is documented
3. ⏳ Add webhook secret to your environment variables (Vercel/deployment)
4. ⏳ Implement API key generation in `checkout.session.completed` handler
5. ⏳ Implement customer_id → api_key mapping storage
6. ⏳ Test webhook events end-to-end

## Security Notes

- The webhook endpoint verifies Stripe signatures to ensure requests are from Stripe
- Never expose the webhook secret in client-side code
- Always verify webhook signatures before processing events
- Use HTTPS for webhook endpoints in production

