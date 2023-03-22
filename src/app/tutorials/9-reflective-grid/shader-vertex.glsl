uniform float uTime;

in float yOffset;

out vec2 vUv;
out vec3 vNormal;
out vec3 vViewPosition;
out vec3 vWorldPosition;

void main() {
  vUv = uv;

  float vOffset = yOffset + sin(uTime + yOffset * 2.0);
  vOffset *= 0.5;

  vec4 mvPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);
  mvPosition.y += vOffset;
  mvPosition = viewMatrix * mvPosition;
  vViewPosition = -mvPosition.xyz;

  vNormal = normalize(normalMatrix * mat3(instanceMatrix) * normal);

  vec4 worldPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);
  worldPosition.y += vOffset;
  vWorldPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * mvPosition;
}
