"use strict";

export let canvas = document.createElement("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

canvas.id = "canvas";

export let ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

export let c = {
  w: 0,
  h: 0
}

c.w = canvas.width;
c.h = canvas.height;

// При изменении окна подогнать canvas
addEventListener("resize", () => {
  c.w = innerWidth;
  c.h = innerHeight;

  canvas.width = c.w;
  canvas.height = c.h;
});
