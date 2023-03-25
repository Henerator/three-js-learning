in vec3 vWorldPosition;

uniform float uTime;

float createWave(vec3 center, float waveLength, float dTime) {
  float waveLengthHalf = waveLength / 2.0;
  float dist = distance(vWorldPosition, center);
  float visibleWaves = 30.0;
  float wavePart = mod(dist - dTime, waveLength);
  float color = smoothstep(0.0, waveLengthHalf, abs(waveLengthHalf - wavePart));
  color *= 1.0 - smoothstep(0.0, waveLength * visibleWaves, dist);
  return color;
}

void main() {
  float waveLength = 0.4;
  float dTime = uTime * 0.0005;

  vec3 waveCenterA = vec3(-5.0, 5.0, 0.0);
  float radialMoveA = createWave(waveCenterA, waveLength, dTime);

  vec3 waveCenterB = vec3(5.0, 5.0, 0.0);
  float radialMoveB = createWave(waveCenterB, waveLength, dTime);

  vec3 waveCenterC = vec3(0.0, -5.0, 0.0);
  float radialMoveC = createWave(waveCenterC, waveLength, dTime);

  float radialMove = radialMoveA + radialMoveB + radialMoveC;

  gl_FragColor = vec4(vec3(radialMove), 1.0);
}
