const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pieces = [];

for (let i = 0; i < 150; i++) {
  pieces.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 10 + 5,
    d: Math.random() * 50,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => {
    ctx.beginPath();
    ctx.lineWidth = p.r / 2;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r / 3, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 3);
    ctx.stroke();
  });

  update();
  requestAnimationFrame(draw);
}

function update() {
  pieces.forEach(p => {
    p.tiltAngle += 0.1;
    p.y += Math.cos(p.d) + 1 + p.r / 2;
    p.tilt = Math.sin(p.tiltAngle) * 15;

    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });
}

function startConfetti() {
  draw();
}
