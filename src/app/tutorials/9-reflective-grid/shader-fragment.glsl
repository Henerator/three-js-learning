in vec2 vUv;
in vec3 vNormal;
in vec3 vViewPosition;
in vec3 vWorldPosition;

uniform float uTime;
uniform sampler2D uMatcapTexture;
uniform sampler2D uScanTexture;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 x = normalize(vec3(viewDir.z, 0.0, -viewDir.x));
  vec3 y = cross(viewDir, x);
  vec2 uv = vec2(dot(x, vNormal), dot(y, vNormal)) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

  vec2 scanUv = fract(vWorldPosition.xz);
  if(vNormal.y < 0.0) {
    scanUv = fract(vUv * 10.0);
  }

  vec4 scanColor = texture2D(uScanTexture, scanUv);

  vec3 waveCenter = vec3(0.0);
  float dist = distance(vWorldPosition, waveCenter);
  float radialMove = fract(dist - uTime);
  radialMove *= 1.0 - smoothstep(6.0, 7.0, dist);
  radialMove *= 1.0 - step(uTime, dist);

  float scanMix = smoothstep(0.7, 0.0, 1.0 - radialMove);
  scanMix *= 1.0 + scanColor.r * 0.7;
  scanMix += smoothstep(0.1, 0.0, 1.0 - radialMove);

  vec3 color = mix(vec3(0.4, 0.0, 0.0), vec3(0.5, 0.5, 1.0), scanMix);

  vec4 matcapColor = texture2D(uMatcapTexture, uv);
  gl_FragColor = matcapColor;
  gl_FragColor.rgb = mix(gl_FragColor.rgb, color, scanMix);
}
