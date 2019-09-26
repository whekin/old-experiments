var app =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global_var__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global_var */ "./js/global_var.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./js/modal.js");
/* harmony import */ var _plot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plot */ "./js/plot.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./math */ "./js/math.js");
/* harmony import */ var _button_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./button.js */ "./js/button.js");
/**
 * @module touch
 * @author Whekin <stanislavkalishin@gmail.com>
 * @version 1.0 beta 1
 * @todo довести до ума
 */









// т.к eval не видит Mymath
let log = _math__WEBPACK_IMPORTED_MODULE_3__["default"].log
let randomInt = _math__WEBPACK_IMPORTED_MODULE_3__["default"].getRnd

let canvas = document.getElementById("plot")
let info_btn = document.getElementById("info_btn")
let block_btn = document.getElementById("block_btn")
let derivative_btn = document.getElementById("derivative_btn")

let info_rus = document.getElementById("info-rus")
let info_rus_modal = new _modal__WEBPACK_IMPORTED_MODULE_1__["default"](info_rus)

// let info_eng = document.getElementById("info_eng")
// let info_eng_modal = new Modal(info_rus)

let warning_rus = document.getElementById("warning-rus")
let warning_rus_modal = new _modal__WEBPACK_IMPORTED_MODULE_1__["default"](warning_rus)

// let warning_eng = document.getElementById("warning_eng")
// let warning_eng_modal = new Modal(warning_eng)

/**
 * Calculate a factorial of a number
 * @param {number} num
 * @return {number}
 */
let factorial = (num) => {
  if (num === 1)
    return 1
  return num * factorial(num - 1)
}

let factorial_reg = (match, p1) => {
  return factorial(+p1)
}

let persentage_reg = (match, p1) => {
  return +p1 / 100
}

let ctg_reg = (match, p1, p2, p3) => {
  return p1 + "1 / Math.tan(" + p3
}

let actg_reg = (match, p1, p2, p3) => {
  return p1 + "Math.PI / 2 - Math.atan(" + p3
}

let log_reg = (match, p1, p2, p3) => {
  return p1 + "log(" + p3
}

let abs_reg = (match, p1, p2, p3) => {
  return p1 + "Math.abs(" + p2 + ")" + p3
}

let random_int_reg = (match, p1, p2, p3) => {
  return p1 + "randomInt" + p3
}
/**
 * Analize a function for errors and replace
 * @param {string}
 * return {string | false}
 */
