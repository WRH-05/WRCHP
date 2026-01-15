'use client'

import { FluidCanvas } from '@/components/fluid-canvas'
import { siteConfig } from '@/lib/config'

export function LandingFluid() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      <FluidCanvas className="min-h-screen" chromaticStrength={0.8}>
        <div className="min-h-screen flex items-center justify-start px-8 lg:px-16 pointer-events-auto">
          <div className="max-w-4xl">
            {/* Main CHROME text - with data-gl-text for fluid effect */}
            <h1 
              data-gl-text
              className="font-georgia-cond text-6xl sm:text-8xl lg:text-9xl xl:text-[12rem] 2xl:text-[14rem] leading-none text-white tracking-tight select-none"
            >
              {siteConfig.title}
            </h1>
            
            {/* Subtle tagline */}
            <div className="mt-6 lg:mt-12">
              <p 
                data-gl-text
                className="font-georgia-cond text-base sm:text-lg lg:text-xl text-white/70 tracking-wide"
              >
                {siteConfig.education.degree.replace(" Engineering", " Engineer")}
              </p>
              <p 
                data-gl-text
                className="font-georgia-cond text-sm lg:text-base text-white/50 mt-2"
              >
                {siteConfig.tagline}
              </p>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 left-8 lg:left-16 hidden lg:flex flex-col items-center gap-2">
              <p className="font-mono text-xs text-white/40 tracking-widest rotate-90 origin-center transform translate-x-4">
                SCROLL
              </p>
              <div className="w-px h-12 bg-white/20 animate-pulse" />
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 right-16 lg:right-32">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
          
          <div className="absolute bottom-1/3 right-24 lg:right-48">
            <div className="w-px h-16 bg-white/20" />
          </div>
        </div>
      </FluidCanvas>
    </section>
  )
}
