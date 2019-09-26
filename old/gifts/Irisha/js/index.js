// happy
const canvas = happy;
const ctx = canvas.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;

canvas.width = w;
canvas.height = h;

ctx.fillStyle = "#1A237E";
ctx.translate(w * 0.5, h * 0.5);
let starImage = document.getElementById("starImage");

class Star {
  constructor(x, y) {
    this.pos = {
      x,
      y
    }
  }

  render() {
    ctx.drawImage(starImage, this.pos.x, this.pos.y);
  }
}

const inter = new Inter();

const starsCount = 700;
const stars = new Array(starsCount);

for (let i = 0; i < starsCount; i++) {
  stars[i] = new Star(0, 0);
}

let a = 0;
let r = 0;
let animCounter = 0;

const update = () => {
  // polar coordinates
  a = animCounter / 700; // alpha

  for (let i = 0; i < starsCount; i++) {
    a -= 0.2;

    r = starsCount - (animCounter + i) % starsCount;

    let newPos = toDecart(a, r);
    let mx = inter.moveX - 0.5 * w;
    let my = inter.moveY - 0.5 * h;

    let dis = distance(mx, my, newPos.x, newPos.y);
    let d = {
      x: mx - newPos.x,
      y: my - newPos.y
    };

    stars[i].pos = {
      x: newPos.x + d.x / dis * 10,
      y: newPos.y + d.y / dis * 10
    };
  }
};

const render = () => {
  for (let i = 0; i < starsCount; i++) {
    stars[i].render();
  }
};

const clear = () => {
  ctx.clearRect(-0.5 * w, -0.5 * h, w, h);
};

const anim = () => {
  animCounter++;
  update();
  clear();
  render();
  window.requestAnimationFrame(anim);
};

anim();