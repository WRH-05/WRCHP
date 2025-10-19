'use client'

import { useState } from 'react'
import { FluidCanvas } from '@/components/fluid-canvas'
import { TextMorph } from '@/components/text-morph'

export default function TestBackgrounds() {
  const [activeBackground, setActiveBackground] = useState<'black' | 'white' | 'gradient' | 'portfolio'>('black')

  const backgrounds = {
    black: {
      bgClass: 'bg-black',
      textClass: 'text-white',
      subtitleClass: 'text-white/60',
      title: 'BLACK',
      subtitle: 'High contrast - most visible',
    },
    white: {
      bgClass: 'bg-white',
      textClass: 'text-black',
      subtitleClass: 'text-black/60',
      title: 'WHITE',
      subtitle: 'Also works great with dark text',
    },
    gradient: {
      bgClass: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
      textClass: 'text-white',
      subtitleClass: 'text-white/60',
      title: 'GRADIENT',
      subtitle: 'Works on any solid background',
    },
    portfolio: {
      bgClass: 'bg-background',
      textClass: 'text-foreground',
      subtitleClass: 'text-muted-foreground',
      title: 'CHROME',
      subtitle: 'Your actual portfolio theme',
    },
  }

  const current = backgrounds[activeBackground]

  return (
    <div className={`min-h-screen ${current.bgClass} transition-colors duration-500`}>
      {/* Navigation Buttons */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/50 backdrop-blur-md rounded-full p-2">
        <button
          onClick={() => setActiveBackground('black')}
          className={`px-6 py-2 rounded-full font-mono text-sm transition-all ${
            activeBackground === 'black'
              ? 'bg-white text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Black
        </button>
        <button
          onClick={() => setActiveBackground('white')}
          className={`px-6 py-2 rounded-full font-mono text-sm transition-all ${
            activeBackground === 'white'
              ? 'bg-white text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          White
        </button>
        <button
          onClick={() => setActiveBackground('gradient')}
          className={`px-6 py-2 rounded-full font-mono text-sm transition-all ${
            activeBackground === 'gradient'
              ? 'bg-white text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Gradient
        </button>
        <button
          onClick={() => setActiveBackground('portfolio')}
          className={`px-6 py-2 rounded-full font-mono text-sm transition-all ${
            activeBackground === 'portfolio'
              ? 'bg-white text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Portfolio
        </button>
      </div>

      {/* Fluid Canvas with Text */}
      <FluidCanvas>
        <div className="min-h-screen flex flex-col items-center justify-center pointer-events-auto">
          <TextMorph className={`text-9xl font-bold text-center ${current.textClass}`}>
            {current.title}
          </TextMorph>
          <p className={`text-center mt-4 text-lg ${current.subtitleClass}`}>
            {current.subtitle}
          </p>
          <p className={`text-center mt-8 text-sm font-mono ${current.subtitleClass}`}>
            Move your mouse to see the fluid distortion effect
          </p>
        </div>
      </FluidCanvas>
    </div>
  )
}