let analize = (value) => {
  let func = " " + value + " " // это нужно для правильной работы reg выражений

  let replaces = [
    [/sin|asin|cos|acos|tan|atan|atan2|exp|abs|sqrt|pow|log10|sign|E|PI|random|max|min|cbrt|floor|ceil|round/g, "Math.$&"],
    [/(\W)(ln)(\W)/gi, "$1Math.log$3"],
    [/(\W)(pi)(\W)?/g, "$1Math.PI$3"],
    [/(\W)(tg)(\W)/gi, "$1Math.tan$3"],
    [/(\W)(ctg)\((.+)/gi, ctg_reg],
    [/(\W)(sgn)(\W)/gi, "$1Math.sign$3"],
    [/(\W)(rndi)(\W)?/gi, random_int_reg],
    [/(\W)(rnd)(\W)?/gi, "$1Math.random()$3"],
    [/(\W)(arctg)(\W)/gi, "$1Math.atan$3"],
    [/(\W)(arcsin)(\W)/gi, "$1Math.asin$3"],
    [/(\W)(arccos)(\W)/gi, "$1Math.acos$3"],
    [/(\W)\|(.+)\|(\W)?/gi, abs_reg],
    [/(\W)(arcctg)\((.+)/gi, actg_reg],
    [/(\W)(log)\((.+)/gi, log_reg],
    [/\^/gi, "**"],
    [/(\d+)x/gi, "$1*x"],
    [/(\d)!/gi, factorial_reg],
    [/(\d+)%/gi, persentage_reg]
  ]

  for (let i = 0, len = replaces.length; i < len; i++)
    func = func.replace(replaces[i][0], replaces[i][1])
  // переменные доступныя во время исполнения
  let x = 5
  let time = 10
  let mx = 0
  let my = 0
  
  // проверка на ошибки
  try {
    let test = eval(func)
  } catch (err) {
    return false
  }
  return func
}

let add = document.getElementById("add")
let funcs_set_wrap = document.querySelector(".funcs-set-wrap")
let info = document.querySelector(".info-btn")

// для функций
let num = 0

let default_grafics = "sin(x - mx) * my / (x - mx) * sin(x)"

let plot = new _plot__WEBPACK_IMPORTED_MODULE_2__["default"](canvas, window.innerWidth, window.innerHeight - _global_var__WEBPACK_IMPORTED_MODULE_0__["HEADER_HEIGHT"] - _global_var__WEBPACK_IMPORTED_MODULE_0__["BOTTOM_PANEL_HEIGHT"])
plot.init({
  ratio: 50,
  scale: 1,
  detail: 1,
  background: "#ECEFF1",
  axisLineWidth: 2,
  axisColor: "#9E9E9E",
  axisOffsetWidth: 20,
  axisOffsetHeight: 20,
  functionColor: "#E64A19",
  functionWidth: 2,
  markupColor: "#00BCD4",
  markupLineWidth: 1,
  markupTextColor: "#00BCD4"
})

plot.add(analize(default_grafics))

let val

funcs_set_wrap.addEventListener("click", (e) => {
  
  if (e.target.classList.contains("func-input")) {
    let val = prompt("set value", e.target.innerText);
    if (val === null) {
      return
    }

    let func = analize(val)
    if (func !== false) {
      plot.set(+e.target.parentNode.getAttribute("data-num"), func)
    } else {
      warning_rus_modal.show()
      return
    }
    e.target.innerText = val
  } else if (e.target.classList.contains("del")) {
    setTimeout(() => {
      e.target.parentNode.classList.add("remove")
      setTimeout(() => {
        plot.remove(+e.target.parentNode.getAttribute("data-num"))
        e.target.parentNode.remove()
      }, 400)
    }, 300)
  }
})

add.addEventListener("click", () => {
  let func_set = document.createElement("div")
  func_set.className = "func-set"
  let func_input_cur = document.createElement("span")
  func_input_cur.className = "func-input btn waves-effect waves-light"
  let del_cur = document.createElement("span")
  del_cur.className = "del btn waves-effect waves-light"

  let val = prompt("set value", "")
  if (val === null)
    return

  let f = analize(val)
  if (f !== false) {
    plot.add(f)
    plot.update()
  } else {
    warning_rus_modal.show()
    return
  }

  func_input_cur.innerText = val
  func_set.setAttribute("data-num", ++num)
  del_cur.innerText = "×"

  func_set.appendChild(func_input_cur)
  func_set.appendChild(del_cur)
  funcs_set_wrap.appendChild(func_set)
})

info_btn.addEventListener("click", () => {
  info_rus_modal.show()
})

let block_btn_toggle = new _button_js__WEBPACK_IMPORTED_MODULE_4__["ButtonToggle"]()
block_btn_toggle.init(block_btn)
block_btn_toggle.setActiveCallback(() => {
  plot.setState("moveable", false)
})
block_btn_toggle.setDisactiveCallback(() => {
  plot.setState("moveable", true)
})

let derivative_btn_toggle = new _button_js__WEBPACK_IMPORTED_MODULE_4__["ButtonToggle"]()
derivative_btn_toggle.init(derivative_btn)
derivative_btn_toggle.setActiveCallback(() => {
  plot.setState("build_derivatives", true)
})
derivative_btn_toggle.setDisactiveCallback(() => {
  plot.setState("build_derivatives", false)
})

Waves.init({
  duration: 700
});

if (device.mobile()) {

}

// animation
let loop = () => {
  plot.render()
  requestAnimationFrame(loop)
}

loop()

/***/ }),

/***/ "./js/button.js":
/*!**********************!*\
  !*** ./js/button.js ***!
  \**********************/
/*! exports provided: ButtonToggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonToggle", function() { return ButtonToggle; });
/**
 * @module button.js
 * @author
 * @version
 */

 /**
  *
  *
  *
  */
class ButtonToggle {
    constructor() {}

    init(elem) {
        this.elem = elem
        elem.addEventListener("click", () => {
          if (this.isActive()) {
            elem.classList.remove("active")
            this.disactive_callback()
          } else {
            elem.classList.add("active")
            this.active_callback()
          }
        })
    }

    setActiveCallback(callback) {
        this.active_callback = callback
    }

    setDisactiveCallback(callback) {
        this.disactive_callback = callback
    }

    isActive() {
        return this.elem.classList.contains("active")
    }


}

/***/ }),

/***/ "./js/global_var.js":
/*!**************************!*\
  !*** ./js/global_var.js ***!
  \**************************/
/*! exports provided: HEADER_HEIGHT, BOTTOM_PANEL_HEIGHT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADER_HEIGHT", function() { return HEADER_HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOTTOM_PANEL_HEIGHT", function() { return BOTTOM_PANEL_HEIGHT; });
/**
 * @module global_var
 * @author Whekin <stanislavkalishin@gmail.com>
 * @version 1.0 alpha 3
 */

