precision highp float;

uniform sampler2D tMap;
uniform sampler2D tFluid;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec3 fluid = texture2D(tFluid, vUv).rgb;
  
  // Main distortion based on fluid velocity
  vec2 uv2 = vUv - fluid.rg * 0.0003;

  // Sample the scene with distortion (no chromatic aberration)
  vec4 color = texture2D(tMap, uv2);

  gl_FragColor = color;
}
