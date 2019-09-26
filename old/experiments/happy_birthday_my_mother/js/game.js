//

var game = document.getElementById("game");


setTimeout(function() {
	game.classList.remove("hidden");

}, 1000);

game.addEventListener("click", function() {
	document.body.style.overflow = "hidden";
	game.classList.add("open"); // 4s
	setTimeout(game_opened, 4100);

}, false);

function game_opened() {
	var canvas = document.createElement("canvas");
	canvas.id = "game_canvas";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	game.appendChild(canvas);

	var ctx = canvas.getContext("2d");

	

	canvas.addEventListener("resize", function() {

	});
}