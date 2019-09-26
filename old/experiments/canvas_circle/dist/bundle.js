/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return options; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mouse_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__colors_js__ = __webpack_require__(6);






let options = {
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
circle.x = __WEBPACK_IMPORTED_MODULE_0__canvas_js__["a" /* c */].w*0.5;
circle.y = __WEBPACK_IMPORTED_MODULE_0__canvas_js__["a" /* c */].h*0.5;


__WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].lineWidth = 2;

let draw = () => {
	if (__WEBPACK_IMPORTED_MODULE_1__mouse_js__["a" /* touch */].down) {
		circle.kx = __WEBPACK_IMPORTED_MODULE_1__mouse_js__["a" /* touch */].dx*options.speedDetect;
		circle.ky = __WEBPACK_IMPORTED_MODULE_1__mouse_js__["a" /* touch */].dy*options.speedDetect;
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
	if (circle.x > __WEBPACK_IMPORTED_MODULE_0__canvas_js__["a" /* c */].w - options.radius -k + 1) {
		circle.kx = -circle.kx*options.frictionWall;
		circle.x = __WEBPACK_IMPORTED_MODULE_0__canvas_js__["a" /* c */].w-options.radius -k;
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
	else if (circle.y + options.radius - 1 >  __WEBPACK_IMPORTED_MODULE_0__canvas_js__["a" /* c */].h -k) {
		circle.ky = -circle.ky*options.frictionWall;
		circle.y = __WEBPACK_IMPORTED_MODULE_0__canvas_js__["a" /* c */].h-options.radius - k;
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

	__WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].save();

	__WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].translate(circle.x, circle.y);
	__WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].rotate(Math.PI/180*45);

	// color
	let gr1 = __WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].createRadialGradient(0, 0, 50, 0, 0, 0);
	gr1.addColorStop(0, __WEBPACK_IMPORTED_MODULE_2__colors_js__["a" /* colors */].gr_one);
	gr1.addColorStop(1, __WEBPACK_IMPORTED_MODULE_2__colors_js__["a" /* colors */].gr_two);

	// Градиент, если не задан цвет в настройках
	__WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].fillStyle = options.color? options.color : gr1;

	__WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].beginPath();
	__WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].moveTo(0, -options.radius);

	// Доработать точки
	/* right */  __WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].bezierCurveTo(options.radius*compression.right, -options.radius, options.radius, -options.radius*compression.right, options.radius, 0);
	/* bottom */ __WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].bezierCurveTo(options.radius, options.radius*compression.bottom, options.radius*compression.bottom, options.radius, 0, options.radius);
	/* left */   __WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].bezierCurveTo(-options.radius*compression.left, options.radius, -options.radius, options.radius*compression.left, -options.radius, 0);
	/* top */    __WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].bezierCurveTo(-options.radius, -options.radius*compression.top, -options.radius*compression.top, -options.radius, 0, -options.radius);

	__WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].fill();
	__WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].restore();

	// постоянное трение об "воздух"
	if (Math.abs(circle.kx + circle.ky) > 0.001) {
		circle.kx *= options.friction;
		circle.ky += options.gravity;
		circle.ky *= options.friction;
	}
};

let clearCanvas = () => {
	__WEBPACK_IMPORTED_MODULE_0__canvas_js__["c" /* ctx */].clearRect(0, 0, __WEBPACK_IMPORTED_MODULE_0__canvas_js__["a" /* c */].w, __WEBPACK_IMPORTED_MODULE_0__canvas_js__["a" /* c */].h);
};

let animation = () => {
	clearCanvas();
	draw();
	requestAnimationFrame(animation);
};

requestAnimationFrame(animation);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ctx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return c; });


