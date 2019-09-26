
/**
 *
 * @module plot
 * @author Whekin <stanislavkalishin@gmail.com>
 * @version 1.0 beta 1
 *
 * @todo Решение прерываний функция
 */

'use strict'

import * as VAR from './global_var'
import Mymath   from './math'
import Mouse    from './mouse'
import Touch    from './touch'

// т.к eval не видит Mymath
let log = Mymath.log
let randomInt = Mymath.getRnd

export default class Plot {
  /**
   * Create a Plot
   * @param {HTMLCanvasElement} canvas - for drawing
   * @param {Number} width of the plot
   * @param {Number} heigh of the plot
   */
  constructor(canvas, width, height) {
    this.mouse = new Mouse()
    this.mouse.init(canvas);

    this.touch = new Touch()
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
          let middle_point = Mymath.midpoint(this.touch.move_x[0], this.touch.move_y[0], this.touch.move_x[1], this.touch.move_y[1])
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
      this.height = innerHeight - VAR.HEADER_HEIGHT - VAR.BOTTOM_PANEL_HEIGHT
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
    this.pos.y = this.pos.y * scale - (y - this.centerCanvasY - VAR.HEADER_HEIGHT) * (scale - 1)
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
    this.pos.y = this.pos.y * (dscale+1) - (y - this.centerCanvasY - VAR.HEADER_HEIGHT) * (dscale)
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
    let my = -(this.cursor.y / this.ratio) + this.centerY/this.ratio + VAR.HEADER_HEIGHT/this.ratio
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