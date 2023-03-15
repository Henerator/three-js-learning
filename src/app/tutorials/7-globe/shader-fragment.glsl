in vec2 vertexUv;
in vec3 vertexNormal;

uniform sampler2D uTexture;

void main() {
  float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
  vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

  vec3 color = atmosphere + texture2D(uTexture, vertexUv).xyz;
  gl_FragColor = vec4(color, 1.0);
}
