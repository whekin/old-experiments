(function() {
    let letters = "Даша, с днём рождения!"; //22
    for (let i = 0, len = letters.length; i < len; i++) {
        let c1, c2, c3;
        c1 = "hsl("+360*(i/len)+",50%, 50%)";
        c2 = "#ffffff";
        c3 = c1;
        let angle = i * (Math.PI*2 / len);
        let particle = new Particle(
            letters[i],                             // letter
            canvas_width / 2 + Math.cos(angle)*100, // x position
            canvas_height / 2 + Math.sin(angle)*100,// y position
            particle_radius,          // radius external circle
            10,          // radius inner circle
            PARTICLE_MASS,         // mass
            {is: false},// target
            c1,          // color of external circle
            c2,          // color of inner circle
            c3           // color of text
        );
        setTimeout(() => {
            particle.velocity = new Vector(Math.PI*2 * i/len, 1, true);
        }, i*100);

    }

    let mouse_field = new Circle(inter.moveX, inter.moveY, 20);
    mouse_field.setFillColor("#d0d0d0");

    function update() {
        Particles.update();
        mouse_field.setPosition(inter.moveX, inter.moveY);
    }

    function render() {
        ctx.clearRect(0, 0, canvas_width, canvas_height);
        ctx.beginPath();
        ctx.arc(canvas_width / 2, canvas_height / 2, wall_circle_radius + particle_radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "#ececec";
        ctx.fill();
        Particles.render();
        mouse_field.render(ctx);
    }


    game.setUpdate(update);
    game.setRender(render);

    game.start();
    setTimeout(() => {
        for (let i = 0, len = letters.length; i < len; i++) {
            let particle = Particles.particles[i];
            particle.target = {
                res_time: 2000,
                is: true,
                restore: true,
                x: Math.cos(toRad(-170 + i * (160 / (len - 1)))) * (wall_circle_radius + particle_radius * 2) + canvas_width / 2,
                y: Math.sin(toRad(-170 + i * (160 / (len - 1)))) * (wall_circle_radius + particle_radius * 2) + canvas_height / 2
            };
        }

    }, 5000);

    document.getElementById("get_circle").addEventListener("click", () => {
            for (let j = 0, len = Particles.particles.length; j < len; j++) {
                let particle = Particles.particles[j];
                particle.target = {
                    res_time: 1000,
                    is: true,
                    restore: false,
                    x: Math.cos(toRad(360*j/len)) * (wall_circle_radius/3) + canvas_width/2,
                    y: Math.sin(toRad(360*j/len)) * (wall_circle_radius/3) + canvas_height/2
                };

            }
    });
}).call(window);