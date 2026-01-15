precision highp float;

uniform sampler2D tMap;
uniform sampler2D tFluid;
uniform float uTime;
varying vec2 vUv;

void main() {
  // Get fluid data - velocity (rg) and density info
  vec3 fluid = texture2D(tFluid, vUv).rgb;
  
  // Calculate fluid intensity
  float velocity = length(fluid.rg);
  
  // Create distortion effect on the rendered scene (tMap)
  vec2 distortedUv = vUv - fluid.rg * 0.001;
  
  // Sample the scene with distortion
  vec4 sceneColor = texture2D(tMap, distortedUv);
  
  // Add chromatic aberration based on fluid velocity
  vec3 offset = fluid * 0.003;
  float r = texture2D(tMap, distortedUv + offset.rg * 0.5).r;
  float g = texture2D(tMap, distortedUv).g;
  float b = texture2D(tMap, distortedUv - offset.rg * 0.5).b;
  
  // Create colored fluid trails - red/orange tint
  vec3 fluidGlow = vec3(0.0);
  fluidGlow.r = velocity * 2.0 + abs(fluid.r) * 1.5;
  fluidGlow.g = velocity * 0.8 + abs(fluid.g) * 0.5;
  fluidGlow.b = velocity * 0.3;
  
  // Combine scene with chromatic aberration and fluid glow
  vec3 finalColor = vec3(r, g, b) + fluidGlow * 0.5;
  
  gl_FragColor = vec4(finalColor, 1.0);
}
