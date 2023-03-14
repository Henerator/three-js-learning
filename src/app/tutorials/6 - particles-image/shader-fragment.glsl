uniform float gResolution;
uniform sampler2D gTextureImage;
uniform sampler2D gTextureParticle;

varying vec2 vfCoordinate;
varying vec3 vfPosition;

void main() {
  vec4 particle = texture2D(gTextureParticle, gl_PointCoord);

  vec2 pUV = vec2(vfCoordinate.x / gResolution, vfCoordinate.y / gResolution);
  vec4 image = texture2D(gTextureImage, pUV);

  float alpha = 1.0 - clamp(0.0, 1.0, abs(vfPosition.z) / 600.0);

  gl_FragColor = image;
  gl_FragColor.a *= particle.r * alpha;
}
