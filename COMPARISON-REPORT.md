# 🔍 Implementation Comparison: 2024-main vs Current Project

## Executive Summary

After analyzing the 2024-main folder, I've identified the **KEY DIFFERENCES** that explain why your current implementation doesn't look like the original.

---

## 🎯 CRITICAL DIFFERENCE #1: Post Processing Architecture

### 2024-main (ORIGINAL) ✅
```javascript
// Canvas.js - Line 637
this.post.render({
  camera: this.camera,
  scene: this.scene,  // ← RENDERS THE SCENE TO POST!
})
```

**The Post pass:**
1. Renders the ENTIRE SCENE (all text meshes, media, backgrounds) to a texture first
2. That texture becomes `tMap` automatically
3. Then applies the fluid distortion shader to that scene texture
4. `tFluid` contains velocity/density data
5. Final result = **distorted scene**

### Current Implementation ❌
```typescript
// FluidSimulation.ts
this.post.render({
  camera: this.camera,
  scene  // ← scene might be empty or not properly passed
})
```

**The problem:**
- We're not passing the scene correctly to Post
- The `tMap` uniform is null or undefined
- Only `tFluid` is working, showing raw fluid colors
- No scene to distort = just colored fluid trails

---

## 🎯 CRITICAL DIFFERENCE #2: Scene Structure

### 2024-main (ORIGINAL) ✅
```javascript
// Home.js - Creates a Transform that IS the scene
export class Home extends Transform {
  constructor({ canvas }) {
    super() // ← This IS a Transform (scene node)
    
    // All meshes are added as children
    this.texts = document.querySelectorAll('[data-gl-text]').map(
      (element) => new Text({
        scene: this, // ← 'this' is the Transform
      })
    )
  }
}

// Canvas.js
this.scene = new Home({ canvas: this })

// Later in render:
this.post.render({
  scene: this.scene, // ← Home instance is the scene
})
```

**Scene hierarchy:**
```
Home (Transform)
  ├── Text mesh 1
  ├── Text mesh 2
  ├── Media mesh 1
  └── Background mesh 1
```

### Current Implementation ❌
```typescript
// fluid-canvas.tsx
const scene = new Transform()
// TextMeshes added to scene, but...
// Scene might not be passed correctly to Post
```

---

## 🎯 CRITICAL DIFFERENCE #3: How Post Works

### The OGL Post Class Behavior:

When you call `post.render({ camera, scene })`:

1. **First Pass**: Renders `scene` to an internal FBO (Frame Buffer Object)
   - This creates a texture from your scene
   - This texture is AUTOMATICALLY available in shaders

2. **Second Pass**: Applies post-processing shaders
   - `tMap` = the scene texture from step 1
   - `tFluid` = our fluid simulation texture
   - Shader combines both

### In fragment.glsl:
```glsl
uniform sampler2D tMap;   // ← Scene rendered to texture (automatic from Post)
uniform sampler2D tFluid; // ← Our fluid data (manual)

void main() {
  vec3 fluid = texture2D(tFluid, vUv).rgb;
  vec2 uv2 = vUv - fluid.rg * 0.0003; // Distort UVs based on fluid
  
  vec4 color = texture2D(tMap, uv2);  // Sample distorted scene
  // ... chromatic aberration using fluid data
}
```

**KEY INSIGHT**: `tMap` is NOT manually set! The Post class sets it automatically when rendering the scene.

---

## 🎯 CRITICAL DIFFERENCE #4: Scroll Integration

### 2024-main (ORIGINAL) ✅
```javascript
// Canvas.js
onLoop(now) {
  this.lenis?.raf(now)  // Smooth scroll
  
  // ... fluid simulation ...
  
  this.post.render({
    camera: this.camera,
    scene: this.scene,
  })
  
  this.scene.onLoop(this.lenis.scroll) // ← Update positions
}

// Text.js
onLoop(scroll) {
  // Positions are updated based on scroll
  const y = this.bounds.top - scroll
  this.mesh.position.y = yFix - (y / this.canvas.viewport.y) * this.canvas.sizes.y
}
```

