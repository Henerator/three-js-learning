out vec2 vertexUv;
out vec3 vertexNormal;

void main() {
  vertexUv = uv;
  vertexNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
