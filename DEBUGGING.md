# Debugging Fluid Simulation

## Issue
The WebGL fluid simulation is not visible when enabled. The red cursor shadow you saw was from the Landing component's radial gradient, not from the WebGL fluid.

## What I've Disabled

### 1. FluidCanvas Wrapper
In `app/page.tsx`, the FluidCanvas is commented out:
```tsx
// <FluidCanvas>
  <main>...</main>
// </FluidCanvas>
```

### 2. Red Cursor Shadow
In `components/landing.tsx`, the radial gradient following cursor is disabled:
```tsx
{/* <div 
  className="absolute inset-0 opacity-5"
  style={{
    background: `radial-gradient(...)`
  }}
/> */}
```

## To Re-Enable

### Step 1: Uncomment FluidCanvas
In `app/page.tsx`:
```tsx
import { FluidCanvas } from "@/components/fluid-canvas"

export default function Home() {
  return (
    <FluidCanvas>
      <main>...</main>
    </FluidCanvas>
  )
}
```

### Step 2: Test with Simple Page
Create `app/test-fluid/page.tsx`:
```tsx
'use client'

import { FluidCanvas } from '@/components/fluid-canvas'

export default function TestFluid() {
  return (
    <FluidCanvas>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white">
          Move Your Mouse
        </h1>
      </div>
    </FluidCanvas>
  )
}
```

## Possible Issues

### 1. Canvas Not Visible
The canvas might need CSS adjustments. Check:
```css
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black; /* Add this to see if canvas renders */
}
```

### 2. Shaders Not Loading
Check browser console for errors about shader compilation.

### 3. WebGL Context Issues
Some browsers/devices might not support WebGL2.

## Next Steps

1. Check browser console for errors
2. Add `console.log` in FluidSimulation constructor
3. Verify canvas element is created
4. Test on different browser

## Files Involved

- `app/page.tsx` - Main page (FluidCanvas disabled)
- `components/landing.tsx` - Red shadow disabled  
- `components/fluid-canvas.tsx` - Canvas wrapper
- `lib/webgl/FluidSimulation.ts` - Fluid simulation engine
- `lib/shaders/*.glsl` - GLSL shader files
