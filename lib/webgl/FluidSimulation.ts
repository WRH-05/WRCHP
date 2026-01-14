import { Camera, Color, Geometry, Post, Program, Mesh, Renderer, RenderTarget, Vec2 } from 'ogl'

import advectionManualFilteringShader from '../shaders/advection-manual-filtering-shader.glsl'
import advectionShader from '../shaders/advection-shader.glsl'
import baseVertex from '../shaders/base-vertex.glsl'
import clearShader from '../shaders/clear-shader.glsl'
import curlShader from '../shaders/curl-shader.glsl'
import divergenceShader from '../shaders/divergence-shader.glsl'
import fragmentAdaptive from '../shaders/fragment-adaptive.glsl'
import gradientSubtractShader from '../shaders/gradient-subtract-shader.glsl'
import pressureShader from '../shaders/pressure-shader.glsl'
import splatShader from '../shaders/splat-shader.glsl'
import vorticityShader from '../shaders/vorticity-shader.glsl'

function getSupportedFormat(gl: WebGL2RenderingContext, internalFormat: number, format: number, type: number): { internalFormat: number; format: number } | null {
  if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
    switch (internalFormat) {
      case gl.R16F: return getSupportedFormat(gl, gl.RG16F, gl.RG, type)
      case gl.RG16F: return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type)
      default: return null
    }
  }

  return { internalFormat, format }
}

function supportRenderTextureFormat(gl: WebGL2RenderingContext, internalFormat: number, format: number, type: number): boolean {
  let texture = gl.createTexture()

  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null)

  let fbo = gl.createFramebuffer()

  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)

  if (status != gl.FRAMEBUFFER_COMPLETE) {
    return false
  }

  return true
}

function createDoubleFBO(
  gl: any,
  options: any
) {
  const fbo = {
    read: new RenderTarget(gl, options),
    write: new RenderTarget(gl, options),
    swap: () => {
      let temp = fbo.read
      fbo.read = fbo.write
      fbo.write = temp
    },
  }

  return fbo
}

const SIMULATION_RESOLUTION = 128
const DYE_RESOLUTION = 512
const ITERATIONS = 3

let densityDissipation = 0.93
let velocityDissipation = 0.9
let pressureDissipation = 0.8
let curlStrength = 20
let radius = 0.3

export interface FluidSimulationOptions {
  /** Chromatic aberration strength: 0 = none (good for white), 1 = full (good for dark). Default: 0.3 */
  chromaticStrength?: number
}

export class FluidSimulation {
  renderer: Renderer
  gl: any
  camera!: Camera
  post!: Post
  pass: any
  sizes!: Vec2
  viewport!: Vec2
  
  density: any
  velocity: any
  pressure: any
  divergence!: RenderTarget
  curl!: RenderTarget
  triangle!: Geometry
  
  clearProgram!: Mesh
  splatProgram!: Mesh
  advectionProgram!: Mesh
  divergenceProgram!: Mesh
  curlProgram!: Mesh
  vorticityProgram!: Mesh
  pressureProgram!: Mesh
  gradientSubtractProgram!: Mesh
  
  splats: Array<{ x: number; y: number; dx: number; dy: number }>
  lastMouse: Vec2
  
  // Configurable chromatic aberration strength
  chromaticStrength: number
  
  // Bound event handlers for proper cleanup
  private boundUpdateMouse: (e: MouseEvent | TouchEvent) => void

