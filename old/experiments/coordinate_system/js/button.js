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
export class ButtonToggle {
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