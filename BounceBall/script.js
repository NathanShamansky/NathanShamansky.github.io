const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }
  
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.size -= 0.1;
    }
  
    draw() {
      ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }
  
  const ballImg = new Image();
  ballImg.src = 'Images/ball.png';

const friction = 0.99;
const maxVelocity = 100;

class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dragging = false;
        this.vx = 0;
        this.vy = 0;
        this.color = 'blue';
        this.img = ballImg;
      }
    
      draw() {
        ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
      }
    
    update() {
        if(!ball.dragging)
        {
            this.x += this.vx;
        this.y += this.vy;
    
        if (!this.dragging) {
          this.vx *= friction;
          this.vy *= friction;
    
          if (Math.abs(this.vx) < 0.01) this.vx = 0;
          if (Math.abs(this.vy) < 0.01) this.vy = 0;
        }
    
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.vx = -this.vx;
        }
    
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.vy = -this.vy;
        }
        }
        
      }
}

const ball = new Ball(canvas.width / 2, canvas.height / 2, 50);
let pointer = {
  x: undefined,
  y: undefined,
};

let particles = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
// Draw background with deformation around the ball
const gradient = ctx.createRadialGradient(
    ball.x, ball.y, 50,
    ball.x, ball.y, canvas.width / 2
  );
  gradient.addColorStop(0, 'rgba(0, 0, 255, 0.1)');
  gradient.addColorStop(1, 'rgba(195, 195, 255, 0.8)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width*2, canvas.height*2);

  ball.update();
  ball.draw();

  // Draw particles
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();

    if (particle.size <= 0.1) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

function startDrag(e) {
  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;
  const dx = x - ball.x;
  const dy = y - ball.y;

  if (Math.sqrt(dx * dx + dy * dy) <= ball.radius) {
    ball.dragging = true;
    pointer.x = x;
    pointer.y = y;
  }
}

function drag(e) {
  if (!ball.dragging) return;

  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;
  const newVx = x - pointer.x;
  const newVy = y - pointer.y;

  ball.vx = Math.abs(newVx) > maxVelocity ? maxVelocity * Math.sign(newVx) : newVx;
  ball.vy = Math.abs(newVy) > maxVelocity ? maxVelocity * Math.sign(newVy) : newVy;
  ball.x = x;
  ball.y = y;
  pointer.x = x;
  pointer.y = y;
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(ball.x, ball.y));
  }
}

function endDrag() {
  ball.dragging = false;
}

// Mouse event listeners
canvas.addEventListener('mousedown', startDrag);
canvas.addEventListener('mousemove', drag);
canvas.addEventListener('mouseup', endDrag);

// Touch event listeners
canvas.addEventListener('touchstart', startDrag);
canvas.addEventListener('touchmove', drag);
canvas.addEventListener('touchend', endDrag);

animate();