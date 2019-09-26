(function (window) {

    let canvas = document.getElementById("canvas");

    const mouse = {
        sx: 0, // Start x
        sy: 0, // Start y
        mx: 0, // Move x
        my: 0, // Move y
        ex: 0, // End x
        ey: 0, // End y
        dx: 0, // Delta x
        dy: 0, // Delta y
        _dx: 0, // Не сбрасывается
        _dy: 0,
        down: false,
        isStart: false,
        isMove: false,
        isEnd: false
    };

	let param = {
		_edx: 0, // save touch._dx
		_edy: 0,
	};
    window.mouse = mouse;

    if (device.desktop()) {

        canvas.addEventListener("mousedown", (e) => {
            mouse.sx = e.clientX;
            mouse.sy = e.clientY;

            mouse.down = true;
            mouse.isEnd = false;
            mouse.isStart = true;

        });

        canvas.addEventListener("mousemove", (e) => {
            mouse.mx = e.clientX;
            mouse.my = e.clientY;

            if (mouse.down) {
                mouse.dx = mouse.mx - mouse.sx;
                mouse.dy = mouse.my - mouse.sy;

                mouse._dx = param._edx + mouse.dx;
                mouse._dy = param._edy + mouse.dy;
            }

            if(!mouse.isMove) {
                mouse.isMove = true;
                mouse.isStart = false;
                mouse.isEnd = false;
            }
        });

        canvas.addEventListener("mouseup", (e) => {
            mouse.ex = e.clientX;
            mouse.ey = e.clientY;

            param._edx = mouse._dx;
            param._edy = mouse._dy;

            mouse.down = false;

            mouse.isMove = false;
            mouse.isEnd = true;
        });

    } else { // mobile || tablet

        canvas.addEventListener("touchstart", (e) => {

            e.preventDefault();

            mouse.sx = e.touches[0].clientX;
            mouse.sy = e.touches[0].clientY;

            mouse.down = true;
            mouse.isEnd = false;
            mouse.isStart = true;
        });

        canvas.addEventListener("touchmove", (e) => {

            e.preventDefault();

            mouse.mx = e.touches[0].clientX;
            mouse.my = e.touches[0].clientY;

            mouse.dx = mouse.mx - mouse.sx;
            mouse.dy = mouse.my - mouse.sy;

            mouse._dx = param._edx + mouse.dx;
            mouse._dy = param._edy + mouse.dy;

             if(!mouse.isMove) {
                mouse.isMove = true;
                mouse.isStart = false;
                mouse.isEnd = false;
            }
        });

        canvas.addEventListener("touchend", (e) => {

            e.preventDefault();

            mouse.ex = e.clientX;
            mouse.ey = e.clientY;

            param._edx = mouse._dx;
            param._edy = mouse._dy;

            mouse.down = false;

            mouse.isMove = false;
            mouse.isStart = false;
            mouse.isEnd = true;
        });
    }
})(window)