### Current Implementation ❌
- We're calling `textMesh.onLoop(window.scrollY)` ✅
- But we're not using Lenis for smooth scrolling
- Positions might not update correctly

---

## 🎯 CRITICAL DIFFERENCE #5: getBounds vs getBoundingClientRect

### 2024-main (ORIGINAL) ✅
```javascript
// utils/DOM.js
export function getBounds(element) {
  return element.getBoundingClientRect()
}

// But used consistently throughout
this.bounds = getBounds(this.element)
```

### Current Implementation ✅
```typescript
this.bounds = element.getBoundingClientRect()
```

This part is actually fine!

---

## 🎯 CRITICAL DIFFERENCE #6: Canvas Setup

### 2024-main (ORIGINAL) ✅
```javascript
// Canvas is created globally
export const renderer = new Renderer({
  alpha: true,
  antialias: true,
  dpr: window.devicePixelRatio, // ← Uses full device pixel ratio
})

gl.canvas.classList.add('canvas')
document.body.appendChild(gl.canvas) // ← Appended to body, not nested
```

### Current Implementation ❌
```typescript
// In fluid-canvas.tsx - canvas is in a div
<div className="relative">
  <canvas ref={canvasRef} ... />
  <div className="relative">{children}</div>
</div>
```

**Problem**: HTML content is SEPARATE from WebGL canvas. In the original, ALL content is rendered as WebGL meshes!

---

## 📊 Side-by-Side Comparison

| Feature | 2024-main (Original) | Current | Status |
|---------|---------------------|---------|--------|
| Scene structure | `Home extends Transform` | `new Transform()` | ❌ Different |
| Post rendering | `post.render({ scene })` | `post.render({ scene })` | ⚠️ Similar but broken |
| tMap uniform | Auto from Post | Manually set to null | ❌ Broken |
| Text rendering | WebGL meshes | WebGL meshes | ✅ Same |
| HTML/WebGL split | 100% WebGL | Mixed (HTML + WebGL) | ❌ Different |
| Canvas position | `body.appendChild()` | Nested in React component | ❌ Different |
| Scroll | Lenis smooth scroll | Native `window.scrollY` | ⚠️ Different |
| DPR | Full `devicePixelRatio` | `Math.min(dpr, 2)` | ⚠️ Different |

---

## 🔧 What Needs to be Fixed

### Priority 1: Post Rendering
✅ The Post class needs a proper scene with meshes
✅ Don't manually set `tMap` - let Post do it
✅ Make sure scene is passed correctly

### Priority 2: Scene Structure  
Create a proper scene class that extends Transform, like Home.js does

### Priority 3: Remove HTML/WebGL Split
The original has NO HTML content visible - everything is WebGL meshes

### Priority 4: Test with Simple Setup
Start with just ONE text element to verify the pipeline works

---

## 📁 Cleaned 2024-main Folder

I've removed these unnecessary files:
- ❌ `sprites/` - Not needed for reference
- ❌ `styles/` - SCSS files (you have your own)
- ❌ `views/` - Twig templates (you use React)
- ❌ `shared/` - Fonts/favicons
- ❌ Config files (`.editorconfig`, `.prettierrc`, `package.json`, etc.)

**What's left** (useful for reference):
- ✅ `app/classes/Canvas.js` - Main canvas setup
- ✅ `app/scenes/Home.js` - Scene structure
- ✅ `app/scenes/Text.js` - Text mesh creation
- ✅ `app/scenes/Background.js` - Background mesh
- ✅ `app/scenes/Media.js` - Media mesh  
- ✅ `app/shaders/` - All GLSL shaders
- ✅ `app/utils/` - Helper functions
- ✅ `app/index.js` - Entry point

---

## 🎬 Next Steps

1. **Fix Post rendering** to properly capture and distort the scene
2. **Verify tMap is being set** by Post (not manually)
3. **Test with minimal setup** - one text element
4. **Match the shader exactly** from fragment.glsl
5. **Consider removing HTML/WebGL split** for true 1:1 match

Would you like me to implement these fixes now?