const HEADER_HEIGHT = 60
const BOTTOM_PANEL_HEIGHT = 50

/***/ }),

/***/ "./js/math.js":
/*!********************!*\
  !*** ./js/math.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mymath; });
/**
 * @module math
 * @author Whekin <stanislavkalishin@gmail.com>
 * @version 1.0
 */



class Mymath {
  /**
   * get a number in radians from degrees
   * @param {number} deg
   * @return {number}
   */
  static toRad (deg) { return 0.017453292519943295 * deg }

  /**
   * get a number in degrees from radians
   * @param {number} rad
   * @return {number}
   */
  static toDeg (rad) { return rad / 0.017453292519943295 }

  /**
   * get square
   * @param {number} num
   * @param {number=} 2 pow
   * @return {number}
   */
  static sqrt (num, pow = 2) { return Math.pow(num, 1 / pow) }
  
  /**
   * get random whole number
   * @param {number} from
   * @param {number} to
   * return {number}
   */
  static getRnd (from, to) { return Math.floor(Math.random() * (to - from + 1) + from) }

  /**
   * get a distance between two point
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @return {number}
   */
  static distance (x1, y1, x2, y2) { return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) }

  /**
   * get a middle point between two points
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @return {{x: number, y: number}}
   */
  static midpoint (x1, y1, x2, y2)  {
    let x, y;

    x = (x2 + x1)*0.5;
    y = (y2 + y1)*0.5;

    return {x: x, y: y}
  }

  /**
   * Log
   * @param {number} exp
   * @param {number=} 10 base
   */
  static log(exp, base = 10) {
    return Math.log(exp) / Math.log(base)
  }

  /**
    * convert a polar coordinate to a decart coordinate
    * @param {number} angle
    * @param {number} radius
    * @return {{x: number, y:number}}
    */
  static toDecart (angle, radius) {
		let x, y

		x = radius * Math.cos(angle)
		y = radius * Math.sin(angle)

		return {x: x, y: y};
	}

  /**
    * convert a decart coordinate to a polar coordinate
    * @param {number} x
    * @param {number} y
    * @return {{radius: number, angle: number}}
    */
	static toPolar (x, y)  {
		let angle, radius

    radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

      //angle = Math.acos((Math.pow(radius, 2) + Math.pow(x, 2) - Math.pow(y, 2)) / (2 * radius * x));
      angle = Math.atan2(y, x)

      return {radius: radius, angle: angle}
  }

}


/***/ }),

/***/ "./js/modal.js":
/*!*********************!*\
  !*** ./js/modal.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Modal; });
/**
 * @module Modal
 * @author Whekin <stanislavkalishin@gmail.com>
 * @version 1.0 beta 1
 *
 */

class Modal {
  constructor(el) {
    this.el = el

    this.el.parentNode.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("active"))
        this.hide();
    })

    addEventListener("keydown", (evt) => {
      if(this.isActive() && (evt.keyCode === 13 || evt.keyCode === 32))
        this.hide();
    })
  }

  show() {
    this.el.classList.remove("disactive")
    this.el.classList.add("active")
    document.querySelector(".content").style.filter = "blur(3px)"
  }

  hide() {
    this.el.classList.remove("active")
    this.el.classList.add("disactive")
    document.querySelector(".content").style.filter = ""
  }

  setContent(mess) {
    this.el.querySelector(".modal__body").innerHTML = mess
  }

  setHeader(mess) {
    this.el.querySelector(".modal__header").querySelector("h3").innerHTML = mess
  }

  setFooter(mess) {
    this.el.querySelector(".modal__footer").innerHTML = mess
  }

  isActive() {
    if (this.el.classList.contains("active"))
      return true
    return false
  }
}

/***/ }),

/***/ "./js/mouse.js":
/*!*********************!*\
  !*** ./js/mouse.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mouse; });
/**
 * @module mouse
 * @author Whekin <stanislavkalishin@gmail.com>
 * @version 1.0 alpha 3
 * @todo довести до ума
 */

class Mouse {
  constructor () {
    this.down_x  = null
    this.down_y  = null
    this.move_x  = null // Move x
    this.move_y  = null // Move y
    this.up_x    = null // End x
    this.up_y    = null // End y
    this.dx      = null // Delta x
    this.dy      = null // Delta y
    this._dx     = null // Не сбрасывается
    this._dy     = null
    this.flip_dx = null // покадровый дельта
    this.flip_dy = null

    this.down    = false
    this.wheel   = null
    this._wheel  = null
    this.first   = true
    
    this.velocity = {
      x: null,
      y: null
    }

    this.time = {
      down: null,
      move: null,
      last_move: null,
      dmove: null,
      up: null
    }

    this.last = {
      move_x: null,
      move_y: null,
      dx: null,
      dy: null
    }

    this._edx = null // save touch._dx
    this._edy = null
  }

