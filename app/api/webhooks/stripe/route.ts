import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // When checkout completes, you can:
      // 1. Get the customer ID: session.customer
      // 2. Get the subscription ID: session.subscription
      // 3. Generate and store API key for the customer
      console.log('Checkout completed:', {
        session_id: session.id,
        customer_id: session.customer,
        subscription_id: session.subscription,
      });
      // TODO: Generate API key and store customer_id -> API key mapping
      break;

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      // Update user's API key to paid tier
      // In production, you'd update the database here
      console.log('Subscription updated:', {
        subscription_id: subscription.id,
        customer_id: subscription.customer,
        status: subscription.status,
      });
      break;

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object as Stripe.Subscription;
      // Downgrade user's API key to free tier
      console.log('Subscription deleted:', {
        subscription_id: deletedSubscription.id,
        customer_id: deletedSubscription.customer,
      });
      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      console.log('Payment succeeded:', {
        invoice_id: invoice.id,
        customer_id: invoice.customer,
        amount_paid: invoice.amount_paid,
        // For metered billing, invoice.line_items will show usage charges
      });
      break;

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object as Stripe.Invoice;
      console.log('Payment failed:', {
        invoice_id: failedInvoice.id,
        customer_id: failedInvoice.customer,
      });
      // TODO: Notify customer, potentially suspend API access
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

