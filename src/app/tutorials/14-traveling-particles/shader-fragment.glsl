in float vOpacity;

void main() {
  vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
  vec2 cUv = 2.0 * uv - 1.0;

  vec3 originColor = vec3(4.0 / 255.0, 10.0 / 255.0, 20.0 / 255.0);

  vec4 color = vec4(0.08 / length(cUv));
  color.rgb = min(vec3(10.0), color.rgb);
  color.rgb *= originColor * 120.0;
  color *= vOpacity;

  color.a = min(1.0, color.a) * 1.0;

  float circle = 1.0 - length(cUv);

  gl_FragColor = vec4(color.rgb, color.a);
}
