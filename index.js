/* ==========================================
   1. NAVIGATION & SIDEBAR LOGIC
   ========================================== */
const topNav = document.getElementById('topNav');
const scrollToggle = document.getElementById('scrollToggle');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');

function handleNavbar() {
    const isDesktop = window.innerWidth > 1024;

    if (isDesktop) {
        if (window.scrollY > 80) {
            topNav.classList.add('hidden');
            scrollToggle.classList.add('visible');
        } else {
            topNav.classList.remove('hidden');
            scrollToggle.classList.remove('visible');
            sideMenu.classList.remove('open');
        }
    } else {
        topNav.classList.add('hidden');
        scrollToggle.classList.add('visible');
    }
}

window.addEventListener('scroll', handleNavbar);
window.addEventListener('resize', handleNavbar);
window.addEventListener('load', handleNavbar);

scrollToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sideMenu.classList.add('open');
});

closeMenu.addEventListener('click', () => {
    sideMenu.classList.remove('open');
});

document.addEventListener('click', (e) => {
    if (sideMenu.classList.contains('open')) {
        if (!sideMenu.contains(e.target) && !scrollToggle.contains(e.target)) {
            sideMenu.classList.remove('open');
        }
    }
});

/* ==========================================
   2. ACTIVE LINK LOGIC
   ========================================== */
function setActiveLink() {
    const currentLocation = window.location.pathname.split("/").pop();
    const allLinks = document.querySelectorAll('.desktop-links a, .drawer-links a');

    allLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('active');
        if (currentLocation === linkHref || (currentLocation === "" && linkHref === "index.html")) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('DOMContentLoaded', setActiveLink);

/* ==========================================
   3. HERO SECTION (Typed.js & Magnetic)
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.querySelector(".typing-text");
    if (typingText) {
        new Typed(".typing-text", {
            strings: [
                "Innovative IT Solutions<br> for Your Business",
                "Revolutionize Your Digital Future",
                "Accelerate with Smart IT Architectures",
            ],
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: "|",
        });
    }
});

// Magnetic Pull Helper
function magneticPull(e, wrap, button) {
    const position = wrap.getBoundingClientRect();
    const x = e.pageX - position.left - position.width / 2;
    const y = e.pageY - position.top - position.height / 2;
    button.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    button.style.scale = "1.05";
}

const wraps = [document.querySelector(".primary-wrap"), document.querySelector(".secondary-wrap")];
wraps.forEach(wrap => {
    if (wrap) {
        const btn = wrap.querySelector('.btn');
        wrap.addEventListener("mousemove", (e) => magneticPull(e, wrap, btn));
        wrap.addEventListener("mouseleave", () => {
            btn.style.transform = `translate(0px, 0px)`;
            btn.style.scale = "1";
        });
    }
});

/* ==========================================
   4. 3D NEON GRID BACKGROUND
   ========================================== */
const canvas = document.getElementById("grid-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let gridCells = [];
    const gridSize = 60;
    let mouseX = 0, mouseY = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            mouseX = e.clientX / window.innerWidth - 0.5;
            mouseY = e.clientY / window.innerHeight - 0.5;
        }
    });

    class Cell {
        constructor(x, y) { this.x = x; this.y = y; }
        draw() {
            ctx.strokeStyle = 'rgba(142, 45, 226, 0.1)'; // Neon Purple
            ctx.lineWidth = 0.5;
            let pX = this.x - mouseX * gridSize * 0.5;
            let pY = this.y - mouseY * gridSize * 0.5;
            ctx.strokeRect(pX, pY, gridSize, gridSize);
        }
    }

    function initGrid() {
        gridCells = [];
        for (let i = 0; i < Math.ceil(canvas.width / gridSize) + 1; i++) {
            for (let j = 0; j < Math.ceil(canvas.height / gridSize) + 1; j++) {
                gridCells.push(new Cell(i * gridSize, j * gridSize));
            }
        }
    }

    function animateGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gridCells.forEach(cell => cell.draw());
        requestAnimationFrame(animateGrid);
    }

    initGrid();
    animateGrid();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        initGrid();
    });
}

/* ==========================================
   5. ABOUT SECTION (Scroll Reveal)
   ========================================== */
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.animate-left, .animate-right').forEach(el => {
    aboutObserver.observe(el);
});

/* ==========================================
   6. SERVICES & TECH (AOS & VanillaTilt)
   ========================================== */
AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-quad'
});

if (window.innerWidth > 768) {
    VanillaTilt.init(document.querySelectorAll(".service-item, .tech-card"), {
        max: 12,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}




/* ==========================================
   7. FOOTER LOGIC
   ========================================== */
window.addEventListener('scroll', () => {
    const footer = document.querySelector('.main-footer');
    if(footer && (window.scrollY + window.innerHeight > footer.offsetTop)) {
        footer.style.opacity = "1";
    }
});



// Bento Tilt Effect
const bentoCards = document.querySelectorAll('.bento-card');

bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // Add spotlight following cursor
        const inner = card.querySelector('.bento-inner');
        inner.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(129, 49, 141, 0.1) 0%, #0f0f0f 80%)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.querySelector('.bento-inner').style.background = '#0f0f0f';
    });
});


