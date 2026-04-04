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

// project filter

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.control-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle Active State
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                    // Small delay to trigger CSS transition
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    // Match the 0.6s CSS transition before hiding
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 500); 
                }
            });
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.approach-step');

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    steps.forEach(step => {
        // Initial state
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'all 0.6s ease-out';
        observer.observe(step);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const techCards = document.querySelectorAll('.tech-card');

    techCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const icon = card.querySelector('.tech-icon');
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Subtle icon movement following the mouse
            icon.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.tech-icon');
            icon.style.transform = `translate(0, 0)`;
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const whyCards = document.querySelectorAll('.why-card');

    whyCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) translateY(0) rotateX(0) rotateY(0)`;
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.magnetic-btn');
    const box = document.querySelector('.cta-glass-box');

    box.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        
        // Calculate center of the button
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;

        // Calculate distance from mouse to center
        const diffX = e.clientX - btnX;
        const diffY = e.clientY - btnY;

        // If mouse is within 200px, pull the button
        if (Math.abs(diffX) < 200 && Math.abs(diffY) < 200) {
            btn.style.transform = `translate(${diffX * 0.2}px, ${diffY * 0.2}px)`;
        }
    });

    box.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0, 0)`;
    });
});


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