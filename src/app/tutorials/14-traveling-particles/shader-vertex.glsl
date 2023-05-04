out vec2 vUv;
out float vOpacity;

attribute float opacity;

void main() {
  vUv = uv;
  vOpacity = opacity;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = 18.0;
  gl_Position = projectionMatrix * mvPosition;
}
