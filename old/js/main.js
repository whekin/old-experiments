if (device.desktop()) {
	let for_mobile = document.querySelectorAll(".for_mobile");

	for (var i = 0; i < for_mobile.length; i++) {
		for_mobile[i].parentNode.remove();
	}
}
// Для footer
if (document.documentElement.scrollHeight == window.innerHeight) {
	const footer = document.querySelector(".footer");
	footer.style = "position: absolute; bottom: 0; left: 0; right: 0;";
}

Waves.attach(".card", "waves-light");

Waves.init({
	duration: 1000
});