  init(context) {
    context.addEventListener("mousedown", (evt) => {
      this.time.down = Date.now()

      this.first = true

      this.down_x = evt.clientX
      this.down_y = evt.clientY

      this.down = true
    })

    context.addEventListener("mousemove", (evt) => {

      this.time.move = Date.now()
      this.time.dmove = this.time.move - this.time.last_move

      this.move_x = evt.clientX
      this.move_y = evt.clientY

      if (this.first) { // это нуобходимо, чтобы первые дельты были не от нуля.
        this.last.move_x = this.move_x 
        this.last.move_y = this.move_y
        this.time.last_move = this.time.move
      }

      this.flip_dx = this.move_x - this.last.move_x
      this.flip_dy = this.move_y - this.last.move_y

      if (this.down) {
        this.dx = this.move_x - this.down_x
        this.dy = this.move_y - this.down_y

        this._dx = this._edx + this.dx
        this._dy = this._edy + this.dy
      }

      this.velocity.x = this.flip_dx / this.time.dmove;
      this.velocity.y = this.flip_dy / this.time.dmove;
      
      this.last.move_x = this.move_x
      this.last.move_y = this.move_y

      this.time.last_move = this.time.move

      if (this.first) 
        this.first = false
    })

    context.addEventListener("mouseup", (evt) => {
      this.time.up = Date.now()

      this.down = false

      this.up_x = evt.clientX
      this.up_y = evt.clientY

      this._edx = this._dx
      this._edy = this._dy
    })

    context.addEventListener("wheel", (evt) => {
      this.wheel = evt.deltaY
      this._wheel += evt.deltaY
    })
  }
}

/***/ }),

/***/ "./js/plot.js":
/*!********************!*\
  !*** ./js/plot.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Plot; });
/* harmony import */ var _global_var__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global_var */ "./js/global_var.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ "./js/math.js");
/* harmony import */ var _mouse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mouse */ "./js/mouse.js");
/* harmony import */ var _touch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./touch */ "./js/touch.js");

/**
 *
 * @module plot
 * @author Whekin <stanislavkalishin@gmail.com>
 * @version 1.0 beta 1
 *
 * @todo Решение прерываний функция
 */








// т.к eval не видит Mymath
let log = _math__WEBPACK_IMPORTED_MODULE_1__["default"].log
let randomInt = _math__WEBPACK_IMPORTED_MODULE_1__["default"].getRnd

class Plot {
  /**
   * Create a Plot
   * @param {HTMLCanvasElement} canvas - for drawing
   * @param {Number} width of the plot
   * @param {Number} heigh of the plot
   */
  constructor(canvas, width, height) {
    this.mouse = new _mouse__WEBPACK_IMPORTED_MODULE_2__["default"]()
    this.mouse.init(canvas);

    this.touch = new _touch__WEBPACK_IMPORTED_MODULE_3__["default"]()
    this.touch.init(canvas)

    this.width = width
    this.height = height

    canvas.width = width
    canvas.height = height

    this.canvas = canvas

    this.ctx = this.canvas.getContext("2d")

    this.start_time = performance.now()

    this.pos = {
      x: 0,
      y: 0
    }

    this.ratio = null
    this.scale = 1

    this.centerCanvasX = this.canvas.width * 0.5
    this.centerCanvasY = this.canvas.height * 0.5

    this.centerX = this.centerCanvasX + this.pos.x
    this.centerY = this.centerCanvasY + this.pos.y

    this.functions = []
    this.derivatives = []

    this.inertia = {
      x: 0,
      y: 0
    }
    
    // common position cursor for a mouse and a touchpad
    this.cursor = {
      x: 0,
      y: 0
    }

    this.states = {
      moveable: true,
      build_derivatives: false
    }
  }

  /**
   * 
   */
  update() {
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.centerCanvasX = this.canvas.width * 0.5
    this.centerCanvasY = this.canvas.height * 0.5

    this.centerX = this.centerCanvasX + this.pos.x
    this.centerY = this.centerCanvasY + this.pos.x
  }

