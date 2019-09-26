'use strict';

(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

export default class Anim {
  constructor (func) {
    /**
      * @private
      */
    this._func = func;
    this._fps = 0;
    this._prev = performance.now();
    this._delay = 0;
    this._isStop = false; // max
  }

  start (time) {

    this._func(time);

    this._fps = 1000 / Math.floor(time - this._prev);
    this._prev = time;

    setTimeout(() => {
      if (!this._isStop) requestAnimationFrame(this.start.bind(this));
      else this._isStop = false;
    }, this._delay);
  }

  stop () {
    this._isStop = true;
  }

  setFps (num) {
    if (num > 60) num = 60;
    this._delay = 1000 / num;
  }

  getFps () {
    return this._fps;
  }
}
