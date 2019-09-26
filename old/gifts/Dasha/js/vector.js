
class Vector {
    constructor(a, b, isAngle = false) {
        if (isAngle) {
            this.len = b;
            this.setA(a);
        } else {
            this.m_x = a;
            this.m_y = b;
            this.update();
        }

    }

    normalize(l = 1) {
        this.m_x /= this.len;
        this.m_y /= this.len;
        this.m_x *= l;
        this.m_y *= l;
        this.update();
        this.len = l;
    }

    get x() {
        return this.m_x;
    }

    get y() {
        return this.m_y;
    }

    get a() {
        return this.m_angle;
    }
    
    set x(x) {
        this.setX(x);
    }

    set y(y) {
        this.setY(y)
    }

    set a(a) {
        this.setA(a);
    }

    setX(x) {
        this.m_x = x;
        this.update();
    }

    setY(y) {
        this.m_y = y;
        this.update();
    }

    setV(x, y) {
        this.m_x = x;
        this.m_y = y;
        this.update();
    }

    setA(a) {
        this.m_angle = a;
        this.m_x = Math.cos(a) * this.len;
        this.m_y = Math.sin(a) * this.len;
    }

    update() {
        this.len = Math.sqrt(this.m_x**2 + this.m_y**2); // es6
        this.m_angle = Math.atan2(this.m_y, this.m_x);
    }
    add(vec) {
        this.m_x += vec.x;
        this.m_y += vec.y;
        this.update();
    }

    sub(vec) {
        this.m_x -= vec.x;
        this.m_y -= vec.y;
        this.update();
    }

    mul(vec) {
        this.m_x *= vec.x;
        this.m_y *= vec.y;
        this.update();
    }

    static scalarMul(vec1, vec2) {
        return vec1.x*vec2.x + vec1.y*vec2.y;
    }
}
