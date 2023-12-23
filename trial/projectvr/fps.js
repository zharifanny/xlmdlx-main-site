// Hide the mouse cursor
document.body.style.cursor = 'none';

// Track mouse movement
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// FPS-like movement
const sensitivity = 0.1; // Adjust sensitivity as needed
let x = 0;
let y = 0;

function update() {
  const dx = mouseX - window.innerWidth / 2;
  const dy = mouseY - window.innerHeight / 2;

  x += dx * sensitivity;
  y += dy * sensitivity;

  // Limit y-axis rotation
  y = Math.max(-90, Math.min(90, y));

  // Apply transformation to simulate FPS-like movement
  document.body.style.transform = `rotateX(${-y}deg) rotateY(${-x}deg)`;

  // Reset mouse position to the center
  mouseX = window.innerWidth / 2;
  mouseY = window.innerHeight / 2;

  requestAnimationFrame(update);
}

update();
