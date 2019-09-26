/**
 * @autor Heyght
 * @date 22.03.18
 */

(function(window) {
  'use strict';
  const intervalFirework = 2000;
  const startDelayFirework = 1630;
  const startDelayApplication = 1350;

  const c = {
    w: null,
    h: null
  };

  window.scale = 1;

  const adaptCanvas = () => {
    canvas.width = c.w = window.innerWidth * scale;
    canvas.height = c.h = window.innerHeight * scale;

    c.w05 = c.w * 0.5;
    c.h05 = c.h * 0.5;
  };

  adaptCanvas();

  const ctx = canvas.getContext("2d");

  const defaultSetting = () => {
    ctx.fillStyle = "#66bb6a";
    ctx.strokeStyle = "#263238";

    ctx.lineWidth = "1";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseLine = "middle";
  };

  defaultSetting();

  const clearCanvas = () => {
    ctx.fillStyle = "rgba(255,255,255, 0.09)";
    ctx.fillRect(0, 0, c.w, c.h);
  };

  const particles = [];

  const colors = [
    "#ef5350",
    "#ab47bc",
    "#5c6bc0",
    "#64b5f6",
    "#26c6da",
    "#4db6ac",
    "#66bb6a",
    "#ffee58",
    "#ffa726",
    "#ec407a",
    "#69f0ae"
  ];

  /**
   * create particle
   * @param {Number} x
   * @param {Number} y
   * @param {Number} radius
   * @param {String} color
   * @param {Number} vectorX
   * @param {Number} vectorY
   */
  class Particle {
    constructor(x, y, radius, color, vectorX, vectorY, number, total_speed) {
      this.x = x;
      this.y = y;
      this.color = toRGBA(color);
      this.vectorX = vectorX;
      this.vectorY = vectorY;
      this.radius = radius;
      this.number = number;
      this.total_speed = total_speed;
    }

  /**
   *
   * @param {int} id - particles[id]
   *
   */

    render() {
      this.color = colorInc(this.color, "rgba", 1);
      ctx.fillStyle = this.color;
      
      // радиус описывающей окружности
      
      let R = distance(this.x, this.y, mouse.mx, mouse.my);

      // сторона правильного многоугольника
      let a = 2 * R * Math.sin(Math.PI / this.number);
      
      this.radius = 0.5 * a;

      // отрисовка частиц
      ctx.beginPath();
      //ctx.arc(this.x + Math.sin(c.w05 - this.x) * 20, this.y + Math.cos(c.h05 - this.y) * 20, this.radius /* (distance(mouse.mx, mouse.my, this.x, this.y)/()) + 2*/, 0, Math.PI * 2);
      
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      
      
      this.x += this.vectorX;
      this.y += this.vectorY;
    }
  }

  
  /**
   * create sprinkle
   * @param {Number<int>} number - количество Particles
   * @param {Number<int>} x - координата центра салюта
   * @param {Number<int>} y - координата центра салюта
   * @param {Number<float|int>=} [3] speed - скорость
   * @param {Boolean=} false spiral
   */
  let add = 0;
  
  // create sprinkler (data base)
  function sprinkler(number, x, y, speed = 5, spiral = false, radius = 5) {

    let angleParticles = (Math.PI * 2) / number;

    let color = colors[randomInt(0, colors.length - 1)];

    let vectorX, vectorY;
    add += (Math.PI / 180)*2;

    for (let i = 0; i < number; i++) {
      vectorX = toDecart(angleParticles * i + add, 1).x * speed;
      vectorY = toDecart(angleParticles * i + add, 1).y * speed;

      particles.push(new Particle(
                      x + vectorX*radius*(spiral ? 1 : 0),
      							  y + vectorY*radius*(spiral ? 1 : 0),
      							  radius, // radius
                      spiral?colors[Math.round(colors.length*(i/number))] : color,
      							  vectorX,
                      vectorY,
                      number
      				    ));
    }
  }

  var iter = 10;

  const draw = (time) => {

    clearCanvas();

    for (let i = 0; i < particles.length; ++i) {
      var self = particles[i];
      self.render();
      if (self.x > c.w || self.x < 0 || self.y > c.h || self.y < 0) {
        particles.splice(i--, 1);
      }
    }

    if (mouse.down)
      sprinkler(10, mouse.mx, mouse.my, 8, true, 4);

    if (time < 3000) {
      iter = ++iter || 1;
      ctx.save();
      ctx.font = `${iter}px sans-serif`;
      ctx.fillStyle = "#rgba(41,182,246,1)";
      ctx.fillText("Firework!", c.w05, c.h05);
      ctx.restore();
    }
  };

  canvas.addEventListener("click", () => {
    sprinkler(100, mouse.sx, mouse.sy, 5, false, 5);
  });

  let canvasAnim = new Anim(draw);

  window.addEventListener("resize", () => {
    adaptCanvas();
    defaultSetting();
  });

  function start() {
    canvasAnim.start();
    sprinkler(300, c.w05, c.h05, 7, false, 5);
    
    setTimeout(function anim () {
      if (!document.hidden && !mouse.down) sprinkler(randomInt(70, 500), randomInt(50, c.w - 50), randomInt(50, c.h - 50), randomInt(3, 7));
      setTimeout(anim, intervalFirework);
    }, startDelayFirework);
  }

  setTimeout(() => {
    start();
  }, startDelayApplication);
  window.canvasAnim = canvasAnim;
  window.particles = particles;
})(this)