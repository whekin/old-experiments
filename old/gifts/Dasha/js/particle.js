class Particle {
    constructor(letter, x, y, r1, r2, mass, target, color1, color2, textColor) {
        this.position = {};
        this.position.x = x;
        this.position.y = y;
        this.radius = r1;
        this.mass = mass;
        this.target = target;
        this.letter = letter;
        this.textColor = textColor;

        this.circle1 = new Circle(x, y, r1);
        this.circle1.setFillColor(color1);

        this.circle2 = new Circle(x, y, r2);
        this.circle2.setFillColor(color2);

        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0,0);

        Particles.add(this);
    }

    render() {
        this.circle1.render(ctx);
        this.circle2.render(ctx);
        ctx.save();
        ctx.font = 'bold 17px sans-serif';
        ctx.fillStyle = this.textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.letter, this.position.x, this.position.y);
        ctx.restore();
    }

    setPos(x, y) {
        this.position.x = x;
        this.position.y = y;
        this.update();
    }

    setPosX(x) {
        this.x = x;
        this.update();
    }

    setPosY(y) {
        this.y = y;
        this.update();
    }

    move() {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        this.velocity.x *= 0.999;
        this.velocity.y *= 0.999;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.update(this);
    }

    update () {
        this.circle1.position.x = this.position.x;
        this.circle1.position.y = this.position.y;

        this.circle2.position.x = this.position.x;
        this.circle2.position.y = this.position.y;
    }

    getTotalAcceleration(fields) {
        let totalAcceleration = {x: null, y: null};
        for (let i = 0, len =  Particles.particles.length; i < len + fields.length; i++) {

            let other_particle;
            if (i < len)
                other_particle = Particles.particles[i];
            else
                other_particle = fields[i - len];

            let vectorX = other_particle.position.x - this.position.x;
            let vectorY = other_particle.position.y - this.position.y;

            let mass = other_particle.mass;
            let force = mass / Math.pow(( vectorX*vectorX + mass/2 + vectorY*vectorY + mass/2 ), 1.5);

            if (Math.abs(force) < 0.000001 || isNaN(force))
                force = 0.000001;
            else if (Math.abs(force) > 0.1)
                force = 0.1;
            totalAcceleration.x += vectorX * force;
            totalAcceleration.y += vectorY * force;
        }
        return totalAcceleration;
    }
}

class Particles {
    static update() {
        let len = Particles.particles.length;
        console.log(game.getFps())
        for (let i = 0; i < len; i++) {
            let particle = Particles.particles[i];

            let totalAcceleration;

            if (particle.target.is) {
                let dis = distance(particle.target.x, particle.target.y, particle.position.x, particle.position.y);
                if (dis < 1) {
                    particle.target.is = false;
                    if (particle.target.restore) {
                       setTimeout(() => {
                            for (let j = 0; j < len; j++) {
                                let particle = Particles.particles[j];
                                particle.target = {
                                    res_time: 1000,
                                    is: true,
                                    restore: false,
                                    x: Math.cos(toRad(360*j/len)) * (wall_circle_radius/3) + canvas_width/2,
                                    y: Math.sin(toRad(360*j/len)) * (wall_circle_radius/3) + canvas_height/2
                                };
                                //particle.velocity = new Vector(0, 0);
                            }

                       }, particle.target.res_time);
                    }
                }

                particle.velocity = new Vector(particle.target.x - particle.position.x, particle.target.y - particle.position.y);
                particle.velocity.normalize(dis/wall_circle_radius*7);
                particle.acceleration = new Vector(0, 0);

            } else {
                if (distance(particle.position.x, particle.position.y, canvas_width / 2, canvas_height / 2) + particle.velocity.len > wall_circle_radius) {

                    let a = particle.velocity.a;
                    let b = Math.atan2(particle.position.y - canvas_height / 2, particle.position.x - canvas_width / 2);

                    particle.velocity.a = b - Math.PI; // отскок к центру... :-(
                }
                totalAcceleration = particle.getTotalAcceleration(
                    [
                        {
                            position:
                                {
                                    x: inter.moveX,
                                    y: inter.moveY
                                },
                            mass: MOUSE_MASS
                        }
                    ]
                );
                particle.acceleration = new Vector(totalAcceleration.x, totalAcceleration.y);
            }

            particle.move();
        }
    }

    static render() {

        for (let i = 0, len = Particles.particles.length; i < len; i++) {
            let particle = Particles.particles[i];
            particle.render();
        }
    }

    static add(particle) {
        Particles.particles.push(particle);
    }

    static get particles() {
        return Particles.prototype.particles;
    }
}

Particles.prototype.particles = [];