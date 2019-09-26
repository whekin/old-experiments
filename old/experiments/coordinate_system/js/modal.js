/**
 * @module Modal
 * @author Whekin <stanislavkalishin@gmail.com>
 * @version 1.0 beta 1
 *
 */

export default class Modal {
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