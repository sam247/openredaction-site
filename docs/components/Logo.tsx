import React from 'react'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon - three horizontal rounded rectangles (white variant for dark background) */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect
          x="4"
          y="8"
          width="16"
          height="4"
          rx="2"
          className="fill-gray-400 dark:fill-gray-400"
        />
        <rect
          x="4"
          y="14"
          width="20"
          height="4"
          rx="2"
          className="fill-gray-400 dark:fill-gray-400"
        />
        <rect
          x="4"
          y="20"
          width="24"
          height="4"
          rx="2"
          className="fill-gray-400 dark:fill-gray-400"
        />
      </svg>
      
      {/* Text - white for dark mode, dark red for light mode */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg text-white dark:text-white">
          OpenRedaction
        </span>
        <span className="text-lg text-gray-400 dark:text-gray-400">
          |
        </span>
        <span className="font-bold text-lg text-white dark:text-white">
          Docs
        </span>
      </div>
    </div>
  )
}

