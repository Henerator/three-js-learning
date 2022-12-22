in vec2 uvInterpolator;
uniform float u_time;
uniform sampler2D u_texture;

float getRandom(float inputValue, float seed) {
  return fract(sin(inputValue * 321.123) * seed);
}

float getRandomByV2(vec2 inputValue, float seed) {
  return fract(sin(dot(inputValue, vec2(123.321, 45.64))) * seed);
}

vec2 getDrop(vec2 uv, float seed) {
  float shiftY = getRandom(0.5, seed);
  uv.y += shiftY;

  float cellsResolution = 10.0;
  uv *= cellsResolution;

  float row = floor(uv.y);
  float shiftX = getRandom(row, seed);
  uv.x += shiftX;

  vec2 cellIndex = floor(uv);
  vec2 cellUv = fract(uv);

  vec2 cellCenter = vec2(0.5);
  float distanceFromCenter = distance(cellUv, cellCenter);
  float isInsideDrop = 1.0 - step(0.1, distanceFromCenter);

  float isDropShown = step(0.8, getRandomByV2(cellIndex, seed + 2123.232));

  float dropIntensity = 1.0 - fract(u_time * 0.1 + getRandomByV2(cellIndex, seed + 3221.232) * 2.0) * 2.0;
  dropIntensity = sign(dropIntensity) * abs(dropIntensity * dropIntensity * dropIntensity * dropIntensity);
  dropIntensity = clamp(dropIntensity, 0.0, 1.0);

  vec2 vecToCenter = normalize(cellCenter - cellUv);
  vec2 dropValue = vecToCenter * distanceFromCenter * distanceFromCenter * 60.0;
  vec2 drop = dropValue * isDropShown * dropIntensity * isInsideDrop;

  return drop;
}

void main() {
  vec2 uv = uvInterpolator;
  vec2 drop = getDrop(uv, 43423.262);
  for(int i = 0; i < 10; i++) {
    drop += getDrop(uv, 1232.42 + float(i) * 31212.675);
  }
  uv += drop;
  vec4 color = texture2D(u_texture, uv);
  gl_FragColor = color;
}
