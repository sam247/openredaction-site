'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { analytics } from '@/lib/analytics';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface CheckoutButtonProps {
  priceId: string;
  onSuccess?: () => void;
}

export default function StripeCheckoutButton({ priceId, onSuccess }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    return (
      <div className="text-red-400 text-sm">
        Stripe is not configured. Please add your Stripe publishable key.
      </div>
    );
  }

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    // Track checkout initiation
    const sourcePage = typeof window !== 'undefined' ? window.location.pathname : 'unknown';
    analytics.checkoutInitiated(priceId, 'pro', sourcePage);

    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const { sessionId, error: sessionError } = await response.json();

      if (sessionError) {
        setError(sessionError);
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (stripe) {
        const { error: redirectError } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (redirectError) {
          setError(redirectError.message || 'An error occurred');
          setLoading(false);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-900 text-red-200 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? 'Processing...' : 'Subscribe to Pro'}
      </button>
    </div>
  );
}

