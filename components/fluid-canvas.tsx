'use client'

import { useEffect, useRef, useState } from 'react'
import { FluidSimulation, FluidSimulationOptions } from '@/lib/webgl/FluidSimulation'
import { TextMesh } from '@/lib/webgl/TextMesh'
import { Transform, Plane } from 'ogl'

interface FluidCanvasProps {
  className?: string
  children?: React.ReactNode
  /** Chromatic aberration strength: 0 = none (best for white backgrounds), 1 = full. Default: 0.3 */
  chromaticStrength?: number
}

/** Check if WebGL2 is supported */
function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch (e) {
    return false
  }
}

export function FluidCanvas({ className = '', children, chromaticStrength = 0.3 }: FluidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const simulationRef = useRef<FluidSimulation | null>(null)
  const sceneRef = useRef<Transform | null>(null)
  const textMeshesRef = useRef<TextMesh[]>([])
  const rafRef = useRef<number>(0)
  const [webglSupported, setWebglSupported] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check WebGL support
    if (!isWebGLSupported()) {
      setWebglSupported(false)
      return
    }

    if (!canvasRef.current) return

    try {
      // Initialize fluid simulation with options
      const options: FluidSimulationOptions = { chromaticStrength }
      const simulation = new FluidSimulation(canvasRef.current, options)
      simulationRef.current = simulation

      // Create scene (Transform that will contain all meshes)
      const scene = new Transform()
      sceneRef.current = scene

      // Wait for DOM to be ready, then create text meshes
      const initTimeout = setTimeout(() => {
        const textElements = document.querySelectorAll('[data-gl-text]')
        
        if (textElements.length > 0) {
          const geometry = new Plane(simulation.gl, {
            heightSegments: 1,
            widthSegments: 1,
          })

          textElements.forEach((element) => {
            try {
              const textMesh = new TextMesh({
                canvas: simulation,
                element: element as HTMLElement,
                geometry,
                scene,
              })
              textMeshesRef.current.push(textMesh)
            } catch (err) {
              console.error('Error creating TextMesh:', err)
            }
          })
        }
      }, 100)

      // Animation loop
      const animate = () => {
        // Update text mesh positions based on scroll
        textMeshesRef.current.forEach(textMesh => {
          textMesh.onLoop(window.scrollY)
        })
        
        // Render with scene - Post will automatically create tMap from scene
        simulation.update(scene)
        rafRef.current = requestAnimationFrame(animate)
      }

      animate()

      // Handle resize
      const handleResize = () => {
        simulation.onResize()
        textMeshesRef.current.forEach(textMesh => {
          textMesh.onResize()
        })
      }

      window.addEventListener('resize', handleResize)

      return () => {
        clearTimeout(initTimeout)
        window.removeEventListener('resize', handleResize)
        cancelAnimationFrame(rafRef.current)
        simulation.destroy()
        textMeshesRef.current = []
      }
    } catch (err) {
      console.error('FluidCanvas initialization error:', err)
      setError(err instanceof Error ? err.message : 'WebGL initialization failed')
    }
  }, [chromaticStrength])

  // Fallback for no WebGL support or errors
  if (!webglSupported || error) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ 
          touchAction: 'none',
          zIndex: 10,
          pointerEvents: 'auto'
        }}
      />
      <div className="relative" style={{ zIndex: 0, pointerEvents: 'none' }}>
        {children}
      </div>
    </div>
  )
}
