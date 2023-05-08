in vec3 vPosition;
in vec3 vNormal;
in vec3 vEyeDirection;
in vec3 vLayer0;
in vec3 vLayer1;
in vec3 vLayer2;

uniform samplerCube uCubeTexture;

float fresnel(vec3 eye, vec3 worldNormal) {
  return pow(1.0 + dot(eye, worldNormal), 3.0);
}

float sunBrightness() {
  float sum = 0.0;
  sum += textureCube(uCubeTexture, vLayer0).r;
  sum += textureCube(uCubeTexture, vLayer1).r;
  sum += textureCube(uCubeTexture, vLayer2).r;
  sum *= 0.33;
  return sum;
}

vec3 brightnessToColor(float b) {
  b *= 0.25;
  return (vec3(b, pow(b, 2.0), pow(b, 4.0)) / 0.3) * 0.8;
}

void main() {
  float edgeGlow = fresnel(vEyeDirection, vNormal);

  float brigtness = sunBrightness();
  brigtness = brigtness * 4.0 + 1.0;
  brigtness += pow(edgeGlow, 0.4);

  vec3 color = brightnessToColor(brigtness);
  gl_FragColor = vec4(color, 1.0);
}
