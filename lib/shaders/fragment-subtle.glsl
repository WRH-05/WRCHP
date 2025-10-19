precision highp float;

uniform sampler2D tMap;
uniform sampler2D tFluid;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec3 fluid = texture2D(tFluid, vUv).rgb;
  
  // Main distortion based on fluid velocity
  vec2 uv2 = vUv - fluid.rg * 0.0003;

  // Sample the scene with distortion
  vec4 color = texture2D(tMap, uv2);

  // OPTION 1: Reduce chromatic aberration (make it more subtle)
  vec3 rgb = fluid * 0.001; // Changed from 0.003 to 0.001 (less effect)

  color.r = texture2D(tMap, vec2(uv2.x + rgb.x, uv2.y + rgb.y)).r;
  color.g = texture2D(tMap, vec2(uv2.x - rgb.x, uv2.y + rgb.y)).g;
  color.b = texture2D(tMap, vec2(uv2.x - rgb.x, uv2.y - rgb.y)).b;

  gl_FragColor = color;
}
