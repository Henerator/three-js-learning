in vec2 vertexUv;

uniform sampler2D uTexture;

void main() {
  gl_FragColor = texture2D(uTexture, vertexUv);
}
