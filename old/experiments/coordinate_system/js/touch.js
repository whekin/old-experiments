/**
 * @module touch
 * @author Whekin <stanislavkalishin@gmail.com>
 * @version 1.0 alpha 3
 * @todo довести до ума
 */

import Mymath from './math'

export default class Touch {
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
        this.down_distance = Mymath.distance(this.down_x[0], this.down_y[0], this.down_x[1], this.down_y[1])
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
        this.move_distance = Mymath.distance(this.move_x[0], this.move_y[0], this.move_x[1], this.move_y[1])
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