  /**
   * initialization and setting
   * @param {?Object}           user_options
   * @param {number=} 50        user_options.ratio
   * @param {number=} 1         user_options.scale
   * @param {number=} 1         user_options.detail
   * @param {string=} "#ECEFF1" user_options.background
   * @param {number=} 2         user_options.axisLineWidth
   * @param {string=} "#9E9E9E" user_options.axisColor
   * @param {number=} 20        user_options.axisOffsetWidth
   * @param {number=} 20        user_options.axisOffsetHeight
   * @param {string=} "#E64A19" user_options.functionColor
   * @param {number=} 2         user_options.functionWidth
   * @param {string=} "#ccc"    user_options.cellColor
   * @param {string=} "#00BCD4" user_options.murkupColor
   * @param {number=} 1         user_options.murkupLineWidth
   * @param {string=} "#00BCD4" user_options.murkupTextColor
   * @param {string=} "#aaa"    user_options.derivativeColor
   * @param {string=} "#E04715" user_options.dotColor
   */     
  init(user_options = {}) {

    this.user_options = user_options

    // defaul settings
    this.def_options = {
      ratio:            50,
      scale:            1,
      detail:           1,
      background:       "#ECEFF1",
      axisLineWidth:    2,
      axisColor:        "#9E9E9E",
      axisOffsetWidth:  20,
      axisOffsetHeight: 20,
      functionColor:    "#E64A19",
      functionWidth:    2,
      cellColor:        "#ccc",
      markupColor:      "#00BCD4",
      markupLineWidth:  1,
      markupTextColor:  "#00BCD4",
      derivativeColor:  "#aaa",
      dotColor:         "#E04715"
    }

    this.app_options = {}

    this.ratio = user_options.ratio || this.def_options.ratio
    this.scale = user_options.scale || this.def_options.scale

    for (let property in this.def_options) {
      this.app_options[property] = this.user_options[property] || this.def_options[property]
    }

    if (device.desktop()) {
      this.canvas.addEventListener("mousedown", (evt) => {
        this.inertia.x = 0
        this.inertia.y = 0
      })

      this.canvas.addEventListener("mousemove", (evt) => {
          if (this.mouse.down && this.states.moveable)
            this.move(this.mouse.flip_dx, this.mouse.flip_dy)
          this.cursor.x = this.mouse.move_x
          this.cursor.y = this.mouse.move_y
      })

      this.canvas.addEventListener("mouseup", (evt) => {
        this.inertia.x = this.mouse.flip_dx
        this.inertia.y = this.mouse.flip_dy
      })

      this.canvas.addEventListener("wheel", (evt) => {
        if (evt.deltaY > 0 && this.scale > 0.2) {
          this.toScale(0.95, evt.clientX, evt.clientY)
        } else if (evt.deltaY < 0 && this.scale < 5) {
          this.toScale(1.05, evt.clientX, evt.clientY)
        }
      })
    } else if (device.mobile()) {
      this.canvas.addEventListener("touchstart", (evt) => {
        this.cursor.x = this.touch.down_x[0]
        this.cursor.y = this.touch.down_y[0]
      })

      this.canvas.addEventListener("touchmove", (evt) => {
        
        if (this.touch.count_fingers === 1 && this.states.moveable)
          this.move(this.touch.flip_dx[0], this.touch.flip_dy[0])
        if (this.touch.count_fingers === 2) {
          let middle_point = _math__WEBPACK_IMPORTED_MODULE_1__["default"].midpoint(this.touch.move_x[0], this.touch.move_y[1], this.touch.move_x[1], this.touch.move_y[1])
          if ((this.scale < 10.0 || this.touch.flip_scale < 1) && (this.scale > 0.2 || this.touch.flip_scale > 1))
            this.toScale(this.touch.flip_scale, middle_point.x, middle_point.y)
        }
        this.cursor.x = this.touch.move_x[0]
        this.cursor.y = this.touch.move_y[0]
      })

      this.canvas.addEventListener("touchend", (evt) => {
        if (this.touch.count_fingers == 1) {
          this.inertia.x = this.touch.flip_dx[0]
          this.inertia.y = this.touch.flip_dy[0]
        }
      })
    }
    
    addEventListener("resize", (evt) => {
      this.width = innerWidth;
      this.height = innerHeight - _global_var__WEBPACK_IMPORTED_MODULE_0__["HEADER_HEIGHT"] - _global_var__WEBPACK_IMPORTED_MODULE_0__["BOTTOM_PANEL_HEIGHT"]
      this.update()
    })
  }

  /**
   * add a func to the array of functions
   * @param {string} func
   */
  add(func) {
    this.functions.push(func)
  }

  /**
   * remove a func from the array of functions
   * @param {number} num
   */
  remove(num) {
    delete this.functions[num]
  }

  /**
   * set a fun in the array of functions
   * @param {number} num
   * @param {string} func
   */
	set (num, func) {
		this.functions[num] = func
	}

