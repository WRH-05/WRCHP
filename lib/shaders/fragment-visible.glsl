precision highp float;

uniform sampler2D tFluid;
uniform float uTime;
varying vec2 vUv;

void main() {
  // Get the fluid velocity/density
  vec3 fluid = texture2D(tFluid, vUv).rgb;
  
  // Make the fluid itself visible with bright colors
  vec3 color = fluid * 3.0; // Amplify the fluid colors
  
  // Add some brightness so we can see it
  float brightness = length(fluid.rg) * 0.5;
  color += vec3(brightness);
  
  gl_FragColor = vec4(color, 1.0);
}
