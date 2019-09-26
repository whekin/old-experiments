"use strict";

import {canvas} from './canvas.js';

export let touch = {
		xS: 0,
		yS: 0,
		xM: 0,
		yM: 0,
		xE: 0,
		yE: 0,
		dx: 0,
		dy: 0,
		dxs: 0,
		dys: 0,
		dxsE: 0,
		dysE: 0,
		down: false
};

canvas.addEventListener("mousedown", (e) => {

	e.preventDefault();

	touch.xS = parseInt(e.clientX);
	touch.yS = parseInt(e.clientY);

	touch.down = true;
});

canvas.addEventListener("mousemove", (e) => {

	e.preventDefault();

	touch.xM = e.clientX;
	touch.yM = e.clientY;

	if (touch.down) {
		touch.dx = touch.xM - touch.xS;
		touch.dy = touch.yM - touch.yS;

		touch.dxs = touch.dxsE + touch.dx;
		touch.dys = touch.dysE + touch.dy;
	}
});


canvas.addEventListener("touchstart", (e) => {

	e.preventDefault();

	touch.xS = parseInt(e.touches[0].clientX);
	touch.yS = parseInt(e.touches[0].clientY);

	touch.down = true;
});

canvas.addEventListener("touchmove", (e) => {

	e.preventDefault();

	touch.xM = parseInt(e.touches[0].clientX);
	touch.yM = parseInt(e.touches[0].clientY);

	touch.dx = touch.xM - touch.xS;
	touch.dy = touch.yM - touch.yS;

	touch.dxs = touch.dxsE + touch.dx;
	touch.dys = touch.dysE + touch.dy;

});

let handleEnd = (e) => {

	e.preventDefault();

	touch.xE = touch.xM;
	touch.yE = touch.yM;

	touch.dxsE = touch.dxs;
	touch.dysE = touch.dys;

	touch.down = false;

	touch.dx = 0;
	touch.dy = 0;
}

canvas.addEventListener("touchend", handleEnd);
canvas.addEventListener("mouseup", handleEnd);