let canvas = document.createElement("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

canvas.id = "canvas";

let ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

let c = {
  w: 0,
  h: 0
}

c.w = canvas.width;
c.h = canvas.height;

// При изменении окна подогнать canvas
addEventListener("resize", () => {
  c.w = innerWidth;
  c.h = innerHeight;

  canvas.width = c.w;
  canvas.height = c.h;
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__set__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__circle__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__test__);






/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fullscreen_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__circle_js__ = __webpack_require__(0);





let set = document.getElementById("set");
let send = document.getElementById("send");
let fullscreen = document.getElementById("fullscreen");
let warning = document.getElementById("warning");

let isFullScreen = false;

let animTiming = 400; // ms
let isOpenSettings = false;

let openSettings = () => {
	set.className = "btn open";
	settings.className = "open";
	settings.style.display = "block";
	isOpenSettings = true;
	setTimeout(() => {
		set.innerHTML = "Закрыть";
	}, animTiming);
};

let closeSettings = () => {
	set.className = "btn close";
	settings.className = "close";
	setTimeout(() => {
		settings.style.display = "none";
		isOpenSettings = false;
		set.innerHTML = "настройки";
	}, animTiming);
};
// Открывать настройки по клику на #set
set.addEventListener("click", () => {
	if (!isOpenSettings)
		openSettings();
	else 
		closeSettings();
});

// по клику пл кнопке "Применить" активировать низменения
send.addEventListener("click", () => {

	let form = document.forms.settings;

	canvas.style.backgroundColor = form["back-color"].value;

	__WEBPACK_IMPORTED_MODULE_1__circle_js__["a" /* options */].color = ~form.color.value.indexOf("#ffa000") ? null : form.color.value;
	__WEBPACK_IMPORTED_MODULE_1__circle_js__["a" /* options */].radius = +form.radius.value;
	__WEBPACK_IMPORTED_MODULE_1__circle_js__["a" /* options */].speedDetect = +form.speedDetect.value;
	__WEBPACK_IMPORTED_MODULE_1__circle_js__["a" /* options */].frictionWall = +form.frictionWall.value;
	
	__WEBPACK_IMPORTED_MODULE_1__circle_js__["a" /* options */].friction = +form.friction.value;

	closeSettings();
});

// Обработка клика по "fullscreen"
fullscreen.addEventListener("click", () => {
	if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null) {
		Object(__WEBPACK_IMPORTED_MODULE_0__fullscreen_js__["a" /* cancelFullscreen */])(document.documentElement);
		fullscreen.innerHTML = "Полноэкранный режим";
	} else {
		try {
			Object(__WEBPACK_IMPORTED_MODULE_0__fullscreen_js__["b" /* launchFullScreen */])(document.documentElement);
			fullscreen.innerHTML = "Обычный режим!";
		} catch(ex) {
			alert("Полноэкранный режим не поддерживается..")
		}
	}
});

warning.addEventListener("click", function () {
	warning.className = "warning close";
	setTimeout(function() {
		warning.style.display = "none";
	}, 500);
});

// Поведение карт настроек
let labels = document.getElementsByTagName("label");
for (var i = 0; i < labels.length; i++) {
	labels[i].addEventListener("keyup", (e) => {
		if (e.keyCode == 13 || e.keyCode == 27) {
			e.target.blur();
		}
	});
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = launchFullScreen;
/* harmony export (immutable) */ __webpack_exports__["a"] = cancelFullscreen;


function launchFullScreen(element) {
	if(element.requestFullScreen) {
		element.requestFullScreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen();
	}
}
// Выход из полноэкранного режима
function cancelFullscreen() {
	if(document.cancelFullScreen) {
		document.cancelFullScreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	}
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return touch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas_js__ = __webpack_require__(1);




let touch = {
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

__WEBPACK_IMPORTED_MODULE_0__canvas_js__["b" /* canvas */].addEventListener("mousedown", (e) => {

	e.preventDefault();

	touch.xS = parseInt(e.clientX);
	touch.yS = parseInt(e.clientY);

	touch.down = true;
});

__WEBPACK_IMPORTED_MODULE_0__canvas_js__["b" /* canvas */].addEventListener("mousemove", (e) => {

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


__WEBPACK_IMPORTED_MODULE_0__canvas_js__["b" /* canvas */].addEventListener("touchstart", (e) => {

	e.preventDefault();

	touch.xS = parseInt(e.touches[0].clientX);
	touch.yS = parseInt(e.touches[0].clientY);

	touch.down = true;
});

__WEBPACK_IMPORTED_MODULE_0__canvas_js__["b" /* canvas */].addEventListener("touchmove", (e) => {

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

__WEBPACK_IMPORTED_MODULE_0__canvas_js__["b" /* canvas */].addEventListener("touchend", handleEnd);
__WEBPACK_IMPORTED_MODULE_0__canvas_js__["b" /* canvas */].addEventListener("mouseup", handleEnd);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return colors; });
let colors = {
	gr_one: "#FFD54F",
	gr_two: "#FFA000"
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {




/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map