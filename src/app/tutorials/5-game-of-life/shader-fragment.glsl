in vec2 uvInterpolator;

uniform sampler2D u_texture;

void main() {
  vec2 uv = uvInterpolator;
  vec4 color = texture2D(u_texture, uv);
  gl_FragColor = vec4(color.rgb, 1.0);
}
