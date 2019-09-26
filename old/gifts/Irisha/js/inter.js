;(function(window) {
    "use strict";

    class Inter {
        constructor(context = window.document, isTouch = "auto") {
            if (isTouch === "auto") {
                this.isTouch = 'ontouchstart' in window;
            } else {
                this.isTouch = isTouch;
            }

            this.context = context;
            this.isPressed = false;
            this.button = -1;

            this.downX = 0.0;
            this.downY = 0.0;
            this.moveX = 0.0;
            this.moveY = 0.0;
            this.deltaX = 0.0;
            this.deltaY = 0.0;
            this.lastDeltaX = 0.0;
            this.lastDeltaY = 0.0;
            this.fragDeltaX = 0.0;
            this.fragDeltaY = 0.0;
            this.velocityX = 0.0;
            this.velocityY = 0.0;
            this.upX = 0.0;
            this.upY = 0.0;
            this.deltaTimeOfMove = 0.0;
            this.deltaTimeOfPressed = 0;
            this.callback_down = () => {};
            this.callback_move = () => {};
            this.callback_up = () => {};

            this._ = Symbol.for("__Inter._");
            this[this._] = {
                moveTimeNow: 0.0,
                moveTimeLast: Date.now(),
                downTimeNow: 0.0,
                upTimeNow: 0.0,
                pressedTimeStart: 0,

            };

            if (this.isTouch) {
                this.touch = {
                    startX: [],
                    startY: [],
                    moveX: [],
                    moveY: [],
                    deltaX: [],
                    deltaY: [],
                    fragDeltaX: [],
                    fragDeltaY: [],
                    lastDeltaX: [],
                    lastDeltaY: [],
                    velocityX: [],
                    velocityY: [],
                    endX: [],
                    endY: []
                };

                this.context.addEventListener("touchstart", this.onDown.bind(this));
                this.context.addEventListener("touchmove", this.onMove.bind(this));
                this.context.addEventListener("touchend", this.onUp.bind(this));
            } else {
                this.context.addEventListener("mousedown", this.onDown.bind(this));
                this.context.addEventListener("mousemove", this.onMove.bind(this));
                this.context.addEventListener("mouseup", this.onUp.bind(this));
            }
        }

        setCallbackDown(callback) {
            this.callback_down = callback;
        }

        setCallbackMove(callback) {
            this.callback_move = callback;
        }

        setCallbackEnd(callback) {
            this.callback_up = callback;
        }
        onDown (evt) {

            this[this._].downTimeNow = Date.now();

            if (evt.button === 0) {
                this.isPressed = true;
                this[this._].pressedTimeStart = this[this._].downTimeNow;
            }

            this.button = evt.button;

            if (this.isTouch) {
                this.isPressed = true;
                this[this._].pressedTimeStart = this[this._].downTimeNow;
                this.numberOfTouches = evt.touches.length;
                for (let i = 0; i < this.numberOfTouches; i++) {
                    this.touch.startX[i] = evt.touches[i].clientX;
                    this.touch.startY[i] = evt.touches[i].clientY;
                }
                this.downX = this.touch.startX[0];
                this.downY = this.touch.startY[0];
            } else {
                this.downX = evt.clientX;
                this.downY = evt.clientY;
            }

            this.callback_down(evt);
        };

        onMove (evt) {
            this[this._].moveTimeNow = Date.now();
            this.deltaTimeOfMove = this[this._].moveTimeNow - this[this._].moveTimeLast;
            this[this._].moveTimeLast = this[this._].moveTimeNow;

            if (this.isPressed)
                this.deltaTimeOfPressed = this[this._].moveTimeNow - this[this._].pressedTimeStart;

            if (this.isTouch) {

                for (let i = 0; i < this.numberOfTouches; i++) {
                    this.touch.moveX[i] = evt.touches[i].clientX;
                    this.touch.moveY[i] = evt.touches[i].clientY;

                    this.touch.deltaX[i] = this.touch.moveX[i] - this.touch.startX[i];
                    this.touch.deltaY[i] = this.touch.moveY[i] - this.touch.startY[i];

                    this.touch.fragDeltaX[i] = this.touch.deltaX[i] - this.touch.lastDeltaX[i];
                    this.touch.fragDeltaY[i] = this.touch.deltaY[i] - this.touch.lastDeltaY[i];

                    this.touch.velocityX[i] = this.touch.fragDeltaX[i] / this.deltaTimeOfMove;
                    this.touch.velocityY[i] = this.touch.fragDeltaY[i] / this.deltaTimeOfMove;

                    this.touch.lastDeltaX[i] = this.touch.deltaX[i];
                    this.touch.lastDeltaY[i] = this.touch.deltaY[i];
                }

                this.moveX = this.touch.moveX[0];
                this.moveY = this.touch.moveY[0];

                this.deltaX = this.touch.deltaX[0];
                this.deltaY = this.touch.deltaY[0];

                this.fragDeltaX = this.touch.fragDeltaX[0];
                this.fragDeltaY = this.touch.fragDeltaY[0];

                this.velocityX = this.touch.velocityX[0];
                this.velocityY = this.touch.velocityY[0];

                this.lastDeltaX = this.touch.lastDeltaX[0];
                this.lastDeltaY = this.touch.lastDeltaY[0];

            } else {
                this.moveX = evt.clientX;
                this.moveY = evt.clientY;

                if (this.isPressed) {
                    this.deltaX = this.moveX - this.downX;
                    this.deltaY = this.moveY - this.downY;

                    this.fragDeltaX = this.deltaX - this.lastDeltaX;
                    this.fragDeltaY = this.deltaY - this.lastDeltaY;

                    this.velocityX = this.fragDeltaX / this.deltaTimeOfMove;
                    this.velocityY = this.fragDeltaY / this.deltaTimeOfMove;

                    this.lastDeltaX = this.deltaX;
                    this.lastDeltaY = this.deltaY;
                }
            }

            this.callback_move(evt);
        };

        onUp (evt) {
            this[this._].upTimeNow = Date.now();
            this.deltaTimeOfPressed = this[this._].upTimeNow - this[this._].pressedTimeStart;
            this.isPressed = false;
            this.button = -1;

            if (this.isTouch) {
                for (let i = 0; i < this.numberOfTouches; i++) {
                    this.touch.endX[i] = this.touch.moveX[i];
                    this.touch.endY[i] = this.touch.moveY[i];
                }
                this.upX = this.touch.endX[0];
                this.upY = this.touch.endY[0];

            }

            this.upX = this.moveX;
            this.upY = this.moveY;

            this.callback_up(evt);
        };


    }

    Object.defineProperties(Inter, {
        isPressed:
            { writable: false },
        button:
            { writable: false },
        onMove:
            { writable: false },
        onDown:
            { writable: false },
        onUp:
            { writable: false },
        downX:
            { writable: false },
        downY:
            { writable: false },
        moveX:
            { writable: false },
        moveY:
            { writable: false },
        upX:
            { writable: false },
        upY:
            { writable: false },
        deltaX:
            { writable: false },
        deltaY:
            { writable: false },
        fragDeltaX:
            { writable: false },
        fragDeltaY:
            { writable: false },
        velocityX:
            { writable: false },
        velocityY:
            { writable: false },
        deltaTimeOfPressed:
            { writable: false },
        deltaTimeOfMove:
            { writable: false },
    });
    window.Inter = Inter;
})(window);