const happy = document.getElementById("happy");
happy.width = window.innerWidth;
happy.height = window.innerHeight;

const inter = new Inter(happy, "auto");

const ctx = happy.getContext("2d");

const center = {
    x: happy.width / 2,
    y: happy.height / 2
};

const SPRAYERS_POWER = 2.5*Math.sqrt(happy.width / 1100);
const SPRAYERS_ANGLE = toRad(-56);
const sprayer1 = new Sprayer(center.x/5, center.y, new Vector(SPRAYERS_ANGLE, SPRAYERS_POWER, true));
const sprayer2 = new Sprayer(happy.width - center.x/5, center.y, new Vector(Math.PI - SPRAYERS_ANGLE, SPRAYERS_POWER, true));

const fife1 = new Poligone(center.x/5, center.y, 7, 5);
fife1.setFillColor("#993629");

const fife2 = new Poligone(happy.width - center.x/5, center.y, 7, 5);
fife2.setFillColor("#993629");


const CIRCLE_RADIUS = 90;
const SIX_AROUND_CIRCLE_RADIUS = CIRCLE_RADIUS/Math.cos(toRad(30));

const circle = new Circle(center.x, SIX_AROUND_CIRCLE_RADIUS + 20, 90);
circle.setFillColor("#ff9800");

const six_around_circle = new Poligone(center.x, SIX_AROUND_CIRCLE_RADIUS + 20, SIX_AROUND_CIRCLE_RADIUS, 6);
six_around_circle.is_Fill = false;
six_around_circle.setStrokeColor("#aaa");

const game_loop = new Game_loop();
game_loop.setUpdate(() => {
    sprayer1.update();
    sprayer2.update();
    Particle.update();
    six_around_circle.rotate(0.01);

    if (distance(inter.moveX, inter.moveY, center.x, SIX_AROUND_CIRCLE_RADIUS + 20) < 90)
        six_around_circle.rotate(0.04);
});

game_loop.setRender(() => {
    ctx.clearRect(0, 0, happy.width, happy.height);

    circle.render(ctx);
    six_around_circle.render(ctx);

    ctx.save();
    ctx.textAlign = "center";
    ctx.font = 20+"px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Happy birthday to", center.x, SIX_AROUND_CIRCLE_RADIUS + 20)
    ctx.fillText("YOU", center.x, SIX_AROUND_CIRCLE_RADIUS + 50);
    ctx.restore();

    Particle.render(ctx);
    fife1.render(ctx);
    fife2.render(ctx);

});

setTimeout(() => {
    const write_time = words_fade_in(document.querySelector(".text p"));
    const text_wrap = document.querySelector(".text-wrap");
    setTimeout(() => {
        text_wrap.classList.add("start");

        setTimeout(() => {
            text_wrap.classList.add("hide");
            happy.classList.add("start");
            game_loop.start();
        }, 1000);

    }, write_time + 2000);
}, 1000);
