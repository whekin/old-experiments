"use strict";

import {canvas, ctx, c} from './canvas.js';
import {touch} from './mouse.js';
import {colors} from './colors.js';

export let options = {
	color: null,
	radius: 50,
	speedDetect: 0.09,
	frictionWall: 0.9,
	friction: 0.995,
	gravity: 1,
	maxKx: 50,
	maxKy: 50
};

let circle = {
	p: 0, // potontsialny energy
	x: null,
	y: null,
	kx: 0,
	ky: -9,
};

// Стартовое положение круга
circle.x = c.w*0.5;
circle.y = c.h*0.5;


ctx.lineWidth = 2;

let draw = () => {
	if (touch.down) {
		circle.kx = touch.dx*options.speedDetect;
		circle.ky = touch.dy*options.speedDetect;
	}

	// Ограничение скорости
	if (circle.kx > options.maxKx)
		circle.kx = options.maxKx;
	if (circle.ky > options.maxKy)
		circle.ky = options.maxKy;

	// Движение по вектору
	circle.x += circle.kx;
	circle.y += circle.ky;

	// Соприкосновение
	let wall = {
		left: false,
		top: false,
		bottom: false,
		right: false
	};

	let k = -circle.p < 20? 0.5*circle.p*options.radius/50 + 1 : -10*options.radius/50 + 1;
	// стены

	// right
	if (circle.x > c.w - options.radius -k + 1) {
		circle.kx = -circle.kx*options.frictionWall;
		circle.x = c.w-options.radius -k;
		circle.p = circle.kx;
		wall.right = true;
	}
	// left
	else if (circle.x < options.radius + k) {
		circle.kx = -circle.kx*options.frictionWall;
		circle.x = options.radius + k
		circle.p = -circle.kx;
		wall.left = true;
	}
	// top
	if (circle.y < options.radius + k - 1) {
		circle.ky = -circle.ky*options.frictionWall;
		circle.y = options.radius + k;
		circle.p = -circle.ky;
		wall.top = true;
	}
	// bottom
	else if (circle.y + options.radius - 1 >  c.h -k) {
		circle.ky = -circle.ky*options.frictionWall;
		circle.y = c.h-options.radius - k;
		circle.p = circle.ky;
		wall.bottom = true;
	}

	// Востановление круга после удара
	if (circle.p < 0) {
		circle.p++;
	}
	if (circle.p < 0) {
		circle.p++;
	}

	// Некоторые замены круга

	/*ctx.moveTo(circle.x, circle.y - options.radius);

	ctx.quadraticCurveTo(circle.x + options.radius, circle.y - options.radius, circle.x + options.radius, circle.y);
	ctx.quadraticCurveTo(circle.x + options.radius, circle.y + options.radius, circle.x, circle.y + options.radius);
	ctx.quadraticCurveTo(circle.x - options.radius, circle.y + options.radius, circle.x - options.radius, circle.y);
	ctx.quadraticCurveTo(circle.x - options.radius, circle.y - options.radius, circle.x, circle.y - options.radius);
	*/

	/* people
	ctx.moveTo(circle.x, circle.y - options.radius);

	ctx.bezierCurveTo(circle.x + options.radius*0.5, circle.y - options.radius, circle.x + options.radius, circle.y - options.radius*0.5 ,circle.x + options.radius, circle.y);
	ctx.bezierCurveTo(circle.x + options.radius*0.5, circle.y - options.radius, circle.x + options.radius, circle.y - options.radius*0.5 ,circle.x, circle.y + options.radius);
	ctx.bezierCurveTo(circle.x + options.radius*0.5, circle.y - options.radius, circle.x + options.radius, circle.y - options.radius*0.5 ,circle.x - options.radius, circle.y);
	ctx.bezierCurveTo(circle.x + options.radius*0.5, circle.y - options.radius, circle.x + options.radius, circle.y - options.radius*0.5 ,circle.x, circle.y - options.radius);
	*/

	// круг, упругость
	let compression = {
		left: 0.58,
		top: 0.58,
		right: 0.58,
		bottom: 0.58
	}

	// Если удар об стену, то двигаем точки безье
	// Доработать алгоритм.
	var l = -circle.p < 20? 0.58 + circle.p/52 : 0.2;

	if (wall.left) compression.left = l;
	else if (wall.right) compression.right = l;

	if (wall.top) compression.top = l;
	else if (wall.bottom) compression.bottom = l;

	ctx.save();

	ctx.translate(circle.x, circle.y);
	ctx.rotate(Math.PI/180*45);

	// color
	let gr1 = ctx.createRadialGradient(0, 0, 50, 0, 0, 0);
	gr1.addColorStop(0, colors.gr_one);
	gr1.addColorStop(1, colors.gr_two);

	// Градиент, если не задан цвет в настройках
	ctx.fillStyle = options.color? options.color : gr1;

	ctx.beginPath();
	ctx.moveTo(0, -options.radius);

	// Доработать точки
	/* right */  ctx.bezierCurveTo(options.radius*compression.right, -options.radius, options.radius, -options.radius*compression.right, options.radius, 0);
	/* bottom */ ctx.bezierCurveTo(options.radius, options.radius*compression.bottom, options.radius*compression.bottom, options.radius, 0, options.radius);
	/* left */   ctx.bezierCurveTo(-options.radius*compression.left, options.radius, -options.radius, options.radius*compression.left, -options.radius, 0);
	/* top */    ctx.bezierCurveTo(-options.radius, -options.radius*compression.top, -options.radius*compression.top, -options.radius, 0, -options.radius);

	ctx.fill();
	ctx.restore();

	// постоянное трение об "воздух"
	if (Math.abs(circle.kx + circle.ky) > 0.001) {
		circle.kx *= options.friction;
		circle.ky += options.gravity;
		circle.ky *= options.friction;
	}
};

let clearCanvas = () => {
	ctx.clearRect(0, 0, c.w, c.h);
};

let animation = () => {
	clearCanvas();
	draw();
	requestAnimationFrame(animation);
};

requestAnimationFrame(animation);
