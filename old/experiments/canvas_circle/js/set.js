"use strict";

import {launchFullScreen, cancelFullscreen} from './fullscreen.js';
import {options} from './circle.js';

let set = document.getElementById("set");
let send = document.getElementById("send");
let fullscreen = document.getElementById("fullscreen");
let warning = document.getElementById("warning");

let isFullScreen = false;

let animTiming = 400; // ms
let isOpenSettings = false;

let openSettings = () => {
	set.className = "btn open";
	settings.className = "open";
	settings.style.display = "block";
	isOpenSettings = true;
	setTimeout(() => {
		set.innerHTML = "Закрыть";
	}, animTiming);
};

let closeSettings = () => {
	set.className = "btn close";
	settings.className = "close";
	setTimeout(() => {
		settings.style.display = "none";
		isOpenSettings = false;
		set.innerHTML = "настройки";
	}, animTiming);
};
// Открывать настройки по клику на #set
set.addEventListener("click", () => {
	if (!isOpenSettings)
		openSettings();
	else 
		closeSettings();
});

// по клику пл кнопке "Применить" активировать низменения
send.addEventListener("click", () => {

	let form = document.forms.settings;

	canvas.style.backgroundColor = form["back-color"].value;

	options.color = ~form.color.value.indexOf("#ffa000") ? null : form.color.value;
	options.radius = +form.radius.value;
	options.speedDetect = +form.speedDetect.value;
	options.frictionWall = +form.frictionWall.value;
	
	options.friction = +form.friction.value;

	closeSettings();
});

// Обработка клика по "fullscreen"
fullscreen.addEventListener("click", () => {
	if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null) {
		cancelFullscreen(document.documentElement);
		fullscreen.innerHTML = "Полноэкранный режим";
	} else {
		try {
			launchFullScreen(document.documentElement);
			fullscreen.innerHTML = "Обычный режим!";
		} catch(ex) {
			alert("Полноэкранный режим не поддерживается..")
		}
	}
});

warning.addEventListener("click", function () {
	warning.className = "warning close";
	setTimeout(function() {
		warning.style.display = "none";
	}, 500);
});

// Поведение карт настроек
let labels = document.getElementsByTagName("label");
for (var i = 0; i < labels.length; i++) {
	labels[i].addEventListener("keyup", (e) => {
		if (e.keyCode == 13 || e.keyCode == 27) {
			e.target.blur();
		}
	});
}