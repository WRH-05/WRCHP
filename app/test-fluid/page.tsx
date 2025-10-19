'use client'

import { FluidCanvas } from '@/components/fluid-canvas'

export default function TestFluid() {
  return (
    <div className="min-h-screen bg-black">
      <FluidCanvas>
        <div className="min-h-screen flex flex-col items-center justify-center pointer-events-auto">
          <h1 className="text-6xl font-bold text-white mb-4">
            Fluid Simulation Test
          </h1>
          <p className="text-white/60 text-xl mb-8">
            Move your mouse slowly across the screen
          </p>
          <div className="space-y-2 text-white/40 text-sm text-center">
            <div>✨ The fluid should appear as colorful trails following your cursor</div>
            <div>🎨 Slower movements = larger fluid patterns</div>
            <div>🖱️ Check the browser console (F12) for debug messages</div>
          </div>
          <div className="mt-12 p-4 border border-white/20 rounded bg-white/5 max-w-md">
            <p className="text-white/60 text-xs">
              <strong className="text-white">Not seeing anything?</strong><br/>
              Open DevTools (F12) and look for:<br/>
              • "🎬 Frame" messages (animation is running)<br/>
              • "💧 Splat added" messages (mouse detected)<br/>
              • Any error messages in red
            </p>
          </div>
        </div>
      </FluidCanvas>
    </div>
  )
}
