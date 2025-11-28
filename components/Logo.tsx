'use client';

import { useState, useEffect } from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = '' }: LogoProps) {
  const [hasError, setHasError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, show fallback to avoid hydration issues
  if (!mounted || hasError) {
    return (
      <div 
        className={`bg-white rounded-full flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-black font-bold" style={{ fontSize: size * 0.4 }}>
          OR
        </span>
      </div>
    );
  }

  return (
    <img
      src="/logo.png"
      alt="OpenRedaction"
      className={`object-contain ${className}`}
      style={{ width: size, height: size, display: 'block' }}
      onError={() => setHasError(true)}
    />
  );
}

