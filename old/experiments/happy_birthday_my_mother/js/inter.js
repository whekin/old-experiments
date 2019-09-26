/*
 * Требуется поддержка multytouch и жестов
 */
 "use strict";

;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(["exports"], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.inter = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
	
	let distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

	let is_touch_device  = () => ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

	let onStart = (evt) => {
		evt.stopPropagation();

		if (inter.context != window) {
			evt.preventDefault();
		}
		
		inter.currentEvent = 1;
		inter.down = true;
		inter.downTimeS = Date.now();

		if (evt.type == "mousedown") {
			evt.preventDefault();

			inter.sx = evt.clientX;
			inter.sy = evt.clientY;
		} else if (evt.type == "touchstart") {
			inter.sx = evt.touches[0].clientX;
			inter.sy = evt.touches[0].clientY;

			inter.touch.fingersCount = evt.touches.length;

			for (let i = 0; i < evt.touches.length; i++) {
				inter.touch.sx[i] = evt.touches[i].clientX;
				inter.touch.sy[i] = evt.touches[i].clientY;
			}
			if (inter.touch.fingersCount > 1) {
				inter.touch.sfingersDistance = distance(inter.touch.sx[0], inter.touch.sy[0], inter.touch.sx[1], inter.touch.sy[1]);
			} else {
				inter.touch.sfingersDistance = null;
			}
		}
	};

	// for touchend
	let lastTouchMoveX = [0], lastTouchMoveY = [0]; 

	let timeout;

	let onMove = (evt) => {
		if (inter.context != window) {
			evt.preventDefault();
		}
		
		if (timeout !== undefined)
			window.clearTimeout(timeout); 
			timeout = setTimeout(() => {
			inter.currentEvent = 0;
			inter.velocity = 0;
			inter.velocityX = 0;
			inter.velocityY = 0;
			inter.fdx = 0;
			inter.fdy = 0;
		}, 100);

		if (inter.currentEvent != 2)
			inter.currentEvent = 2;

		inter.lastNowM = inter.nowM;
		inter.nowM = Date.now();
		inter.lastDtm = inter.dtm;
		inter.dtm = inter.nowM - inter.lastNowM;

		inter.lastMx = inter.mx;
		inter.lastMy = inter.my;

		if (inter.down)
			inter.downTime = Date.now() - inter.downTimeS;

		if (evt.type == "mousemove") {
			inter.mx = evt.clientX;
			inter.my = evt.clientY;
		} else if (evt.type == "touchmove") {
			inter.mx = evt.touches[0].clientX;
			inter.my = evt.touches[0].clientY;

			inter.touch.fingersCount = evt.touches.length;

			for (let i = 0; i < evt.touches.length; i++) {
				inter.touch.mx[i] = lastTouchMoveX[i] = evt.touches[i].clientX;
				inter.touch.my[i] = lastTouchMoveY[i] = evt.touches[i].clientY;
			}

			if (inter.touch.fingersCount > 1) {
				inter.touch.mfingersDistance = distance(inter.touch.mx[0], inter.touch.my[0], inter.touch.mx[1], inter.touch.my[1]);
			} else {
				inter.touch.mfingersDistance = null;
			}
		}

		inter.dx = inter.mx - inter.sx;
		inter.dy = inter.my - inter.sy;

		inter.distance = distance(inter.sx, inter.sy, inter.mx, inter.my);
		inter.fdistance = distance(inter.lastMx, inter.lastMy, inter.mx, inter.my);

		inter.fdx = inter.mx - inter.lastMx;
		inter.fdy = inter.my - inter.lastMy;

		inter.velocityX = inter.fdx / inter.dtm;
		inter.velocityY = inter.fdy / inter.dtm;

		inter.velocity = inter.fdistance / inter.dtm;
	};

	let onEnd = (evt) => {
		evt.stopPropagation();
		
		if (inter.context != window) {
			evt.preventDefault();
		}
		
		inter.currentEvent = 3;

		inter.down = false;
		inter.downTimeE = Date.now();
		inter.downTime = inter.downTimeE - inter.downTimeS;

		if (evt.type == "mouseup") {
			inter.ex = evt.clientX;
			inter.ey = evt.clientY;
		} else if (evt.type == "touchend") {
			inter.ex = lastTouchMoveX[0];
			inter.ey = lastTouchMoveY[0];

			for (let i = 0; i < lastTouchMoveX.length; i++) {
				inter.touch.ex[i] = lastTouchMoveX[i];
				inter.touch.ey[i] = lastTouchMoveY[i];
			}
			inter.touch.fingersCount = 0;
		}
	};

	let inter = {
		// mouse or touch
		type: null,
		// 0 - is stop
		// 1 - start mouse | touch
		// 2 - move
		// 3 - end
		currentEvent: null,
		// touch | mouse down
		down: false,
		downTime: null,
		downTimeS: null,
		downTimeE: null,
		// start | down
		sx: null,
		sy: null,
		// move
		mx: null,
		my: null,
		// end | up
		ex: null,
		ey: null,
		// date now from 1970
		nowM: null,
		lastNowM: null,
		//
		lastMx: null,
		lastMy: null,
		// mouse(down, move, up)|touch(start|move|end)
		currentEvent: null,
		// Delta (from start to current position)
		dx: null,
		dy: null,
		// move distance
		mdistance: null,
		// move frame distanse
		mfdistance: null,
		// delta is for the frame
		fdx: null,
		fdy: null,

		// delta time move
		dtm: null, 
		lastDtm: null,
		// velocity finger | mouse (pixel/millisecond)
		velocityX: null,
		velocityY: null,
		// vector
		velocity: null,
		// addition touch and mouse separately
		touch: {
			sx: [],
			sy: [],
			mx: [],
			my: [],
			ex: [],
			ey: [],
			fingersCount: 0,
			sfingersDistance: null,
			mfingersDistance: null
		},
		context: window,
		mouse: {},
		init: function (context = window) {
			inter.context = context;

			if (inter.type == 'touch') {
				context.addEventListener("touchstart", onStart, false);
				context.addEventListener("touchmove", onMove, false);
				context.addEventListener("touchend", onEnd, false);
			} else if (inter.type == 'mouse') {
				context.addEventListener("mousedown", onStart, false);
				context.addEventListener("mousemove", onMove, false);
				context.addEventListener("mouseup", onEnd, false);
			}
		},
		stop: function () {
			let context = inter.context;

			if (inter.type == 'touch') {
				context.removeEventListener("touchstart", onStart);
				context.removeEventListener("touchmove", onMove);
				context.removeEventListener("touchend", onEnd);
			} else if (inter.type == 'mouse') {
				context.removeEventListener("mousedown", onStart);
				context.removeEventListener("mousemove", onMove);
				context.removeEventListener("mouseup", onEnd);
			}
		}
	}

	// Определение типа взаиможействия (touch | mouse)
	if (is_touch_device()) {
		inter.type = "touch";
	} else if ('onmousedown' in window) {
		inter.type = "mouse"
	}

    return inter;
}));