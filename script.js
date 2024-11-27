const canvas = document.getElementById('appleCanvas');
const ctx = canvas.getContext('2d');

// Resize the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Apple image
const appleImage = new Image();
appleImage.src = 'apple.png'; // Ensure this file exists

// Debugging: Log messages for image loading
appleImage.onload = () => {
  console.log("Apple image loaded successfully.");
  animate();
};
appleImage.onerror = () => {
  console.error("Failed to load apple image. Using fallback circle.");
  animate();
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
    if (appleImage.complete && appleImage.naturalHeight > 0) {
      // Draw the image if loaded
      ctx.drawImage(appleImage, this.x, this.y, this.size, this.size);
    } else {
      // Fallback: Draw a red circle
      ctx.beginPath();
      ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    }
 
