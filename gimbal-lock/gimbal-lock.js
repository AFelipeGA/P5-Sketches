let figure;
let yaw, pitch, roll;
let yawText, pitchText, rollText;
let yawRange, pitchRange, rollRange;
let config = 'yxz';

function preload() {
  figure = loadModel('assets/x-wing/xwing.obj');
  image_1 = loadImage('assets/x-wing/xwing.jpg');
}

function setup() {

  yaw = 0;
  yawText = document.getElementById('yaw-text');
  yawRange = document.getElementById('yaw-range');

  pitch = 0;
  pitchText = document.getElementById('pitch-text');
  pitchRange = document.getElementById('pitch-range');

  roll = 0;
  rollText = document.getElementById('roll-text');
  rollRange = document.getElementById('roll-range');

  angleMode(DEGREES)
  createCanvas(600, 600, WEBGL);
}

function draw() {

  background(0);
  noStroke();

  camera(-200, -200, 600, 0, 0, 0, 0, 1, 0);

  switch(config){
    case 'yxz':
      yxz();
      break;
    case 'xyz':
      xyz();
      break;
    case 'xzy':
      xzy();
      break;
  }
}

function drawXWing(){
  push();
  translate(0, 45, -60);
  rotateY(180);
  texture(image_1);
  model(figure);
  pop();
}

function drawGimbal(pos, axis){
  push();
  switch(axis){
    case 'x':
      rotateY(90);
      fill(255, 0, 0);
      break;
    case 'y':
      rotateX(90);
      fill(0, 255, 0);
      break;
    case 'z':
      fill(0, 0, 255);
      break;
  }
  switch(pos){
    case 'inner':
      torus(220, 5);
      break;
    case 'middle':
      torus(230, 5);
      break;
    case 'outer':
      torus(240, 5);
      break;
  }
  pop();
}

function degreesChange(axis, value){
  switch(axis){
    case 'Y':
      yaw = value;
      yawText.innerHTML = value;
      break;
    case 'X':
      pitch = value;
      pitchText.innerHTML = value;
      break;
    case 'Z':
      roll = value;
      rollText.innerHTML = value;
      break;
  }
}

function handleClick(value){
  config = value;
}

function yxz(){
  push();
  // Y - Axis
  rotateY(yaw);
  drawGimbal('outer', 'y');
  push();
  // X - Axis
  rotateX(pitch);
  drawGimbal('middle', 'x');
  push();
  // Z - Axis
  rotateZ(roll);
  drawGimbal('inner', 'z');
  drawXWing();
  pop();
  pop();
  pop();
}

function xyz(){
  push();
  // X - Axis
  rotateX(pitch);
  drawGimbal('outer', 'x');
  push();
  // Y - Axis
  rotateY(yaw);
  drawGimbal('middle', 'y');
  push();
  // Z - Axis
  rotateZ(roll);
  drawGimbal('inner', 'z');
  drawXWing();
  pop();
  pop();
  pop();
}

function xzy(){
  push();
  // X - Axis
  rotateX(pitch);
  drawGimbal('outer', 'x');
  push();
  // Z - Axis
  rotateZ(roll);
  drawGimbal('middle', 'z');
  push();
  // Y - Axis
  rotateY(yaw);
  drawGimbal('inner', 'y');
  drawXWing();
  pop();
  pop();
  pop();
}