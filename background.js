const starsCanvas = document.getElementById("stars");
const starsCtx = starsCanvas.getContext("2d");

const skyCanvas = document.getElementById("sky");
const skyCtx = skyCanvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
starsCanvas.width = width;
starsCanvas.height = height;
skyCanvas.width = width;
skyCanvas.height = height;

const numStars = 150;
const maxDistance = 120;
const stars = [];

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    radius: Math.random() * 1.5 + 0.5,
  });
}

function drawPolarisStar(ctx, x, y, radius, color) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = radius * 0.2;
  ctx.fill();
  ctx.restore();
}

function animate() {
  starsCtx.clearRect(0, 0, width, height);
  skyCtx.clearRect(0, 0, width, height);

  const polarisX = width / 2;
  const polarisY = height * 0.1;
  drawPolarisStar(skyCtx, polarisX, polarisY, 80, "white");

  for (let star of stars) {
    star.x += star.vx;
    star.y += star.vy;

    if (star.x < 0 || star.x > width) star.vx *= -1;
    if (star.y < 0 || star.y > height) star.vy *= -1;

    starsCtx.beginPath();
    starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    starsCtx.fillStyle = "white";
    starsCtx.fill();
  }

  for (let i = 0; i < numStars; i++) {
    for (let j = i + 1; j < numStars; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        const opacity = 1 - dist / maxDistance;
        skyCtx.beginPath();
        skyCtx.moveTo(stars[i].x, stars[i].y);
        skyCtx.lineTo(stars[j].x, stars[j].y);
        skyCtx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
        skyCtx.lineWidth = 0.5;
        skyCtx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  const oldWidth = width;
  const oldHeight = height;

  width = window.innerWidth;
  height = window.innerHeight;

  const scaleX = width / oldWidth;
  const scaleY = height / oldHeight;

  starsCanvas.width = width;
  starsCanvas.height = height;
  skyCanvas.width = width;
  skyCanvas.height = height;

  for (let star of stars) {
    star.x *= scaleX;
    star.y *= scaleY;
  }
});
