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

// 🔌 Terminal interaction
const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output");

terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const input = terminalInput.value.trim();
        const response = `> ${input}\n${processCommand(input)}`;
        terminalOutput.innerText += response + "\n";
        terminalInput.value = "";
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

function processCommand(cmd) {
    switch (cmd.toLowerCase()) {
        case "help":
            return "Commands: help, about, clear";
        case "about":
            return "-- ANDxCRO Interface v1.0 – Cyberpunk UX Framework -- \n-- More commands will be added in the future --";
        case "clear":
            terminalOutput.innerText = "";
            return "";
        default:
            return `Command not found: ${cmd} \n type \"help\" for a guide`;
    }
}

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
