/**
 * @module mouse
 * @author Whekin <stanislavkalishin@gmail.com>
 * @version 1.0 alpha 3
 * @todo довести до ума
 */

export default class Mouse {
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