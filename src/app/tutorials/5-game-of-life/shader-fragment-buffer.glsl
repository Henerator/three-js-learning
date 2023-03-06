in vec2 uvInterpolator;

uniform vec2 u_resolution;
uniform sampler2D u_texture;

float getNeighboursCount(vec2 p) {
  float count = 0.0;

  for(float y = -1.0; y <= 1.0; y++) {
    for(float x = -1.0; x <= 1.0; x++) {

      if(x == 0.0 && y == 0.0)
        continue;

      vec2 offset = vec2(x, y) / u_resolution.xy;
      vec4 neighbour = texture2D(u_texture, p + offset);
      count += neighbour.g > 0.5 ? 1.0 : 0.0;
    }
  }

  return count;
}

void main() {
  vec2 uv = uvInterpolator;

  vec3 color = vec3(0.0);

  bool alive = texture2D(u_texture, uv).g > 0.5;
  float neighbors = getNeighboursCount(uv);

  if(alive && (neighbors == 2.0 || neighbors == 3.0)) {
    color = vec3(1.0);
  } else if(!alive && (neighbors == 3.0)) {
    color = vec3(0.0, 1.0, 0.0);
  }

  gl_FragColor = vec4(color, 1.0);
}
