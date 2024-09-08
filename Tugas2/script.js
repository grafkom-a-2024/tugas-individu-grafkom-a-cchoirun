// Get canvas and initialize WebGL context
const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');

// Define vertex shader
const vertexShaderSource = `
  attribute vec2 aPosition;
  uniform mat3 uMatrix;
  void main() {
    vec3 pos = uMatrix * vec3(aPosition, 1.0);
    gl_Position = vec4(pos.xy, 0.0, 1.0);
  }
`;

// Define fragment shader (color shader)
const fragmentShaderSource = `
  precision mediump float;
  uniform vec4 uColor;
  void main() {
    gl_FragColor = uColor;
  }
`;

// Compile shader function
function compileShader(gl, source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// Create program function
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// Initialize shaders
const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
const program = createProgram(gl, vertexShader, fragmentShader);
gl.useProgram(program);

// Define non-symmetric object (scalene triangle)
const positions = new Float32Array([
  -0.3, -0.3, // Vertex 1
  0.0,  0.5,  // Vertex 2
  0.5, -0.1   // Vertex 3
]);

// Create buffer and upload positions
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

// Enable attribute for position data
const positionLocation = gl.getAttribLocation(program, 'aPosition');
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// Set color uniform
const colorLocation = gl.getUniformLocation(program, 'uColor');

// Get matrix uniform location
const matrixLocation = gl.getUniformLocation(program, 'uMatrix');

// Define transformation matrices: translation, rotation, scaling
function createTranslationMatrix(tx, ty) {
  return [
    1, 0, 0,
    0, 1, 0,
    tx, ty, 1
  ];
}

function createRotationMatrix(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    c, s, 0,
   -s, c, 0,
    0, 0, 1
  ];
}

function createScalingMatrix(sx, sy) {
  return [
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1
  ];
}

// Combine matrices by multiplying them
function multiplyMatrices(a, b) {
  const result = new Array(9);
  for (let row = 0; row < 3; ++row) {
    for (let col = 0; col < 3; ++col) {
      result[row * 3 + col] = 0;
      for (let i = 0; i < 3; ++i) {
        result[row * 3 + col] += a[row * 3 + i] * b[i * 3 + col];
      }
    }
  }
  return result;
}

// Draw a triangle with a specific transformation matrix
function drawTriangle(matrix, color) {
  gl.uniformMatrix3fv(matrixLocation, false, matrix);
  gl.uniform4f(colorLocation, color[0], color[1], color[2], 1.0);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// Main render function
function drawScene() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Triangle 1: Normal
  let matrix = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ];
  drawTriangle(matrix, [1.0, 0.0, 0.0]); // Red

  // Triangle 2: Translated
  const translationMatrix = createTranslationMatrix(0.6, 0.0);
  matrix = multiplyMatrices(translationMatrix, matrix);
  drawTriangle(matrix, [0.0, 1.0, 0.0]); // Green

  // Triangle 3: Rotated
  const rotationMatrix = createRotationMatrix(Math.PI / 4); // 45 degrees
  matrix = multiplyMatrices(rotationMatrix, [
    1, 0, 0,
    0, 1, 0,
    -0.6, 0, 1 // Moving back for visibility
  ]);
  drawTriangle(matrix, [0.0, 0.0, 1.0]); // Blue

  // Triangle 4: Scaled
  const scalingMatrix = createScalingMatrix(1.5, 0.7);
  matrix = multiplyMatrices(scalingMatrix, [
    1, 0, 0,
    0, 1, 0,
    0, -0.6, 1 // Move down for visibility
  ]);
  drawTriangle(matrix, [1.0, 1.0, 0.0]); // Yellow
}

// Set up WebGL state
gl.clearColor(0.0, 0.0, 0.0, 1.0);

// Render the scene
drawScene();
