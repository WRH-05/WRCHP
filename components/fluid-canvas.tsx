'use client'

import { useEffect, useRef } from 'react'
import { FluidSimulation } from '@/lib/webgl/FluidSimulation'
import { TextMesh } from '@/lib/webgl/TextMesh'
import { Transform, Plane } from 'ogl'

interface FluidCanvasProps {
  className?: string
  children?: React.ReactNode
}

export function FluidCanvas({ className = '', children }: FluidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const simulationRef = useRef<FluidSimulation | null>(null)
  const sceneRef = useRef<Transform | null>(null)
  const textMeshesRef = useRef<TextMesh[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!canvasRef.current) return

    console.log('🎬 Initializing FluidCanvas...')

    // Initialize fluid simulation
    const simulation = new FluidSimulation(canvasRef.current)
    simulationRef.current = simulation

    // Create scene (Transform that will contain all meshes)
    const scene = new Transform()
    sceneRef.current = scene

    console.log('📦 Scene created:', scene)

    // Wait for DOM to be ready, then create text meshes
    const initTimeout = setTimeout(() => {
      const textElements = document.querySelectorAll('[data-gl-text]')
      console.log('📝 Found text elements:', textElements.length)
      
      if (textElements.length > 0) {
        const geometry = new Plane(simulation.gl, {
          heightSegments: 1,
          widthSegments: 1,
        })

        textElements.forEach((element, index) => {
          try {
            const textMesh = new TextMesh({
              canvas: simulation,
              element: element as HTMLElement,
              geometry,
              scene,
            })
            textMeshesRef.current.push(textMesh)
            console.log(`✨ Created TextMesh ${index + 1}:`, element.textContent?.substring(0, 30))
          } catch (error) {
            console.error('❌ Error creating TextMesh:', error)
          }
        })

        console.log('📊 Total meshes in scene:', scene.children?.length || 0)
      } else {
        console.warn('⚠️ No [data-gl-text] elements found')
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
    console.log('▶️ Animation loop started')

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
      console.log('🛑 FluidCanvas cleanup complete')
    }
  }, [])

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
