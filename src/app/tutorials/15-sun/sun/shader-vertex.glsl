out vec3 vPosition;
out vec3 vNormal;
out vec3 vEyeDirection;
out vec3 vLayer0;
out vec3 vLayer1;
out vec3 vLayer2;

uniform float uTime;

mat2 rotate(float value) {
  float dy = sin(value);
  float dx = cos(value);
  return mat2(dx, -dy, dy, dx);
}

void main() {
  vPosition = position;
  vNormal = normal;

  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vEyeDirection = normalize(worldPosition.xyz - cameraPosition);

  float time = uTime * 0.0002;

  mat2 rotation0 = rotate(time);
  vec3 p0 = position;
  p0.yz = rotation0 * p0.yz;
  vLayer0 = p0;

  mat2 rotation1 = rotate(time * 1.1 + 10.0);
  vec3 p1 = position;
  p1.xz = rotation1 * p1.xz;
  vLayer1 = p1;

  mat2 rotation2 = rotate(time * 1.3 + 30.0);
  vec3 p2 = position;
  p2.xy = rotation2 * p2.xy;
  vLayer2 = p2;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
