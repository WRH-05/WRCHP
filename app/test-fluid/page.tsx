'use client'

import { FluidCanvas } from '@/components/fluid-canvas'
import { TextMorph } from '@/components/text-morph'

export default function TestFluid() {
  return (
    <div className="min-h-screen bg-black">
      <FluidCanvas>
        <div className="min-h-screen flex flex-col items-center justify-center pointer-events-auto gap-8">
          <TextMorph className="text-9xl font-bold text-white">
            FLUID
          </TextMorph>
          
          <TextMorph className="text-6xl font-light text-white/80">
            Simulation Test
          </TextMorph>
          
          <p className="text-white/60 text-lg mt-8 max-w-xl text-center leading-relaxed">
            Move your mouse slowly across the screen to see the fluid distortion effect on the text above.
          </p>
        </div>
      </FluidCanvas>
    </div>
  )
}
