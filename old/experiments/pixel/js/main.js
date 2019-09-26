// canvas.init

let canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.width = innerWidth;
canvas.height = innerHeight;
document.body.insertBefore(canvas, document.querySelector("script"));

let ctx = canvas.getContext("2d");

let x = 0,
	y = 0,
	down = false,
	a = 0;

let image = ctx.createImageData(canvas.width, canvas.height);
let data = image.data;



let draw = () => {

	a = down? --a : ++a;

	if (a >= 255) {
		down = true;
	} else if (a == 0) {
		down = false;
	}

	for (let i = 0, len = data.length; i < len; i += 4) {
		let ans = (i / len) * 255;
		data[i]     = Math.sin(a/255*Math.PI)*245; // red
		data[i + 1] = Math.sin(ans/255*Math.PI)*200; // green
		data[i + 2] = Math.abs(ans-Math.sin(a/255*Math.PI)*255); // blue
		data[i + 3] = 255;
	}

	ctx.putImageData(image, 0, 0);
};

let anim = () => {

	draw();

	setTimeout(() => {
		requestAnimationFrame(anim);
	}, 20);
};

requestAnimationFrame(anim);