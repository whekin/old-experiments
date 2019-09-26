
class Vector {
    constructor(a, b, isAngle) {
        if (isAngle) {
            this.len = b;
            this.setA(a);
        } else {
            this.x = a;
            this.y = b;
            this.update();
        }

    }

    normalize() {
        this.x /= this.len;
        this.y /= this.len;
        this.update();
        this.len = 1;
    }

    setX(x) {
        this.x = x;
        this.update();
    }

    setY(y) {
        this.y = y;
        this.update();
    }

    setV(x, y) {
        this.x = x;
        this.y = y;
        this.update();
    }

    setA(a) {
        this.a = a;
        this.x = Math.cos(a) * this.len;
        this.y = Math.sin(a) * this.len;
    }

    update() {
        this.len = Math.sqrt(this.x**2 + this.y**2);
        this.a = Math.atan2(this.y, this.x);
    }
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        this.update();
    }

    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        this.update();
    }

    mul(vec) {
        this.x *= vec.x;
        this.y *= vec.y;
        this.update();
    }

    static scalarMul(vec1, vec2) {
        return vec1.x*vec2.x + vec1.y*vec2.y;
    }
}