  constructor(canvas: HTMLCanvasElement, options: FluidSimulationOptions = {}) {
    this.chromaticStrength = options.chromaticStrength ?? 0.3 // Subtle default, works on both light/dark
    
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: window.devicePixelRatio, // Use full device pixel ratio like original
      canvas
    })

    this.gl = this.renderer.gl
    this.splats = []
    this.lastMouse = new Vec2()
    
    // Bind event handler once for proper cleanup
    this.boundUpdateMouse = this.updateMouse.bind(this)

    this.createCamera()
    this.createPost()
    this.createMouseFluid()

    this.onResize()
    this.setupEventListeners()
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 2
  }

  createPost() {
    this.post = new Post(this.gl)

    this.pass = this.post.addPass({
      fragment: fragmentAdaptive,
      uniforms: {
        tFluid: { value: null },
        uTime: { value: 0 },
        uChromaticStrength: { value: this.chromaticStrength },
      },
    })
  }
  
  /** Update chromatic aberration strength at runtime (0 = none, 1 = full) */
  setChromaticStrength(strength: number) {
    this.chromaticStrength = Math.max(0, Math.min(1, strength))
    if (this.pass) {
      this.pass.uniforms.uChromaticStrength.value = this.chromaticStrength
    }
  }

  createMouseFluid() {
    const supportLinearFiltering = this.gl.renderer.extensions[`OES_texture_${this.gl.renderer.isWebgl2 ? `` : `half_`}float_linear`]
    const halfFloat = this.gl.renderer.isWebgl2 ? this.gl.HALF_FLOAT : this.gl.renderer.extensions['OES_texture_half_float'].HALF_FLOAT_OES
    const filtering = supportLinearFiltering ? this.gl.LINEAR : this.gl.NEAREST

    let rgba, rg, r

    if (this.gl.renderer.isWebgl2) {
      rgba = getSupportedFormat(this.gl, this.gl.RGBA16F, this.gl.RGBA, halfFloat)
      rg = getSupportedFormat(this.gl, this.gl.RG16F, this.gl.RG, halfFloat)
      r = getSupportedFormat(this.gl, this.gl.R16F, this.gl.RED, halfFloat)
    } else {
      rgba = getSupportedFormat(this.gl, this.gl.RGBA, this.gl.RGBA, halfFloat)
      rg = rgba
      r = rgba
    }

    this.gl.renderer.getExtension('OES_standard_derivatives')

    const texelSize = { value: new Vec2(1 / SIMULATION_RESOLUTION) }

    // Create fluid simulation FBOs
    this.density = createDoubleFBO(this.gl, {
      width: DYE_RESOLUTION,
      height: DYE_RESOLUTION,
      type: halfFloat,
      format: rgba?.format,
      internalFormat: rgba?.internalFormat,
      minFilter: filtering,
      depth: false,
    })

    this.velocity = createDoubleFBO(this.gl, {
      width: SIMULATION_RESOLUTION,
      height: SIMULATION_RESOLUTION,
      type: halfFloat,
      format: rg?.format,
      internalFormat: rg?.internalFormat,
      minFilter: filtering,
      depth: false,
    })

    this.pressure = createDoubleFBO(this.gl, {
      width: SIMULATION_RESOLUTION,
      height: SIMULATION_RESOLUTION,
      type: halfFloat,
      format: r?.format,
      internalFormat: r?.internalFormat,
      minFilter: this.gl.NEAREST,
      depth: false,
    })

    this.divergence = new RenderTarget(this.gl, {
      width: SIMULATION_RESOLUTION,
      height: SIMULATION_RESOLUTION,
      type: halfFloat,
      format: r?.format,
      internalFormat: r?.internalFormat,
      minFilter: this.gl.NEAREST,
      depth: false,
    })

    this.curl = new RenderTarget(this.gl, {
      width: SIMULATION_RESOLUTION,
      height: SIMULATION_RESOLUTION,
      type: halfFloat,
      format: r?.format,
      internalFormat: r?.internalFormat,
      minFilter: this.gl.NEAREST,
      depth: false,
    })

    // Geometry to be used for the simulation programs
    this.triangle = new Geometry(this.gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    })

    // Create fluid simulation programs
    this.clearProgram = new Mesh(this.gl, {
      geometry: this.triangle,
      program: new Program(this.gl, {
        vertex: baseVertex,
        fragment: clearShader,
        uniforms: {
          texelSize,
          uTexture: { value: null },
          value: { value: pressureDissipation },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    this.splatProgram = new Mesh(this.gl, {
      geometry: this.triangle,
      program: new Program(this.gl, {
        vertex: baseVertex,
        fragment: splatShader,
        uniforms: {
          texelSize,
          uTarget: { value: null },
          aspectRatio: { value: 1 },
          color: { value: new Color() },
          point: { value: new Vec2() },
          radius: { value: radius / 100 },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    this.advectionProgram = new Mesh(this.gl, {
      geometry: this.triangle,
      program: new Program(this.gl, {
        vertex: baseVertex,
        fragment: supportLinearFiltering ? advectionShader : advectionManualFilteringShader,
        uniforms: {
          texelSize,
          dyeTexelSize: { value: new Vec2(1 / DYE_RESOLUTION) },
          uVelocity: { value: null },
          uSource: { value: null },
          dt: { value: 0.016 },
          dissipation: { value: 1 },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    this.divergenceProgram = new Mesh(this.gl, {
      geometry: this.triangle,
      program: new Program(this.gl, {
        vertex: baseVertex,
        fragment: divergenceShader,
        uniforms: {
          texelSize,
          uVelocity: { value: null },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    this.curlProgram = new Mesh(this.gl, {
      geometry: this.triangle,
      program: new Program(this.gl, {
        vertex: baseVertex,
        fragment: curlShader,
        uniforms: {
          texelSize,
          uVelocity: { value: null },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    this.vorticityProgram = new Mesh(this.gl, {
      geometry: this.triangle,
      program: new Program(this.gl, {
        vertex: baseVertex,
        fragment: vorticityShader,
        uniforms: {
          texelSize,
          uVelocity: { value: null },
          uCurl: { value: null },
          curl: { value: curlStrength },
          dt: { value: 0.016 },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    this.pressureProgram = new Mesh(this.gl, {
      geometry: this.triangle,
      program: new Program(this.gl, {
        vertex: baseVertex,
        fragment: pressureShader,
        uniforms: {
          texelSize,
          uPressure: { value: null },
          uDivergence: { value: null },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })

    this.gradientSubtractProgram = new Mesh(this.gl, {
      geometry: this.triangle,
      program: new Program(this.gl, {
        vertex: baseVertex,
        fragment: gradientSubtractShader,
        uniforms: {
          texelSize,
          uPressure: { value: null },
          uVelocity: { value: null },
        },
        depthTest: false,
        depthWrite: false,
      }),
    })
  }

  setupEventListeners() {
    window.addEventListener('touchstart', this.boundUpdateMouse, false)
    window.addEventListener('touchmove', this.boundUpdateMouse, false)
    window.addEventListener('mousemove', this.boundUpdateMouse, false)
  }

  updateMouse(e: MouseEvent | TouchEvent) {
    let x: number, y: number

    if ('changedTouches' in e && e.changedTouches && e.changedTouches.length) {
      x = e.changedTouches[0].pageX
      y = e.changedTouches[0].pageY
    } else if ('pageX' in e) {
      x = e.pageX
      y = e.pageY
    } else {
      return
    }

    if (!this.lastMouse.x && !this.lastMouse.y) {
      this.lastMouse.set(x, y)
      return
    }

    const deltaX = x - this.lastMouse.x
    const deltaY = y - this.lastMouse.y

    this.lastMouse.set(x, y)

    if (Math.abs(deltaX) || Math.abs(deltaY)) {
      this.splats.push({
        x: x / this.gl.renderer.width,
        y: 1 - y / this.gl.renderer.height,
        dx: deltaX * 5,
        dy: deltaY * -5,
      })
    }
  }

  splat({ x, y, dx, dy }: { x: number; y: number; dx: number; dy: number }) {
    this.splatProgram.program.uniforms.uTarget.value = this.velocity.read.texture
    this.splatProgram.program.uniforms.aspectRatio.value = this.gl.renderer.width / this.gl.renderer.height
    this.splatProgram.program.uniforms.point.value.set(x, y)
    this.splatProgram.program.uniforms.color.value.set(dx, dy, 1)

    this.gl.renderer.render({
      scene: this.splatProgram,
      target: this.velocity.write,
      sort: false,
      update: false,
    })

    this.velocity.swap()

    this.splatProgram.program.uniforms.uTarget.value = this.density.read.texture

    this.gl.renderer.render({
      scene: this.splatProgram,
      target: this.density.write,
      sort: false,
      update: false,
    })

    this.density.swap()
  }

  update(scene?: any) {
    this.renderer.autoClear = false

    // Render all of the inputs since last frame
    for (let i = this.splats.length - 1; i >= 0; i--) {
      this.splat(this.splats.splice(i, 1)[0])
    }

    this.curlProgram.program.uniforms.uVelocity.value = this.velocity.read.texture
    this.renderer.render({ scene: this.curlProgram, target: this.curl, sort: false, update: false })

    this.vorticityProgram.program.uniforms.uVelocity.value = this.velocity.read.texture
    this.vorticityProgram.program.uniforms.uCurl.value = this.curl.texture
    this.renderer.render({ scene: this.vorticityProgram, target: this.velocity.write, sort: false, update: false })
    this.velocity.swap()

    this.divergenceProgram.program.uniforms.uVelocity.value = this.velocity.read.texture
    this.renderer.render({ scene: this.divergenceProgram, target: this.divergence, sort: false, update: false })

    this.clearProgram.program.uniforms.uTexture.value = this.pressure.read.texture
    this.renderer.render({ scene: this.clearProgram, target: this.pressure.write, sort: false, update: false })
    this.pressure.swap()

    this.pressureProgram.program.uniforms.uDivergence.value = this.divergence.texture

    for (let i = 0; i < ITERATIONS; i++) {
      this.pressureProgram.program.uniforms.uPressure.value = this.pressure.read.texture
      this.renderer.render({ scene: this.pressureProgram, target: this.pressure.write, sort: false, update: false })
      this.pressure.swap()
    }

    this.gradientSubtractProgram.program.uniforms.uPressure.value = this.pressure.read.texture
    this.gradientSubtractProgram.program.uniforms.uVelocity.value = this.velocity.read.texture
    this.renderer.render({ scene: this.gradientSubtractProgram, target: this.velocity.write, sort: false, update: false })
    this.velocity.swap()

    this.advectionProgram.program.uniforms.dyeTexelSize.value.set(1 / SIMULATION_RESOLUTION)
    this.advectionProgram.program.uniforms.uVelocity.value = this.velocity.read.texture
    this.advectionProgram.program.uniforms.uSource.value = this.velocity.read.texture
    this.advectionProgram.program.uniforms.dissipation.value = velocityDissipation
    this.renderer.render({ scene: this.advectionProgram, target: this.velocity.write, sort: false, update: false })
    this.velocity.swap()

    this.advectionProgram.program.uniforms.dyeTexelSize.value.set(1 / DYE_RESOLUTION)
    this.advectionProgram.program.uniforms.uVelocity.value = this.velocity.read.texture
    this.advectionProgram.program.uniforms.uSource.value = this.density.read.texture
    this.advectionProgram.program.uniforms.dissipation.value = densityDissipation
    this.renderer.render({ scene: this.advectionProgram, target: this.density.write, sort: false, update: false })
    this.density.swap()

    this.renderer.autoClear = true

    // Update post pass uniform with the simulation output
    this.pass.uniforms.tFluid.value = this.density.read.texture

    // Post.render() automatically renders the scene to tMap texture
    // and then applies the post-processing shader with both tMap and tFluid
    this.post.render({ camera: this.camera, scene })
  }

  onResize() {
    const { innerHeight: height, innerWidth: width } = window

    this.renderer.setSize(width, height)

    this.camera.perspective({
      aspect: width / height,
    })

    const fov = this.camera.fov * (Math.PI / 180)
    const sceneHeight = 2 * Math.tan(fov / 2) * this.camera.position.z
    const sceneWidth = sceneHeight * this.camera.aspect

    this.sizes = new Vec2(sceneWidth, sceneHeight)
    this.viewport = new Vec2(width, height)

    this.post.resize()
  }

  destroy() {
    window.removeEventListener('touchstart', this.boundUpdateMouse)
    window.removeEventListener('touchmove', this.boundUpdateMouse)
    window.removeEventListener('mousemove', this.boundUpdateMouse)
    
    // Clean up WebGL resources
    this.renderer.gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}
