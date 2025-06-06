const postsPerPage = 2; // quanti post mostrare per pagina
let currentPage = 1;
let posts = [];

async function loadPosts() {
    const res = await fetch('../posts/posts.json');
    posts = await res.json();
    displayPosts();
    setupPagination();
}

function displayPosts() {
    const container = document.getElementById('blog-posts');
    container.innerHTML = '';

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    pagePosts.forEach((post, idx) => {
        const article = document.createElement('article');
        article.className = 'card post';
        article.innerHTML = `
      <h2 class="post-title" style="cursor:pointer">${post.title}</h2>
      <p class="post-date">Pubblicato il ${new Date(post.date).toLocaleDateString('it-IT')}</p>
      <p>${post.summary}</p>
      <button class="read-more">Leggi tutto</button>
      <div class="full-content" style="display:none; margin-top: 1rem;">${post.content}</div>
    `;
        container.appendChild(article);

        // Gestione click su titolo e bottone "Leggi tutto"
        const titleEl = article.querySelector('.post-title');
        const btn = article.querySelector('.read-more');
        const fullContent = article.querySelector('.full-content');

        function toggleContent() {
            const isVisible = fullContent.style.display === 'block';
            fullContent.style.display = isVisible ? 'none' : 'block';
            btn.textContent = isVisible ? 'Leggi tutto' : 'Chiudi';
        }

        titleEl.addEventListener('click', toggleContent);
        btn.addEventListener('click', toggleContent);
    });
}


function setupPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(posts.length / postsPerPage);
    const maxPagesToShow = 4;

    function createButton(page) {
        const btn = document.createElement('button');
        btn.textContent = page;
        btn.style.margin = '0 5px';
        btn.disabled = page === currentPage;
        btn.onclick = () => {
            currentPage = page;
            displayPosts();
            setupPagination();
            window.scrollTo(0, 0);
        };
        return btn;
    }

    if (totalPages <= maxPagesToShow + 2) {
        // Mostra tutte le pagine senza ...
        for (let i = 1; i <= totalPages; i++) {
            pagination.appendChild(createButton(i));
        }
    } else {
        // Mostra 1 sempre
        pagination.appendChild(createButton(1));

        let left = Math.max(2, currentPage - 1);
        let right = Math.min(totalPages - 1, currentPage + 1);

        if (left > 2) {
            // Inserisci "..."
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.margin = '0 5px';
            pagination.appendChild(dots);
        }

        for (let i = left; i <= right; i++) {
            pagination.appendChild(createButton(i));
        }

        if (right < totalPages - 1) {
            // Inserisci "..."
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.margin = '0 5px';
            pagination.appendChild(dots);
        }

        // Mostra ultima pagina sempre
        pagination.appendChild(createButton(totalPages));
    }
}

window.onload = loadPosts;

document.addEventListener("DOMContentLoaded", () => {
    // Typewriter effect
    const el = document.querySelector(".typewriter");
    if (el) {
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
    }

    // Terminal interaction
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");

    if (terminalInput && terminalOutput) {
        terminalInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const input = terminalInput.value.trim();
                const response = `> ${input}\n${processCommand(input)}`;
                terminalOutput.innerText += response + "\n";
                terminalInput.value = "";
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });
    }

    function processCommand(cmd) {
        switch (cmd.toLowerCase()) {
            case "help":
                return "Commands: help, about, clear";
            case "about":
                return "NEONNET Interface v1.0 – Cyberpunk UX Framework";
            case "clear":
                terminalOutput.innerText = "";
                return "";
            default:
                return `Command not found: ${cmd}`;
        }
    }

    // Neon grid background
    const canvas = document.getElementById("grid-bg");
    if (canvas) {
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
            ctx.lineWidth = 1;

            for (let x = 0; x < canvas.width; x += spacing) {
                ctx.strokeStyle = "#00ffff33";
                ctx.shadowColor = "#00ffff";
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += spacing) {
                ctx.strokeStyle = "#00ffff33";
                ctx.shadowColor = "#00ffff";
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        }
        // Disegna la griglia 30 fps
        function loop() {
            drawGrid();
            requestAnimationFrame(loop);
        }
        loop();
    }
});
