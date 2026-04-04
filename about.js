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


// =========================
//     about-hero
// ========================= 

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create Star/Data Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);

for(let i=0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material with Logo Colors
const material = new THREE.PointsMaterial({
    size: 0.005,
    color: '#a03cbf',
    transparent: true
});

const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

camera.position.z = 2;

// Mouse Movement Parallax Effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function animate() {
    requestAnimationFrame(animate);
    
    // Smooth Rotation
    particlesMesh.rotation.y += 0.001;
    
    // Parallax Logic: Particles mouse chya opposite move hotat
    if (mouseX > 0) {
        particlesMesh.rotation.x = -mouseY * 0.00005;
        particlesMesh.rotation.y = -mouseX * 0.00005;
    }
    
    renderer.render(scene, camera);
}

animate();

// Handle Window Resize (Responsive)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// GSAP Content Reveal
gsap.from(".hero-content > *", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    stagger: 0.3,
    ease: "power4.out"
});


// =========================
//     story-section
// =========================

// CloudEra 3D Vision Sphere Logic
const visionScene = new THREE.Scene();
const visionContainer = document.getElementById('vision-sphere-container');

const visionCamera = new THREE.PerspectiveCamera(75, visionContainer.clientWidth / visionContainer.clientHeight, 0.1, 1000);
const visionRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

visionRenderer.setSize(visionContainer.clientWidth, visionContainer.clientHeight);
visionContainer.appendChild(visionRenderer.domElement);

// 1. Geometry with Deform Logic (Wireframe Sphere)
const sphereGeo = new THREE.IcosahedronGeometry(2, 20); // 20 segments for smoothness
const sphereMat = new THREE.MeshPhongMaterial({
    color: 0x2b74ed,
    emissive: 0xa03cbf,
    wireframe: true,
    shininess: 100
});

const visionSphere = new THREE.Mesh(sphereGeo, sphereMat);
visionScene.add(visionSphere);

// 2. Lighting for 3D Depth
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(5, 5, 5);
visionScene.add(topLight);
visionScene.add(new THREE.AmbientLight(0x404040));

visionCamera.position.z = 5;

// Mouse tracking for "Liquid" Deformation
let pointerX = 0, pointerY = 0;
document.addEventListener('mousemove', (e) => {
    pointerX = (e.clientX - window.innerWidth / 2) * 0.0005;
    pointerY = (e.clientY - window.innerHeight / 2) * 0.0005;
});

// Animation Loop
function animateVision() {
    requestAnimationFrame(animateVision);
    
    // Smooth Rotation
    visionSphere.rotation.y += 0.003;
    
    // Liquid Deformation Effect (Based on Pointer)
    visionSphere.rotation.x += pointerY * 2;
    visionSphere.rotation.y += pointerX * 2;
    
    // Subtle Pulse Animation
    const time = Date.now() * 0.001;
    visionSphere.scale.set(
        1 + Math.sin(time) * 0.05,
        1 + Math.cos(time) * 0.05,
        1 + Math.sin(time) * 0.05
    );

    visionRenderer.render(visionScene, visionCamera);
}

// Mobile Responsive Fix
window.addEventListener('resize', () => {
    const w = visionContainer.clientWidth;
    const h = visionContainer.clientHeight;
    visionRenderer.setSize(w, h);
    visionCamera.aspect = w / h;
    visionCamera.updateProjectionMatrix();
});

animateVision();


// =========================
//     mission-vision
// =========================

// 1. Cyber Mesh Background (Three.js)
const meshScene = new THREE.Scene();
const meshContainer = document.getElementById('cyber-mesh-container');
const meshCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const meshRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

meshRenderer.setSize(window.innerWidth, window.innerHeight);
meshContainer.appendChild(meshRenderer.domElement);

const meshGeometry = new THREE.PlaneGeometry(20, 20, 40, 40);
const meshMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x2b74ed, 
    wireframe: true, 
    transparent: true, 
    opacity: 0.2 
});

const cyberMesh = new THREE.Mesh(meshGeometry, meshMaterial);
cyberMesh.rotation.x = -Math.PI / 2.5;
meshScene.add(cyberMesh);
meshCamera.position.z = 5;

// Mouse Interaction for Wave Effect
let meshMouseX = 0, meshMouseY = 0;
document.addEventListener('mousemove', (e) => {
    meshMouseX = (e.clientX - window.innerWidth / 2) * 0.001;
    meshMouseY = (e.clientY - window.innerHeight / 2) * 0.001;
});

