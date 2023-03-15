attribute float vFrequency;

out float vertexFrequency;

void main() {
  vertexFrequency = vFrequency;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = 500.0 / -mvPosition.z;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
