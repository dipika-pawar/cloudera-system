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


// =======================
// servives banner
// =======================

// A) List of Professional IT Quotes to loop through
const quotesList = [
    { text: "Empowering Modern Visions<br>with Future-Ready <span class='cloudera-srv-highlight'>Solutions.</span>", glitch: "Empowering Modern Visions with Future-Ready Solutions." },
    { text: "Where Innovation Meets Execution:<br>Shaping the <span class='cloudera-srv-highlight'>Digital Era.</span>", glitch: "Where Innovation Meets Execution: Shaping the Digital Era." },
    { text: "Transforming Complexity into<br>Seamless Digital <span class='cloudera-srv-highlight'>Excellence.</span>", glitch: "Transforming Complexity into Seamless Digital Excellence." }
];

const quoteElement = document.querySelector('.cloudera-srv-quote');
let currentQuoteIndex = 0;

// B) Function to Change Quotes with Animation
function changeQuote() {
    gsap.timeline()
        .to(quoteElement, { 
            opacity: 0, 
            y: -20, 
            filter: "blur(5px)", 
            duration: 0.8, 
            ease: "power2.in" 
        })
        .set(quoteElement, { 
            innerHTML: quotesList[currentQuoteIndex].text,
            attr: { 'data-glitch': quotesList[currentQuoteIndex].glitch }
        })
        .to(quoteElement, { 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)", 
            duration: 1, 
            ease: "power3.out" 
        });

    currentQuoteIndex = (currentQuoteIndex + 1) % quotesList.length;
}

// C) Setup Quotes Loop and Main Icon Floating
window.addEventListener('load', () => {
    // Start looping through quotes every 6 seconds
    setInterval(changeQuote, 6000);

    // D) Initial Entrance Animation
    gsap.from(".cloudera-srv-main-icon", {
        scale: 0,
        opacity: 0,
        delay: 0.3,
        duration: 1.2,
        ease: "back.out(1.7)"
    });
});

// E) Mouse Move 3D Tilt Effect on Desktop
const srvBanner = document.getElementById('srv-banner');
const srvContent = document.querySelector('.cloudera-srv-content');

if (srvBanner && srvContent) {
    srvBanner.addEventListener('mousemove', (e) => {
        // Only active on larger screens
        if (window.innerWidth > 1024) {
            let xAxis = (window.innerWidth / 2 - e.pageX) / 30; // Tilt intensity
            let yAxis = (window.innerHeight / 2 - e.pageY) / 30; // Tilt intensity
            
            gsap.to(srvContent, {
                rotateY: xAxis,
                rotateX: -yAxis,
                duration: 0.6,
                ease: "power2.out"
            });
        }
    });
}


// =======================
// Web Development
// =======================

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

const container = document.getElementById('three-canvas-container');
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Color matched to logo (Purple/Magenta)
const geometry = new THREE.PlaneGeometry(15, 15, 60, 60);
const material = new THREE.MeshPhongMaterial({
    color: 0x8a2be2, // Logo Purple
    wireframe: true,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.35
});

const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2.2;
scene.add(plane);

// Add a glowing point light to match logo magenta
const pLight = new THREE.PointLight(0xbc2ab7, 2, 50);
pLight.position.set(0, 5, 5);
scene.add(pLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

camera.position.z = 6;

function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.0008;
    
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Smoother liquid flow
        const z = Math.sin(x * 0.4 + time) * Math.cos(y * 0.4 + time) * 1.2;
        pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    plane.rotation.z += 0.001;

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

animate();


// =======================
// Software Development
// =======================

const s_scene = new THREE.Scene();
const s_camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const s_renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

const s_container = document.getElementById('software-canvas-container');
s_renderer.setSize(s_container.clientWidth, s_container.clientHeight);
s_container.appendChild(s_renderer.domElement);

// Create Particle Trails (Data Flow)
const particlesCount = 150;
const positions = new Float32Array(particlesCount * 3);
const speeds = new Float32Array(particlesCount);

for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10; // X
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5; // Z
    speeds[i] = Math.random() * 0.02 + 0.01;
}

