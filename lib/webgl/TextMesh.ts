import { Mesh, Program, Texture, Plane } from 'ogl'
import textFragment from '../shaders/text-fragment.glsl'
import textVertex from '../shaders/text-vertex.glsl'

export class TextMesh {
  element: HTMLElement
  mesh: Mesh | null = null
  bounds: DOMRect
  canvas: any
  geometry: Plane
  scene: any

  constructor({ canvas, element, geometry, scene }: { canvas: any; element: HTMLElement; geometry: Plane; scene: any }) {
    this.canvas = canvas
    this.element = element
    this.geometry = geometry
    this.scene = scene

    this.bounds = element.getBoundingClientRect()

    this.createTexture()
  }

  createTexture() {
    const canvasText = document.createElement('canvas')
    const context = canvasText.getContext('2d')

    if (!context) return

    const dpr = Math.min(window.devicePixelRatio, 2)

    canvasText.height = this.bounds.height * dpr
    canvasText.width = this.bounds.width * dpr

    let text = this.element.textContent?.trim().replace(/  /g, '').replace(/<br>/g, '') || ''

    const { fontFamily, fontSize, letterSpacing, lineHeight } = getComputedStyle(this.element)
    const fontSizeValue = parseFloat(fontSize)
    const lineHeightValue = parseFloat(lineHeight)

    context.fillStyle = '#fff'
    context.font = `${fontSizeValue * dpr}px/${lineHeightValue * dpr}px ${fontFamily}`
    context.textAlign = 'left'
    context.textBaseline = 'top'

    const lines = text.split('\n')

    for (let i = 0; i < lines.length; i += 1) {
      context.fillText(lines[i], 0, (i * lineHeightValue * dpr).toFixed(2) as any)
    }

    this.createMesh(canvasText)
  }

  createMesh(canvas: HTMLCanvasElement) {
    const image = new Image()

    image.onload = () => {
      const texture = new Texture(this.canvas.gl, {
        premultiplyAlpha: true,
      })

      texture.image = image

      const program = new Program(this.canvas.gl, {
        fragment: textFragment,
        uniforms: {
          tMap: { value: texture },
          tCover: { value: null },
          uAlpha: { value: 1 },
          uNoise: { value: 0 },
          uOpacity: { value: 1 },
          uResolution: { value: [0, 0, 0, 0] },
          uTime: { value: 0 },
          uTransition: { value: 0 },
        },
        vertex: textVertex,
      })

      this.mesh = new Mesh(this.canvas.gl, {
        geometry: this.geometry,
        program,
      })

      this.mesh.position.z = 0.01
      this.mesh.setParent(this.scene)
    }

    image.src = canvas.toDataURL('image/webp', 1)
  }

  onResize() {
    this.bounds = this.element.getBoundingClientRect()
  }

  onLoop(scroll: number) {
    if (!this.bounds) return
    if (!this.mesh) return

    const aspect = this.bounds.height / this.bounds.width

    let a1: number
    let a2: number

    if (this.mesh.scale.y / this.mesh.scale.x > aspect) {
      a1 = (this.mesh.scale.x / this.mesh.scale.y) * aspect
      a2 = 1
    } else {
      a1 = 1
      a2 = this.mesh.scale.y / this.mesh.scale.x / aspect
    }

    this.mesh.program.uniforms.uResolution.value = [this.mesh.scale.x, this.mesh.scale.y, a1, a2]

    this.mesh.scale.x = (this.canvas.sizes.x * this.bounds.width) / this.canvas.viewport.x
    this.mesh.scale.y = (this.canvas.sizes.y * this.bounds.height) / this.canvas.viewport.y

    const x = this.bounds.left
    const y = this.bounds.top - scroll

    const xFix = -(this.canvas.sizes.x / 2) + this.mesh.scale.x / 2
    const yFix = this.canvas.sizes.y / 2 - this.mesh.scale.y / 2

    this.mesh.position.x = xFix + (x / this.canvas.viewport.x) * this.canvas.sizes.x
    this.mesh.position.y = yFix - (y / this.canvas.viewport.y) * this.canvas.sizes.y
  }
}
