const game = new Game_loop();
const canvas_width = innerWidth;
const canvas_height = innerHeight;
const particle_radius = 15;
const wall_circle_radius = canvas_width < canvas_height ? canvas_width / 2 - 50 : canvas_height / 2 - 50;
const MOUSE_MASS = -150;
const PARTICLE_MASS = -10;
const canvas = document.getElementById("canvas_field");
canvas.width = canvas_width;
canvas.height = canvas_height;

const ctx = canvas.getContext("2d");
const inter = new Inter(canvas);