/**
 * @module math
 * @author Whekin <stanislavkalishin@gmail.com>
 * @version 1.0
 */

'use strict'

export default class Mymath {
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
