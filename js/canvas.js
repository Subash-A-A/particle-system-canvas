// Variables
const hueSpeed = 1;
const moveParticles = 5;
const clickParticles = 15;

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
console.log(ctx);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArr = [];
let hue = 0;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: null,
  y: null,
};

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < moveParticles; i++) {
    particlesArr.push(new Particle());
  }
});
canvas.addEventListener("click", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < clickParticles; i++) {
    particlesArr.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;

    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticle() {
  particlesArr.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.size <= 0.3) {
      particlesArr.splice(index, 1);
      console.log(particlesArr.length);
    }
  });
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  hue += hueSpeed;
  requestAnimationFrame(animate);
}
animate();
