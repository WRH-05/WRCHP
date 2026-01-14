'use client'

import { useRef } from 'react'

interface TextMorphProps {
  children: React.ReactNode
  className?: string
}

export function TextMorph({ children, className = '' }: TextMorphProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={elementRef} className={className} data-gl-text="">
      {children}
    </div>
  )
}