  /**
   * scale the plot.
   * @param {number} scale - new scale is last scale + this scale
   * @param {number} x
   * @param {number} y
   */
  toScale(scale, x = this.centerCanvasX, y = this.centerCanvasY) {
    this.ratio *= scale
    this.scale = this.ratio / this.def_options.ratio
    this.pos.x = this.pos.x * scale - (x - this.centerCanvasX) * (scale - 1)
    this.pos.y = this.pos.y * scale - (y - this.centerCanvasY - _global_var__WEBPACK_IMPORTED_MODULE_0__["HEADER_HEIGHT"]) * (scale - 1)
  }

  /**
   * set the scale
   * @param {Number} scale
   * @param {Number} x
   * @param {Number} y
   */
  setScale(scale, x, y) {
    let dscale = scale - this.scale
    this.ratio *= scale / this.scale
    this.scale = scale
    this.pos.x = this.pos.x * (dscale+1) - (x - this.centerCanvasX) * (dscale)
    this.pos.y = this.pos.y * (dscale+1) - (y - this.centerCanvasY - _global_var__WEBPACK_IMPORTED_MODULE_0__["HEADER_HEIGHT"]) * (dscale)
  }

  /**
   * move relative the current position
   * @param {Number} dx
   * @param {Number} dy
   */
  move(dx, dy) {
    if (typeof dx != Number || typeof dy != Number) {
      dx = Number(dx)
      dy = Number(dy)
    }
    this.pos.x += dx
    this.pos.y += dy
  }

  /**
   * set position
   * @param {Number} x
   * @param {Number} y
   */
  setPosition(x, y) {
    this.pos.x = x
    this.pos.y = y
  }
  /**
   * remove all functions
   */
  clear() {
    this.functions = []
  }

  /**
   * set state
   * @param {} state
   */
  setState(state, value) {
    switch (state) {
      case "moveable":
        this.states.moveable = value
        break
      case "build_derivatives":
        this.states.build_derivatives = value
        break
    }
  }

  _draw_points(array) {
    this.ctx.save()
    this.ctx.translate(this.centerX, this.centerY)
    this.ctx.strokeStyle = this.app_options.derivativeColor

    let isStart = true
    for (let i = Math.round(-this.centerX + this.app_options.axisOffsetWidth), step = this.app_options.detail, j = 1;  i < Math.round(this.centerCanvasX - this.pos.x - this.app_options.axisOffsetWidth); i += step, j++) {
      if (isStart) {
        this.ctx.beginPath()
        this.ctx.moveTo(i, -array[j]*this.ratio)
        isStart = false
        continue
      }
      this.ctx.lineTo(i, -array[j]*this.ratio)
    }

    this.ctx.stroke();
    this.ctx.restore();
  }
  /**
   * draw all in canvas.
   */
  render() {
    const ctx = this.ctx;
    const pos = this.pos;

    if (this.states.moveable)
      this.move(this.inertia.x, this.inertia.y);
    if (Math.abs(this.inertia.x) > 0.1)
      this.inertia.x *= 0.95
    else {
      if (this.inertia.x !== 0)
        this.inertia.x = 0;
    }

    if (Math.abs(this.inertia.y) > 0.1)
      this.inertia.y *= 0.95
    else {
      if (this.inertia.y !== 0)
        this.inertia.y = 0
    }

    this.centerX = this.centerCanvasX + pos.x
    this.centerY = this.centerCanvasY + pos.y

    this.current_time = performance.now()
    let time = this.current_time - this.start_time
    
    let mx = this.cursor.x / this.ratio - this.centerX/this.ratio
    let my = -(this.cursor.y / this.ratio) + this.centerY/this.ratio + _global_var__WEBPACK_IMPORTED_MODULE_0__["HEADER_HEIGHT"]/this.ratio
    // background
    ctx.save()
    ctx.fillStyle = this.app_options.background
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.restore()

    // render axis x, y

    ctx.save()
    ctx.lineWidth    = this.app_options.axisLineWidth
    ctx.strokeStyle  = this.app_options.axisColor
    ctx.fillStyle    = this.app_options.markupTextColor
    ctx.textAlign    = "center"
    ctx.textBaseline = "middle"
    ctx.font         = "12px sans-serif"

    ctx.translate(this.centerX, this.centerY)

    // draw the line of axis x
    ctx.beginPath()
    ctx.moveTo(this.app_options.axisOffsetWidth - this.centerCanvasX - pos.x, 0)
    ctx.lineTo(this.centerCanvasX - this.app_options.axisOffsetWidth - pos.x, 0)
    ctx.stroke()

    // draw the triangle on axis x
    ctx.save()
    ctx.beginPath()
    ctx.translate(this.centerCanvasX - this.app_options.axisOffsetWidth - pos.x, 0)
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -5)
    ctx.lineTo(9, 0)
    ctx.lineTo(0, 5)
    ctx.closePath()
    ctx.fill()
    ctx.font = "15px sans-serif"
    ctx.fillText("x", 0, 15)
    ctx.restore()

