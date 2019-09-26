class Shape {
    constructor(x = 0, y = 0) {

        this.m_pos = {
            x: x,
            y: y
        };

        this.m_fillColor = "#000";
        this.m_strokeColor = "#000";
        this.context = null;
        this.is_Fill = true;
        this.m_origin = {
            x: 0.5,
            y: 0.5
        };

        this.m_rotation = 0;
        this.m_pointCount = 1;
    }

    get x() {
        return this.m_pos.x;
    }

    get y() {
        return this.m_pos.y;
    }

    getX() {
        return this.m_pos.x;
    }

    getY() {
        return this.m_pos.y;
    }

    setContext(context) {
        this.context = context;
    }

    setFillColor(color) {
        this.m_fillColor = color;
    }

    setStrokeColor(color) {
        this.m_strokeColor = color;
    }

    setRotation(angle) {
        this.m_rotation = angle;
    }

    rotate(angle) {
        this.m_rotation += angle;
    }

    setPosition(x, y) {
        this.m_pos.x = x;
        this.m_pos.y = y;
    }

    move(x, y) {
        this.m_pos.x += x;
        this.m_pos.y += y;
    }
    /**
     * virtual
     */
    render() {}

    toDraw(isFill = true) {
        if (isFill) {
            ctx.fillStyle = this.m_fillColor;
            ctx.fill();
        }

        else {
            ctx.strokeStyle = this.m_strokeColor;
            ctx.closePath();
            ctx.stroke();
        }
    }

    setOrigin(x, y) {
        this.m_origin.x = x;
        this.m_origin.y = y;
    }

    setOriginX(x) {
        this.m_origin.x = x;
    }

    setOriginY(y) {
        this.m_origin.y = y;
    }

    getPointCount() {
        return this.m_pointCount;
    }
}

class Circle extends Shape {
    constructor(x, y, r) {
        super(x, y);
        this.m_radius = r;
    }

    render(ctx = this.context) {
        ctx.save();
        ctx.beginPath();

        ctx.translate(this.m_pos.x + (this.m_origin.x - 0.5) * this.m_radius*2, this.m_pos.y + (this.m_origin.y - 0.5) * this.m_radius*2);
        ctx.rotate(this.m_rotation);
        ctx.translate((-this.m_origin.x + 0.5) * this.m_radius*2, (-this.m_origin.y + 0.5) * this.m_radius*2);

        ctx.arc(0, 0, this.m_radius, 0, Math.PI * 2, true);
        this.toDraw(this.is_Fill);
        ctx.restore();
    }

    setRadius(r) {
        this.m_radius = r;
    }
}

class Poligone extends Shape {
    constructor(x, y, r, n) {
        super(x, y);
        this.m_radius = r;
        this.m_rotation = Math.PI / 2;
        this.m_pointCount = n;
    }

    render(ctx = this.context) {
        ctx.save();
        let angle = Math.PI * 2 / this.m_pointCount;

        ctx.translate(this.m_pos.x + (this.m_origin.x - 0.5) * this.m_radius, this.m_pos.y + (this.m_origin.y - 0.5) * this.m_radius);
        ctx.rotate(this.m_rotation);
        ctx.translate((-this.m_origin.x + 0.5) * this.m_radius, (-this.m_origin.y + 0.5) * this.m_radius);

        ctx.beginPath();
        ctx.moveTo(Math.cos(this.alpha), Math.sin(this.alpha));
        for (let i = 1; i <= this.m_pointCount; i++) {
            ctx.lineTo(Math.cos(angle*i)*this.m_radius, Math.sin(angle*i)*this.m_radius);
        }
        this.toDraw(this.is_Fill);
        ctx.restore();
    }

    setRadius(radius) {
        this.m_radius = radius;
    }
}

class Rectangle extends Shape {
    constructor(x, y, w, h) {
        super(x, y);
        this.m_size = {
            x: w,
            y: h
        };
        this.m_pointCount = 4;
    }

    render(ctx = this.context) {
        if (this.m_rotation === 0 && this.is_Fill) {
            ctx.fillStyle = this.m_fillColor;
            ctx.fillRect(this.m_pos.x, this.m_pos.y, this.m_size.x, this.m_size.y);
        } else if(this.m_rotation && !this.is_Fill) {
            ctx.strokeStyle = this.m_strokeColor;
            ctx.strokeRect(this.m_pos.x, this.m_pos.y, this.m_size.x, this.m_size.y);
        } else {
            ctx.save();
            ctx.beginPath();

            ctx.translate(this.m_pos.x + this.m_origin.x * this.m_size.x, this.m_pos.y + this.m_origin.y * this.m_size.y);
            ctx.rotate(this.m_rotation);
            ctx.translate(-this.m_origin.x * this.m_size.x, -this.m_origin.y * this.m_size.y);
            let w = this.m_size.x,
                h = this.m_size.y;

            ctx.moveTo(0, 0);
            ctx.lineTo(w, 0);
            ctx.lineTo(w, h);
            ctx.lineTo(0, h);
            this.toDraw(this.is_Fill);
            ctx.restore();
        }

    }

    setSize(x, y) {
        this.m_size = {
            x: x,
            y: y
        }
    }
}