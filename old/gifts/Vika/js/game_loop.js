// game_loop
class Game_loop {
	constructor() {
		this.running = false;
		this.update = function() {};
		this.render = function() {};
		this.fpc = 0;
	}

	start() {
		this.running = true;
		this.e_time = Date.now();
		this.loop();
	}

	stop() {
		this.running = false;
	}

	loop() {
		let tick = () => {
			this.s_time = Date.now();
			this.d_time = this.s_time - this.e_time;
			this.fpc = 1000 / this.d_time;

			this.update();
			this.render();

			this.e_time = Date.now();
			if (this.running)
				requestAnimationFrame(tick);
		};
		
		tick();
		
	}

	setUpdate(f) {
		this.update = f;
	}

	setRender(f) {
		this.render = f;
	}

	getFpc() {
		return this.fpc;
	}
}