    // draw the line of axis y
    ctx.beginPath()
    ctx.moveTo(0, this.app_options.axisOffsetHeight - this.centerCanvasY - pos.y)
    ctx.lineTo(0, this.centerCanvasY - this.app_options.axisOffsetHeight - pos.y)
    ctx.stroke()

    // draw the triangle y on axis y
    ctx.save()
    ctx.beginPath()
    ctx.translate(0, this.app_options.axisOffsetHeight - this.centerCanvasY - pos.y)
    ctx.moveTo(0, 0)
    ctx.lineTo(-5, 0)
    ctx.lineTo(0, -9)
    ctx.lineTo(5, 0)
    ctx.closePath()
    ctx.fill()
    ctx.font = "15px sans-serif"
    ctx.fillText("y", -15, 0)
    ctx.restore()

    // draw the murkup for the axis x
    ctx.strokeStyle = this.app_options.markupTextColor
    ctx.lineWidth = this.app_options.markupTextLineWidth

    let countX = Math.ceil((this.canvas.width - 2 * this.app_options.axisOffsetWidth) / this.ratio)
    countX = countX % 2 === 0 ? countX : countX - 1

    for (let i = 1 - Math.ceil(pos.x / this.ratio); i <= countX - Math.ceil(pos.x / this.ratio); i++) {
      if (i - countX / 2 !== 0) {
        let x = i * this.ratio - (countX * this.ratio / 2)

        ctx.beginPath()
        ctx.save()
        ctx.lineWidth = 1
        ctx.strokeStyle = this.app_options.cellColor
        ctx.moveTo(x, -pos.y - this.height / 2 + 20)
        ctx.lineTo(x, -pos.y + this.height / 2 - 20)
        ctx.stroke()
        ctx.restore()

        ctx.beginPath()
        ctx.moveTo(x, -3)
        ctx.lineTo(x, 3)
        ctx.stroke()
        ctx.fillText(i - countX / 2, x, 15)
      }
    }

    // draw the murkup for the axis y
    let countY = Math.ceil((this.canvas.height - 2 * this.app_options.axisOffsetHeight) / this.ratio)
    countY = countY % 2 == 0 ? countY : countY - 1

    for (let i = 1 - Math.ceil(pos.y / this.ratio); i <= countY - Math.ceil(pos.y / this.ratio); i++) {
      if (i - countY / 2 !== 0) {
        let y = i * this.ratio - (countY * this.ratio / 2)
        ctx.beginPath()
        ctx.save()
        ctx.lineWidth = 1
        ctx.strokeStyle = this.app_options.cellColor
        ctx.moveTo(-pos.x - this.width / 2 + 20, y)
        ctx.lineTo(-pos.x + this.width / 2 - 20, y)
        ctx.stroke()
        ctx.restore()

        ctx.beginPath()
        ctx.moveTo(-3, y)
        ctx.lineTo(3, y)
        ctx.stroke()
        ctx.fillText(-(i - countY / 2), -10, y)
      }
    }

    ctx.restore()

    // draw the functions
    this.functions.forEach((func, id) => {
      let x, y, last_y,
          isStart = true

      ctx.save()
      ctx.translate(this.centerX, this.centerY)

      ctx.lineWidth = this.user_options.functionWidth || this.def_options.functionWidth
      ctx.strokeStyle = this.user_options.functionColor || this.def_options.functionColor

      this.derivatives[id] = []

      for (let i = Math.round(-this.centerX + this.app_options.axisOffsetWidth), step = this.app_options.detail, j = 0;  i < Math.round(this.centerCanvasX - pos.x - this.app_options.axisOffsetWidth); i += step, j++) {
        // each pixel
        x = i / this.ratio
        y = eval(func)

        if (isStart)
          last_y = y
        let derivative = (y - last_y) / (step / this.ratio);
        this.derivatives[id][j] = derivative
        last_y = y
        y = -y * this.ratio

        // @todo доработать
        // if () {
        //   ctx.stroke()
        //   ctx.beginPath();
        //   ctx.moveTo(i, y)
        //   continue
        // }
         
        
        if (isStart) {
          ctx.beginPath()
          ctx.moveTo(i, y)
          isStart = false
          continue
        }

        ctx.lineTo(i, y)
      }

      ctx.stroke()
      ctx.restore()
      if (this.states.build_derivatives)
        this._draw_points(this.derivatives[id])
    })

