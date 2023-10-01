const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const fireworks = [];

function Firework(x, y) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 6 - 3;
    this.vy = Math.random() * -15 - 10;
    this.gravity = 0.2;
    this.opacity = 1;
    this.color = getRandomColor();

    this.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.opacity -= 0.01;

        if (this.opacity <= 0) {
            fireworks.splice(fireworks.indexOf(this), 1);
        }
    };

    this.draw = function () {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    };
}

function getRandomColor() {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createFirework(x, y) {
    const firework = new Firework(x, y);
    fireworks.push(firework);
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    fireworks.forEach(function (firework) {
        firework.update();
        firework.draw();
    });

    requestAnimationFrame(animate);
}

canvas.addEventListener("mousedown", function (e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    createFirework(mouseX, mouseY);
});

canvas.addEventListener("touchstart", function (e) {
    const touch = e.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;
    createFirework(touchX, touchY);
});

animate();