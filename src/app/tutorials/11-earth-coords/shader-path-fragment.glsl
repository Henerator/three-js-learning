in vec2 vUv;

uniform float uTime;

void main() {
  float dash = sin(vUv.x * 50.0 - uTime * 0.005);

  if(dash < 0.0)
    discard;

  gl_FragColor = vec4(vUv.x, 1.0, 1.0, 1.0);
}
