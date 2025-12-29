'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export default function PricingPageTracker() {
  useEffect(() => {
    analytics.pricingPageView();
  }, []);

  return null;
}

