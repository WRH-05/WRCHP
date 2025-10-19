'use client'

import { useEffect, useRef } from 'react'
import { FluidSimulation } from '@/lib/webgl/FluidSimulation'
import { Transform } from 'ogl'

interface FluidCanvasProps {
  className?: string
  children?: React.ReactNode
}

export function FluidCanvas({ className = '', children }: FluidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const simulationRef = useRef<FluidSimulation | null>(null)
  const sceneRef = useRef<Transform | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize fluid simulation
    const simulation = new FluidSimulation(canvasRef.current)
    simulationRef.current = simulation

    // Create scene
    const scene = new Transform()
    sceneRef.current = scene

    // Animation loop
    const animate = () => {
      simulation.update(scene)
      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      simulation.onResize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafRef.current)
      simulation.destroy()
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-auto z-0"
        style={{ 
          touchAction: 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.95)', // Dark background to see fluid
          opacity: 1
        }}
      />
      <div className="relative z-10 pointer-events-none">
        {children}
      </div>
    </div>
  )
}
