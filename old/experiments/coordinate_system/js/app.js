/**
 * @module touch
 * @author Whekin <stanislavkalishin@gmail.com>
 * @version 1.0 beta 1
 * @todo довести до ума
 */

'use strict'

import * as VAR from './global_var'
import Modal    from './modal'
import Plot     from './plot'
import Mymath   from './math'
import {ButtonToggle} from './button.js'

// т.к eval не видит Mymath
let log = Mymath.log
let randomInt = Mymath.getRnd

let canvas = document.getElementById("plot")
let info_btn = document.getElementById("info_btn")
let block_btn = document.getElementById("block_btn")
let derivative_btn = document.getElementById("derivative_btn")

let info_rus = document.getElementById("info-rus")
let info_rus_modal = new Modal(info_rus)

// let info_eng = document.getElementById("info_eng")
// let info_eng_modal = new Modal(info_rus)

let warning_rus = document.getElementById("warning-rus")
let warning_rus_modal = new Modal(warning_rus)

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

let plot = new Plot(canvas, window.innerWidth, window.innerHeight - VAR.HEADER_HEIGHT - VAR.BOTTOM_PANEL_HEIGHT)
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

let block_btn_toggle = new ButtonToggle()
block_btn_toggle.init(block_btn)
block_btn_toggle.setActiveCallback(() => {
  plot.setState("moveable", false)
})
block_btn_toggle.setDisactiveCallback(() => {
  plot.setState("moveable", true)
})

let derivative_btn_toggle = new ButtonToggle()
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