// Variables
const hueSpeed = 1;
const moveParticles = 1;
const clickParticles = 10;

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
    if (this.size > 0.2) this.size -= 0.2;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function connect() {
  for (let a = 0; a < particlesArr.length; a++) {
    for (let b = a; b < particlesArr.length; b++) {
      let dx = particlesArr[a].x - particlesArr[b].x;
      let dy = particlesArr[a].y - particlesArr[b].y;
      let distance = dx * dx + dy * dy;

      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particlesArr[a].x, particlesArr[a].y);
        ctx.lineTo(particlesArr[b].x, particlesArr[b].y);
        ctx.stroke();
      }
    }
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
  connect();
  hue += hueSpeed;
  requestAnimationFrame(animate);
}
animate();
