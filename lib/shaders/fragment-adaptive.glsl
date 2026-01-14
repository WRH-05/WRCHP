precision highp float;

uniform sampler2D tMap;
uniform sampler2D tFluid;
uniform float uTime;
uniform float uChromaticStrength; // 0.0 = no chromatic, 1.0 = full chromatic
varying vec2 vUv;

void main() {
  vec3 fluid = texture2D(tFluid, vUv).rgb;
  
  // Main distortion based on fluid velocity
  vec2 distortedUv = vUv - fluid.rg * 0.0003;

  // Sample the scene with distortion
  vec4 color = texture2D(tMap, distortedUv);

  // Chromatic aberration - scaled by uniform for adaptability
  // On white backgrounds, reduce or disable this effect
  vec3 rgb = fluid * 0.003 * uChromaticStrength;

  // Only apply chromatic aberration if strength > 0
  if (uChromaticStrength > 0.01) {
    color.r = texture2D(tMap, vec2(distortedUv.x + rgb.x, distortedUv.y + rgb.y)).r;
    color.g = texture2D(tMap, vec2(distortedUv.x - rgb.x, distortedUv.y + rgb.y)).g;
    color.b = texture2D(tMap, vec2(distortedUv.x - rgb.x, distortedUv.y - rgb.y)).b;
  }

  gl_FragColor = color;
}
