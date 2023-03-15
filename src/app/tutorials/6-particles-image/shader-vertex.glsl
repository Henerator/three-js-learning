uniform float gTime;
uniform float gOffsetStep;
uniform vec2 gMouse;
uniform float gApplyEffect;
uniform float gTransition;

attribute vec3 vCoordinate;
attribute float vSpeed;
attribute float vOffset;
attribute float vFrequency;
attribute float vAmplitude;

varying vec2 vUv;
varying vec2 vfCoordinate;
varying vec3 vfPosition;

void main() {
  vUv = uv;

  // not stable
  vec3 notStable = position;
  notStable.x += sin(gOffsetStep * vSpeed) * 3.0;
  notStable.y += sin(gOffsetStep * vSpeed) * 3.0;
  notStable.z += mod(gOffsetStep * vSpeed + vOffset, 2000.0) - 1000.0;

  // stable
  vec3 stable = position;
  float mouseDist = distance(stable.xy, gMouse);
  float effectArea = 1.0 - smoothstep(0.0, 130.0, mouseDist);

  stable.x += 30.0 * sin(gTime * 0.1 * vFrequency) * vAmplitude * effectArea * gApplyEffect;
  stable.y += 30.0 * sin(gTime * 0.1 * vFrequency) * vAmplitude * effectArea * gApplyEffect;
  stable.z += 100.0 * cos(gTime * 0.1 * vFrequency) * vAmplitude * effectArea * gApplyEffect;

  // mix
  vec3 pos = mix(stable, notStable, gTransition);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

  gl_PointSize = 5000.0 / -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;

  vfCoordinate = vCoordinate.xy;
  vfPosition = pos;
}
