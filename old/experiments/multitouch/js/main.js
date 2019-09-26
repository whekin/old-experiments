"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let options = {
	radius: 35,
	color: "#333",
	backColor: "#fff",
	textColor: "#000",
	fill: false,
	
};

canvas.width = window.innerWidth || 320;
canvas.height = window.innerHeight || 488;

ctx.strokeStyle = options.color;
ctx.fillStyle = options.color;

ctx.textAlign = "center";
ctx.font = options.radius + "px sans-serif";
ctx.textBaseline = "middle";

let mainHandler = (e) => {
	e.preventDefault();
	
	// clear
	ctx.save();
	ctx.fillStyle = options.backColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
	
	// multitouch
	for (let i = 0, len = e.touches.length; i < len; ++i) {
		ctx.beginPath();
		ctx.arc(
			e.touches[i].clientX,
			e.touches[i].clientY,
			options.radius,
			0,
			Math.PI*2,
			true
		);
		
		ctx.save();
		ctx.fillStyle = options.textColor;
		ctx.fillText(i + 1, e.touches[i].clientX, e.touches[i].clientY);
		ctx.restore();
		
		if (options.fill)
			ctx.fill();
		else
			ctx.stroke();
		
	}
};

canvas.addEventListener("touchstart", mainHandler);
canvas.addEventListener("touchmove", mainHandler);