    this.functions.forEach((func, id) => {
      ctx.beginPath()
      ctx.fillStyle = this.app_options.dotColor
      let x = (this.cursor.x - this.centerX) / this.ratio
      ctx.arc(this.cursor.x, -eval(func)*this.ratio + this.centerY, 3, 0, Math.PI * 2, true)
      ctx.fill()
    })
  }
} // Plot

/***/ }),

/***/ "./js/touch.js":
/*!*********************!*\
  !*** ./js/touch.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Touch; });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math */ "./js/math.js");
/**
 * @module touch
 * @author Whekin <stanislavkalishin@gmail.com>
 * @version 1.0 alpha 3
 * @todo довести до ума
 */



class Touch {
  constructor() {
    this.down_distance = null
    this.move_distance = null
    this.count_fingers = 0
    this.flip_scale    = 1 // моментальный scale
    this.ddistance     = null
    this.flip_dx       = [null]
    this.flip_dy       = [null]
    this.down_x        = [null]
    this.down_y        = [null]
    this.move_x        = [null]
    this.move_y        = [null]
    this.dscale        = 0
    this.first         = true
    this._dx           = [null] // Не сбрасывается
    this._dy           = [null]
    this.up_x          = null
    this.up_y          = null
    this.dx            = [null] // Delta x
    this.dy            = [null] // Delta y
    
    this.last = {
      move_x: [null],
      move_y: [null],
      count_fingers: null,
      distance: null
    }
    
    this._edx = [null] // save this._dx
    this._edy = [null]
  }
  
  /**
   * @param {} context
   */
  init(context) {
    context.addEventListener("touchstart", (evt) => {
      evt.preventDefault()
      
      this.first = true
      this.count_fingers = evt.touches.length

      for (let i = 0; i < this.count_fingers; i++) {
        this.down_x[i] = evt.touches[i].clientX
        this.down_y[i] = evt.touches[i].clientY

        this.flip_dx[i] = 0
        this.flip_dy[i] = 0
      }

      if (this.count_fingers == 2) {
        this.down_distance = _math__WEBPACK_IMPORTED_MODULE_0__["default"].distance(this.down_x[0], this.down_y[0], this.down_x[1], this.down_y[1])
      }
    })

    context.addEventListener("touchmove", (evt) => {
      this.count_fingers = evt.touches.length

      if (this.count_fingers === 1 && this.last.count_fingers === 2 && this.up_x === this.last.move_x[0] && this.up_y === this.last.move_y[0]) {
          this.last.move_x[0] = this.last.move_x[1]
          this.last.move_y[0] = this.last.move_y[1]
      }

      for (let i = 0; i < this.count_fingers; i++) {
        this.move_x[i] = evt.touches[i].clientX
        this.move_y[i] = evt.touches[i].clientY

        this.dx[i] = this.move_x[i] - this.down_x[i]
        this.dy[i] = this.move_y[i] - this.down_y[i]

        if (this.first) {
          this.last.move_x[i] = this.move_x[i]
          this.last.move_y[i] = this.move_y[i]
        }

        this._dx[i] = this._edx[i] + this.dx[i]
        this._dy[i] = this._edy[i] + this.dy[i]

        this.flip_dx[i] = this.move_x[i] - this.last.move_x[i]
        this.flip_dy[i] = this.move_y[i] - this.last.move_y[i]
      }

      if (this.count_fingers == 2) {
        this.move_distance = _math__WEBPACK_IMPORTED_MODULE_0__["default"].distance(this.move_x[0], this.move_y[0], this.move_x[1], this.move_y[1])
        this.dscale = this.move_distance / this.down_distance
        this.ddistance = this.move_distance - this.down_distance
        if (this.first)
          this.last.distance = this.move_distance
        this.flip_scale = this.move_distance / this.last.distance
      }

      for (let i = 0; i < this.count_fingers; i++) {
        this.last.move_x[i] = this.move_x[i]
        this.last.move_y[i] = this.move_y[i]
      }

      this.last.count_fingers = this.count_fingers
      this.last.distance = this.move_distance

      if (this.first)
        this.first = false
    })

    addEventListener("touchend", (evt) => {
      this.up_x = evt.changedTouches[0].clientX
      this.up_y = evt.changedTouches[0].clientY

      this._edx[0] = this._dx[0]
      this._edy[0] = this._dy[0]
      
      this.count_fingers = evt.touches.length
      console.log(evt.which)
    })
  }
}

/***/ })

/******/ });
//# sourceMappingURL=build.js.map