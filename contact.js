const topNav = document.getElementById('topNav');
const scrollToggle = document.getElementById('scrollToggle');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');

// 1. Scroll Detection
window.addEventListener('scroll', () => {
    if (window.innerWidth > 1024) {
        if (window.scrollY > 80) {
            topNav.classList.add('hidden');
            scrollToggle.classList.add('visible');
        } else {
            topNav.classList.remove('hidden');
            scrollToggle.classList.remove('visible');
            sideMenu.classList.remove('open');
        }
    }
});

// 2. Open Sidebar
scrollToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sideMenu.classList.add('open');
});

// 3. Close Sidebar
closeMenu.addEventListener('click', () => {
    sideMenu.classList.remove('open');
});

// 4. Close on outside click
document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && !scrollToggle.contains(e.target)) {
        sideMenu.classList.remove('open');
    }
});


    lucide.createIcons();
    
    // Intersection Observer for Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up, .slide-left').forEach(el => observer.observe(el));


// =======================
// footer
// =======================

// Footer links var click kelyas smooth scroll effect (optional)
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        console.log("Navigating to: " + this.innerText);
        // Tumhi yethhe analytics kiwa transition logic l़avu shakta
    });
});

// Reveal Animation (Footer scroll kelyavar halke yeil)
window.addEventListener('scroll', () => {
    const footer = document.querySelector('.main-footer');
    const scrollPosition = window.scrollY + window.innerHeight;
    
    if (scrollPosition > footer.offsetTop) {
        footer.style.opacity = "1";
        footer.style.transition = "opacity 1s ease-in";
    }
});