// 🔠 Typewriter effect
document.addEventListener("DOMContentLoaded", () => {
    const el = document.querySelector(".typewriter");
    const text = el.getAttribute("data-text");
    let index = 0;
    const speed = 80;

    function type() {
        if (index < text.length) {
            el.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
});

// 🌐 Neon grid background
const canvas = document.getElementById("grid-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const spacing = 40;
    ctx.strokeStyle = "#00fff733";
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}
setInterval(drawGrid, 100);
