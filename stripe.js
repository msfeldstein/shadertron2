/**
 * A WebGL example of a full-screen shader effect, using Regl.
 * @author Matt DesLauriers (@mattdesl)
 */

const canvasSketch = require('canvas-sketch');
const createRegl = require('regl');
const createQuad = require('primitive-quad');
const glslify = require('glslify');
const path = require('path');
const shader = require("./stripe.glsl")

console.log({ shader })
// Setup our sketch
const settings = {
  pixelsPerInch: 300,
  animate: true,
  scaleToView: true,
  context: 'webgl',
  canvas: document.querySelector('.background-canvas')
};

const sketch = ({ gl, update, render, pause }) => {
  // Create regl for handling GL stuff
  const regl = createRegl({ gl, extensions: [ 'OES_standard_derivatives' ] });
  // A mesh for a flat plane
  const quad = createQuad();
  // Draw command
  const drawQuad = regl({
    // Fragment & Vertex shaders
    frag: shader,
    vert: `
      precision mediump float;
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0, 1);
      }
    `,
    // Pass down props from javascript
    uniforms: {
      aspect: regl.prop('aspect'),
      time: regl.prop('time')
    },
    // Setup transparency blending
    // Send mesh vertex attributes to shader
    attributes: {
      position: quad.positions
    },
    // The indices for the quad mesh
    elements: regl.elements(quad.cells)
  });

  return {
    render ({ context, time, width, height }) {
      // On each tick, update regl timers and sizes
      regl.poll();

      // Clear backbuffer with pure white
      regl.clear({
        color: [ 0, 0, 0, 0 ],
        depth: 1,
        stencil: 0
      });

      // Draw generative / shader art
      drawQuad({ time, aspect: width / height });

      // Flush pending GL calls for this frame
      gl.flush();
    }
  };
};

canvasSketch(sketch, settings);
