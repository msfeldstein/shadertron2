var glsl = require('glslify')
module.exports = glsl`
precision mediump float;
uniform float time;
uniform vec3 u_baseColor;
uniform vec3 u_color1;
uniform vec3 u_color2;
#pragma glslify: noise = require(glsl-noise/simplex/3d)

void main() {
  vec4 c = vec4(0.0, 0.0, 0.0, 1.0);
    float brightness = noise(vec3(gl_FragCoord.xy / 1000.0, time / 5.0));
    c.rgb += u_color1 * brightness + u_color2 * (1.0 - brightness);

  gl_FragColor = c;
}
`
