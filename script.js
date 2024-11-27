const canvas = document.getElementById('appleCanvas');
const ctx = canvas.getContext('2d');

// Resize the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Apple image
const appleImage = new Image();
appleImage.src = 'apple.png'; // Ensure the file is named correctly and in the same folder

appleImage.onerror = () => {
  console.error("Failed to load apple.png. Ensure the file exists.");
};

// Apple class
class Apple {
  constructor(x, y, size, dx, dy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.dx = dx;
    this.dy = dy;
  }

  draw() {
    if (appleImage.complete && appleImage.naturalHeight !== 0) {
      ctx.drawImage(appleImage, this.x, this.y, this.size, this.size);
    } else {
      // Fallback to a red circle
      ctx.beginPath();
      ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    }
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    // Bounce logic
    if (this.x + this.size > canvas.width || this.x < 0) this.dx *= -1;
    if (this.y + this.size > canvas.height || this.y < 0) this.dy *= -1;

    this.draw();
  }
}

// Create apples
const apples = [];
for (let i = 0; i < 10; i++) {
  const size = 50;
  const x = Math.random() * (canvas.width - size);
  const y = Math.random() * (canvas.height - size);
  const dx = (Math.random() - 0.5) * 5;
  const dy = (Math.random() - 0.5) * 5;
  apples.push(new Apple(x, y, size, dx, dy));
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  apples.forEach(apple => apple.update());
  requestAnimationFrame(animate);
}

// Start the animation
appleImage.onload = animate;
