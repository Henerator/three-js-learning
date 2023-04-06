in vec2 vUv;

uniform sampler2D uTexture;
uniform vec3 uColor;

void main() {
  vec4 texture = texture2D(uTexture, vUv);

  gl_FragColor = vec4(uColor, texture.r);
}
