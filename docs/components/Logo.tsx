import React from 'react'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <img
      src="/docs/docs_logo.png"
      alt="OpenRedaction"
      className={`object-contain flex-shrink-0 ${className}`}
      style={{ 
        width: 200, 
        height: 200, 
        display: 'block',
        minWidth: 200,
        minHeight: 200,
        maxWidth: 200,
        maxHeight: 200
      }}
    />
  )
}

