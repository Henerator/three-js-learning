in vec2 vUv;

uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;
uniform sampler2D overlayTexture;

void main() {
  vec4 baseLayer = texture2D(baseTexture, vUv);
  vec4 bloomLayer = vec4(1.0) * texture2D(bloomTexture, vUv);
  vec4 overlayLayer = vec4(0.25) * texture2D(overlayTexture, vUv);

  gl_FragColor = baseLayer + bloomLayer + overlayLayer;
}
