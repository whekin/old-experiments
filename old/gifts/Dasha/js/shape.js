class Shape {
    constructor(x = 0, y = 0) {

        this.position = {
            x: x,
            y: y
        };

        this.fillColor = "#000";
        this.strokeColor = "#000";
        this.context = null;
        this.is_Fill = true;
        this.origin = {
            x: 0.5,
            y: 0.5
        };

        this.rotation = 0;
        this.pointCount = 1;
    }

    setContext(context) {
        this.context = context;
    }

    setFillColor(color) {
        this.fillColor = color;
    }

    setStrokeColor(color) {
        this.strokeColor = color;
    }

    setRotation(angle) {
        this.rotation = angle;
    }

    rotate(angle) {
        this.rotation += angle;
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    setPositionX(x) {
        this.position.x = x;
    }

    setPositionY(y) {
        this.position.y = y;
    }

    move(x, y) {
        this.position.x += x;
        this.position.y += y;
    }
    /**
     * virtual
     */
    render() {}

    toDraw(isFill = true) {
        if (isFill) {
            ctx.fillStyle = this.fillColor;
            ctx.fill();
        }

        else {
            ctx.strokeStyle = this.strokeColor;
            ctx.closePath();
            ctx.stroke();
        }
    }

    setOrigin(x, y) {
        this.origin.x = x;
        this.origin.y = y;
    }

    setOriginX(x) {
        this.origin.x = x;
    }

    setOriginY(y) {
        this.origin.y = y;
    }

    getPointCount() {
        return this.pointCount;
    }
}

class Circle extends Shape {
    constructor(x, y, r) {
        super(x, y);
        this.radius = r;
    }

    render(ctx = this.context) {
        ctx.save();
        ctx.beginPath();

        ctx.translate(this.position.x + (this.origin.x - 0.5) * this.radius*2, this.position.y + (this.origin.y - 0.5) * this.radius*2);
        ctx.rotate(this.rotation);
        ctx.translate((-this.origin.x + 0.5) * this.radius*2, (-this.origin.y + 0.5) * this.radius*2);

        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
        this.toDraw(this.is_Fill);
        ctx.restore();
    }

    setRadius(r) {
        this.radius = r;
    }

    get r() {
        return this.radius;
    }

}

class Poligone extends Shape {
    constructor(x, y, r, n) {
        super(x, y);
        this.radius = r;
        this.rotation = Math.PI / 2;
        this.pointCount = n;
    }

    render(ctx = this.context) {
        ctx.save();
        let angle = Math.PI * 2 / this.pointCount;

        ctx.translate(this.position.x + (this.origin.x - 0.5) * this.radius, this.position.y + (this.origin.y - 0.5) * this.radius);
        ctx.rotate(this.rotation);
        ctx.translate((-this.origin.x + 0.5) * this.radius, (-this.origin.y + 0.5) * this.radius);

        ctx.beginPath();
        ctx.moveTo(Math.cos(this.alpha), Math.sin(this.alpha));
        for (let i = 1; i <= this.pointCount; i++) {
            ctx.lineTo(Math.cos(angle*i)*this.radius, Math.sin(angle*i)*this.radius);
        }
        this.toDraw(this.is_Fill);
        ctx.restore();
    }

    setRadius(radius) {
        this.radius = radius;
    }
}

class Rectangle extends Shape {
    constructor(x, y, w, h) {
        super(x, y);
        this.size = {
            x: w,
            y: h
        };
        this.pointCount = 4;
    }

    render(ctx = this.context) {
        if (this.rotation === 0 && this.is_Fill) {
            ctx.fillStyle = this.fillColor;
            ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
        } else if(this.rotation && !this.is_Fill) {
            ctx.strokeStyle = this.strokeColor;
            ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
        } else {
            ctx.save();
            ctx.beginPath();

            ctx.translate(this.position.x + this.origin.x * this.size.x, this.position.y + this.origin.y * this.size.y);
            ctx.rotate(this.rotation);
            ctx.translate(-this.origin.x * this.size.x, -this.origin.y * this.size.y);
            let w = this.size.x,
                h = this.size.y;

            ctx.moveTo(0, 0);
            ctx.lineTo(w, 0);
            ctx.lineTo(w, h);
            ctx.lineTo(0, h);
            this.toDraw(this.is_Fill);
            ctx.restore();
        }
    }

    setSize(x, y) {
        this.size = {
            x: x,
            y: y
        }
    }
}