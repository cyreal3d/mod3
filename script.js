
const canvas = document.getElementById('appleCanvas');
const ctx = canvas.getContext('2d');

// Resize the canvas to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Apple image
const appleImage = new Image();
appleImage.src = 'apple.png'; // Ensure apple.png is in the same folder as this script

// Apple class to manage bouncing logic
class Apple {
  constructor(x, y, size, dx, dy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.dx = dx;
    this.dy = dy;
 draw() {
  ctx.beginPath();
  ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

  update() {
    this.x += this.dx;
    this.y += this.dy;

    // Bounce off the edges of the screen
    if (this.x + this.size > canvas.width || this.x < 0) {
      this.dx *= -1;
    }
    if (this.y + this.size > canvas.height || this.y < 0) {
      this.dy *= -1;
    }

    this.draw();
  }
}

// Create multiple apples
const apples = [];
for (let i = 0; i < 10; i++) {
  const size = 50;
  const x = Math.random() * (canvas.width - size);
  const y = Math.random() * (canvas.height - size);
  const dx = (Math.random() - 0.5) * 5;
  const dy = (Math.random() - 0.5) * 5;
  apples.push(new Apple(x, y, size, dx, dy));
}

// Animate the apples
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  apples.forEach(apple => apple.update());
  requestAnimationFrame(animate);
}

// Start the animation once the image loads
appleImage.onload = () => {
  animate();
};
