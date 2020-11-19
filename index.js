// Calling the regl module with no arguments creates a full screen canvas and
// WebGL context, and then uses this context to initialize a new REGL instance
const regl = require('regl')()
const shader = require("./stripe.glsl")

// Calling regl() creates a new partially evaluated draw command
const drawQuad = regl({

  // Shaders in regl are just strings.  You can use glslify or whatever you want
  // to define them.  No need to manually create shader objects.
  frag: shader,

  vert: `
    precision mediump float;
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0, 1);
    }`,

  attributes: {
    position: regl.buffer([
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, -1],
      [1, 1],
      [-1, 1]
    ])
  },

  uniforms: {
    color: regl.prop('color'),
    u_color1: regl.prop('u_color1'),
    u_color2: regl.prop('u_color2'),
    time: regl.prop('time')
  },

  count: 6
})

regl.frame(({time}) => {
  regl.clear({
    color: [0, 0, 0, 0],
    depth: 1
  })

  drawQuad({
    color: [
      1,
      0,
      Math.cos(time * 0.3),
      1
    ],
    "u_color1": [1, 0.2000, 0.2392],
    "u_color2": [0.5647, 0.8784, 1],
    time

  })
})
