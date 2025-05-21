const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numParticles = 300;
const maxConnectionDistance = 100; // Maximum distance for particles to be connected
const mouseRepelDistance = 30; // Distance from mouse to repel particles

let mouseX = 0;
let mouseY = 0;

// Generate random particles
const particles = [];
for (let i = 0; i < numParticles; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: Math.random() * .60 - .30, // Random velocity in x direction
        dy: Math.random() * .60 - .30, // Random velocity in y direction
        color: '#f5f5f5'
    });
}

// Function to update mouse position
function updateMousePosition(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

// Function to draw particles and connections
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        ctx.fillStyle = p1.color;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < maxConnectionDistance) {
                ctx.strokeStyle = `rgba(245, 245, 245, ${(maxConnectionDistance - distance) / maxConnectionDistance})`; // Adjust opacity based on distance
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }

        // Repel from mouse when it gets near
        const dxMouse = p1.x - mouseX;
        const dyMouse = p1.y - mouseY;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distanceMouse < mouseRepelDistance) {
            const angle = Math.atan2(dyMouse, dxMouse);
            p1.dx += Math.cos(angle) * 0.1;
            p1.dy += Math.sin(angle) * 0.1;
        }
    }
}

// Update particle positions and redraw
function update() {
    for (let particle of particles) {
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Bounce off walls
        if (particle.x < 0) {
            particle.x = 0;
            particle.dx *= -1;
        } else if (particle.x > canvas.width) {
            particle.x = canvas.width;
            particle.dx *= -1;
        }
        
        if (particle.y < 0) {
            particle.y = 0;
            particle.dy *= -1;
        } else if (particle.y > canvas.height) {
            particle.y = canvas.height;
            particle.dy *= -1;
        }
    }
}

// Animation loop
function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

// Start animation
animate();

// Event listener to update mouse position
window.addEventListener('mousemove', updateMousePosition);