const colors = [
    "#f44336",
    "#e01e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196F3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4CAF50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722"
];

const COLORS_LEN = colors.length;

class Sprayer {
    constructor(x, y, vec) {
        this.x = x;
        this.y = y;
        this.vec = vec;
        this.count = 0;
    }

    update() {
        const vec = new Vector(0, this.vec.len, true);
        vec.setA(this.vec.a + (Math.sin(this.count/(0.16*Math.PI)))/4);

        const particle = new Particle(this.x, this.y, 3);
        particle.vector = vec;
        particle.setFillColor(colors[Math.floor((this.count / 30)%COLORS_LEN)]);

        this.count++;
    }
}