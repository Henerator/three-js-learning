in vec3 vNormal;

vec3 brightnessToColor(float b) {
  b *= 0.25;
  return (vec3(b, pow(b, 2.0), pow(b, 4.0)) / 0.3) * 0.6;
}

void main() {
  float radial = 1.0 - vNormal.z;
  radial = pow(radial, 3.0);

  float brigtness = 1.0 + radial * 0.83;

  gl_FragColor.rgb = brightnessToColor(brigtness) * radial;
  gl_FragColor.a = radial;
}
