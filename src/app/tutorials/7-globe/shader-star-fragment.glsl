uniform float uTime;

in float vertexFrequency;

void main() {
  vec3 color = vec3(1.0, 1.0, 1.0) * sin(vertexFrequency * uTime / 100.0);
  gl_FragColor = vec4(color, 1.0);
}
