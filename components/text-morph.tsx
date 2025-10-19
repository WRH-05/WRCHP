'use client'

import { useEffect, useRef } from 'react'

interface TextMorphProps {
  children: React.ReactNode
  className?: string
}

export function TextMorph({ children, className = '' }: TextMorphProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    // Add data attribute for WebGL text rendering
    elementRef.current.setAttribute('data-gl-text', '')
    
    return () => {
      elementRef.current?.removeAttribute('data-gl-text')
    }
  }, [])

  return (
    <div ref={elementRef} className={className} data-gl-text="">
      {children}
    </div>
  )
}
