"use client"

import { useEffect, useState } from "react"

export function Landing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-start px-8 lg:px-16 relative overflow-hidden">
      {/* Subtle background gradient that follows mouse */}
      <div 
        className="absolute inset-0 opacity-5 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, var(--primary) 0%, transparent 50%)`
        }}
      />
      
      {/* Main CHROME text */}
      <div className="relative z-10 max-w-4xl">
        <h1 className="font-kudryashev-extra-contrast text-6xl sm:text-8xl lg:text-9xl xl:text-[12rem] 2xl:text-[14rem] leading-none text-foreground tracking-tight select-none">
          CHROME
        </h1>
        
        {/* Subtle tagline */}
        <div className="mt-6 lg:mt-12">
          <p className="font-neue-haas-thin text-base sm:text-lg lg:text-xl text-muted-foreground tracking-wide">
            Industrial Electronics Engineer
          </p>
          <p className="font-neue-haas-thin text-sm lg:text-base text-muted-foreground/70 mt-2">
            Building the future through innovation
          </p>
        </div>

        {/* Scroll indicator - hidden on mobile */}
        <div className="absolute bottom-12 left-0 hidden lg:flex flex-col items-center gap-2">
          <p className="font-mono text-xs text-muted-foreground/60 tracking-widest rotate-90 origin-center transform translate-x-4">
            SCROLL
          </p>
          <div className="w-px h-12 bg-muted-foreground/30 animate-pulse" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-16 lg:right-32">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
      </div>
      
      <div className="absolute bottom-1/3 right-24 lg:right-48">
        <div className="w-px h-16 bg-muted-foreground/20" />
      </div>
    </section>
  )
}