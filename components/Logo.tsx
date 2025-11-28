'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
    <div className={`relative ${className}`} style={{ width: size, height: size, minWidth: size, minHeight: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        src="/logo.png"
        alt="OpenRedaction"
        width={size}
        height={size}
        className="object-contain"
        style={{ width: '100%', height: '100%', maxWidth: size, maxHeight: size }}
        onError={() => setHasError(true)}
        unoptimized
        priority
      />
    </div>
  );
}