const s_geometry = new THREE.BufferGeometry();
s_geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const s_material = new THREE.PointsMaterial({
    color: 0xbc2ab7, // Magenta Flow
    size: 0.1,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particleSystem = new THREE.Points(s_geometry, s_material);
s_scene.add(particleSystem);

// Adding Circuit Lines (Grid)
const grid = new THREE.GridHelper(10, 20, 0x8a2be2, 0x222222);
grid.rotation.x = Math.PI / 2;
grid.position.z = -2;
s_scene.add(grid);

s_camera.position.z = 5;

function animateSoftware() {
    requestAnimationFrame(animateSoftware);
    
    const positions = s_geometry.attributes.position.array;
    for (let i = 0; i < particlesCount; i++) {
        // Move particles along X axis to simulate flow
        positions[i * 3] += speeds[i];
        
        // Reset if they go off screen
        if (positions[i * 3] > 5) {
            positions[i * 3] = -5;
        }
    }
    s_geometry.attributes.position.needsUpdate = true;
    
    particleSystem.rotation.z += 0.001;
    s_renderer.render(s_scene, s_camera);
}

window.addEventListener('resize', () => {
    s_camera.aspect = s_container.clientWidth / s_container.clientHeight;
    s_camera.updateProjectionMatrix();
    s_renderer.setSize(s_container.clientWidth, s_container.clientHeight);
});

animateSoftware();


// =======================
// Cloud Solutions
// =======================

const c_scene = new THREE.Scene();
const c_camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const c_renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

const c_container = document.getElementById('cloud-canvas-container');
c_renderer.setSize(c_container.clientWidth, c_container.clientHeight);
c_container.appendChild(c_renderer.domElement);

// Create Light Streams (Morphing Effect)
const streamCount = 40;
const streamPoints = [];

for (let i = 0; i < streamCount; i++) {
    const geometry = new THREE.CylinderGeometry(0.02, 0.02, 2, 8);
    const material = new THREE.MeshBasicMaterial({
        color: 0x8a2be2, // Purple Stream
        transparent: true,
        opacity: Math.random() * 0.5 + 0.2
    });
    
    const stream = new THREE.Mesh(geometry, material);
    
    // Initial position at bottom (Server)
    stream.position.set(
        (Math.random() - 0.5) * 4,
        -5, 
        (Math.random() - 0.5) * 2
    );
    
    c_scene.add(stream);
    streamPoints.push({
        mesh: stream,
        speed: Math.random() * 0.05 + 0.02
    });
}

// Background Cloud Particles
const p_geo = new THREE.IcosahedronGeometry(0.5, 2);
const p_mat = new THREE.MeshPhongMaterial({ color: 0xbc2ab7, wireframe: true });

for(let j=0; j<15; j++){
    const p = new THREE.Mesh(p_geo, p_mat);
    p.position.set((Math.random()-0.5)*8, (Math.random()*3), (Math.random()-0.5)*4);
    c_scene.add(p);
}

const c_light = new THREE.PointLight(0xffffff, 1, 100);
c_light.position.set(0, 5, 5);
c_scene.add(c_light);

c_camera.position.z = 8;

function animateCloud() {
    requestAnimationFrame(animateCloud);
    
    streamPoints.forEach(s => {
        // Move streams upward from server to cloud
        s.mesh.position.y += s.speed;
        s.mesh.rotation.y += 0.01;
        
        // Reset to bottom once it reaches the cloud level
        if (s.mesh.position.y > 2) {
            s.mesh.position.y = -4;
            s.mesh.position.x = (Math.random() - 0.5) * 4;
        }
    });

    c_renderer.render(c_scene, c_camera);
}

window.addEventListener('resize', () => {
    c_camera.aspect = c_container.clientWidth / c_container.clientHeight;
    c_camera.updateProjectionMatrix();
    c_renderer.setSize(c_container.clientWidth, c_container.clientHeight);
});

animateCloud();


// ==============================
// API Development & Integration
// ==============================

(function() {
    const u_scene = new THREE.Scene();
    const u_camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const u_renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    const u_container = document.getElementById('unique-api-canvas-container');
    if(!u_container) return;

    u_renderer.setSize(u_container.clientWidth, u_container.clientHeight);
    u_container.appendChild(u_renderer.domElement);

    // Neural Connectors
    const u_group = new THREE.Group();
    for(let i=0; i<10; i++) {
        const u_curve = new THREE.CubicBezierCurve3(
            new THREE.Vector3(-5, (Math.random()-0.5)*5, 0),
            new THREE.Vector3(-1, 3, 2),
            new THREE.Vector3(1, -3, -2),
            new THREE.Vector3(5, (Math.random()-0.5)*5, 0)
        );
        const u_points = u_curve.getPoints(50);
        const u_geo = new THREE.BufferGeometry().setFromPoints(u_points);
        const u_mat = new THREE.LineBasicMaterial({ color: 0x8a2be2, transparent: true, opacity: 0.3 });
        u_group.add(new THREE.Line(u_geo, u_mat));
    }
    u_scene.add(u_group);

    // Energy Pulse
    const p_geo = new THREE.SphereGeometry(0.12, 12, 12);
    const p_mat = new THREE.MeshBasicMaterial({ color: 0xbc2ab7 });
    const u_pulse = new THREE.Mesh(p_geo, p_mat);
    u_scene.add(u_pulse);

    u_camera.position.z = 7;
    let u_time = 0;

    function u_animate() {
        requestAnimationFrame(u_animate);
        u_time += 0.005;
        
        // Pulse movement
        u_pulse.position.x = Math.sin(u_time * 5) * 4;
        u_pulse.position.y = Math.cos(u_time * 3) * 1.5;
        u_pulse.position.z = Math.sin(u_time * 2) * 1;
        
        u_group.rotation.y += 0.003;
        u_renderer.render(u_scene, u_camera);
    }

    window.addEventListener('resize', () => {
        u_camera.aspect = u_container.clientWidth / u_container.clientHeight;
        u_camera.updateProjectionMatrix();
        u_renderer.setSize(u_container.clientWidth, u_container.clientHeight);
    });

    u_animate();
})();


// =======================
// UI/UX Design
// =======================

(function() {
    const ux_box = document.getElementById('ce-ux-tilt-box');
    const ux_stack = ux_box.querySelector('.ce-ux-stack');

    ux_box.addEventListener('mousemove', (e) => {
        const rect = ux_box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        ux_stack.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    ux_box.addEventListener('mouseleave', () => {
        ux_stack.style.transition = "transform 0.6s ease";
        ux_stack.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });

    ux_box.addEventListener('mouseenter', () => {
        ux_stack.style.transition = "transform 0.1s ease";
    });
})();


// ========================
// IT Consulting
// ========================

(function() {
    const it_compass = document.querySelector('.it-compass-overlay');
    const it_section = document.querySelector('.it-unique-wrapper');

    window.addEventListener('scroll', () => {
        const it_top = it_section.getBoundingClientRect().top;
        const it_height = window.innerHeight;

        if (it_top < it_height && it_top > -it_height) {
            // Rotate compass based on scroll position
            const rotation = window.scrollY / 5;
            it_compass.style.transform = `rotate(${rotation}deg)`;
        }
    });

    // Mouse Interaction for Floating Icons
    it_section.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;
        
        document.querySelectorAll('.it-float-icon').forEach(icon => {
            icon.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
})();


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