function animateMesh() {
    requestAnimationFrame(animateMesh);
    
    // Wave animation based on time
    const time = Date.now() * 0.001;
    cyberMesh.geometry.vertices.forEach((v, i) => {
        v.z = Math.sin(v.x + time) * 0.2 + Math.cos(v.y + time) * 0.2;
    });
    cyberMesh.geometry.verticesNeedUpdate = true;

    cyberMesh.rotation.z += 0.001;
    cyberMesh.position.x += (meshMouseX - cyberMesh.position.x) * 0.05;
    
    meshRenderer.render(meshScene, meshCamera);
}
animateMesh();

// 2. Scroll-Triggered Reveal (GSAP)
gsap.registerPlugin(ScrollTrigger);

// Mission Box Slide from Left
gsap.from(".mission-box", {
    scrollTrigger: {
        trigger: ".mv-premium-section",
        start: "top 70%",
    },
    x: -200,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

// Vision Box Slide from Right
gsap.from(".vision-box", {
    scrollTrigger: {
        trigger: ".mv-premium-section",
        start: "top 70%",
    },
    x: 200,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

// ========================
//     core-values
// ========================

// 1. Scroll-Triggered Pop-up Animation (GSAP)
gsap.registerPlugin(ScrollTrigger);

gsap.from(".value-card", {
    scrollTrigger: {
        trigger: ".values-grid",
        start: "top 80%",
    },
    y: 100,
    opacity: 0,
    scale: 0.8,
    duration: 1,
    stagger: 0.2, // Ekameka pathun pop-up honyasathi
    ease: "back.out(1.7)" // Bounce effect
});

// 2. 3D Tilt Initialization
VanillaTilt.init(document.querySelectorAll(".value-card"), {
    max: 20,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});


//  ========================
//     why-choose
//     ========================

// GSAP Reveal Animation
gsap.registerPlugin(ScrollTrigger);

// Cards slide-in from right
gsap.from(".wc-card", {
    scrollTrigger: {
        trigger: ".wc-cards-grid",
        start: "top 80%",
    },
    x: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out"
});

// Content slide-in from left
gsap.from(".wc-content-box", {
    scrollTrigger: {
        trigger: ".wc-content-box",
        start: "top 80%",
    },
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
});

// Tilt Initialization
VanillaTilt.init(document.querySelectorAll(".wc-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});


//  ========================
//     founder
//  ========================

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Main Heading Animation
gsap.from(".cloudera-ce-main-header", {
    scrollTrigger: ".cloudera-ce-founder-wrapper",
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
});

// Left Content Reveal
gsap.from(".cloudera-ce-bio-content", {
    scrollTrigger: ".cloudera-ce-flex-container",
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

// Right Photo Card Reveal
gsap.from(".cloudera-ce-visual-wrap", {
    scrollTrigger: ".cloudera-ce-flex-container",
    x: 100,
    opacity: 0,
    duration: 1.2,
    delay: 0.2,
    ease: "power3.out"
});

// Initialize 3D Tilt
VanillaTilt.init(document.querySelector(".cloudera-ce-photo-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
});


// ========================
//     Company Achievements
// ======================== 

gsap.registerPlugin(ScrollTrigger);

// 1. Line Path Animation
gsap.from(".cloudera-cn-path", {
    strokeDashoffset: 1000,
    strokeDasharray: 1000,
    duration: 3,
    ease: "power2.inOut",
    scrollTrigger: {
        trigger: ".cloudera-cn-section",
        start: "top 70%",
    }
});

// 2. Nodes Entrance (Staggered)
gsap.from(".cloudera-cn-node", {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".cloudera-cn-nodes-container",
        start: "top 80%",
    }
});

// 3. Counter Animation with Blur Finish
const cnNumbers = document.querySelectorAll('.cloudera-cn-num');

cnNumbers.forEach(num => {
    const target = +num.getAttribute('data-target');
    
    gsap.to(num, {
        innerText: target,
        duration: 2.5,
        snap: { innerText: 1 },
        scrollTrigger: {
            trigger: num,
            start: "top 90%",
        },
        onUpdate: function() {
            num.innerHTML = Math.ceil(num.innerText) + "+";
        }
    });
});

// 4. Tilt Init for Desktop
if (window.innerWidth > 1024) {
    VanillaTilt.init(document.querySelectorAll(".cloudera-cn-node"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2
    });
}


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