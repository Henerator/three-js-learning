in vec3 vertexNormal;

void main() {
  float intensity = pow(0.5 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);
  vec4 color = vec4(0.3, 0.6, 1.0, 1.0);

  gl_FragColor = color * intensity;
}
