
class Particle extends Rectangle {
    constructor(x, y, s) {
        super(x, y, s, s);
        this.vector = new Vector(0, 0);
        Particle.prototype.particles.push(this);
        this.d_time = 0;
        this.s_time = Date.now();
    }

    static get particles() {
        return Particle.prototype.particles;
    }

    static set particles(val) {
        Particle.prototype.particles = val;
    }

    static update() {
        const particles = Particle.prototype.particles;
        let current_particles = [];

        for (let i = 0, len = particles.length; i < len; ++i)
        {
            let particle = particles[i];
            if (particle.x > happy.width
                || particle.x < 0
                || particle.y > happy.height
                || particle.y < 0
            ) {
                continue;
            }

            this.d_time = Date.now() - particle.s_time;

            let dis = distance(inter.downX + inter.deltaX, inter.downY + inter.deltaY, particle.x, particle.y);
            //let rotate = (center.x - inter.moveX)/innerWidth/5;

            if (dis < 30 && inter.isPressed) {
                particle.setSize(particle.m_size.x + 0.5, particle.m_size.y + 0.5);
                //particle.rotate(rotate);
            }

            // let dis2 = distance(particle.x, particle.y, center.x, happy.height - 150);
            // if (dis2 > 100 && dis2 < 120) {
            //     particle.vector.y = 0;
            //     particle.vector.x = 0;
            // }
            // let dis3 = distance(particle.x, particle.y, center.x, happy.height - 150);
            // if (dis3 > 70 && dis3 < 85) {
            //     particle.vector.y = 0;
            //     particle.vector.x = 0;
            // }
            let dis4 = distance(particle.x, particle.y, center.x, happy.height - 150);
            if (dis4 > 0 && dis4 < 20) {
                particle.vector.y = 0;
                particle.vector.x = 0;
            }
            particle.vector.setY(particle.vector.y + (0.00002*this.d_time));

            particle.move(particle.vector.x,
                particle.vector.y);
            //particle.rotate(rotate/2);
            current_particles.push(particle);
        }
        Particle.prototype.particles = current_particles;
    }

    static render(ctx) {
        for (let i = 0, len = Particle.prototype.particles.length; i < len; ++i)
        {
            Particle.prototype.particles[i].render(ctx);
        }
    }
}

Particle.particles = [];
