// ========================================
// Navigation Toggle (Mobile)
// ========================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ========================================
// Scroll Animation Observer
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section, .skill-category, .project-card, .org-card, .cert-card, ' +
        '.about-section .advantage-item, .about-section .tag, ' +
        '.experience-section .timeline-item, ' +
        '.about-section .about-card-basic, .about-section .about-card-advantages, ' +
        '.about-section .skill-card'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// Skill Bar Animation
// ========================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-fill, .skill-bar-fill');
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 300);
                barObserver.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        barObserver.observe(bar);
    });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Navigation Active State on Scroll
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ========================================
// Scroll Event Handler
// ========================================
let ticking = false;

// ========================================
// Background Blob — organic multi-frequency floating
// Mimics a real suspended object via multi-harmonic motion
// ========================================
const blob1 = document.querySelector('.bg-blob-1');
const blob2 = document.querySelector('.bg-blob-2');

let blobStartTime = null;

function animateBlobs(timestamp) {
    if (!blobStartTime) blobStartTime = timestamp;
    const t = (timestamp - blobStartTime) / 1000; // seconds

    const scrollY = window.scrollY;
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);

    // Blob 1 — warm white, larger, gentler drift
    if (blob1) {
        const driftX = 7 * Math.sin(scrollY * 0.0008);
        const driftY = -8 * (scrollY / maxScroll);
        // Multi-harmonic float: 4 frequencies → organic path
        const floatX =
            5.0 * Math.sin(t * 0.6) +
            3.0 * Math.sin(t * 1.1 + 0.7) +
            2.0 * Math.sin(t * 1.8 + 2.0) +
            1.5 * Math.sin(t * 2.5 + 0.3);
        const floatY =
            4.5 * Math.cos(t * 0.55) +
            3.5 * Math.cos(t * 0.95 + 1.5) +
            2.0 * Math.cos(t * 1.7 + 0.9) +
            1.5 * Math.cos(t * 2.3 + 3.1);
        blob1.style.transform = `translate(${driftX + floatX}%, ${driftY + floatY}%)`;
    }

    // Blob 2 — cool white, smaller, different phase for depth
    if (blob2) {
        const driftX = -6 * Math.cos(scrollY * 0.001);
        const driftY = -6 * (scrollY / maxScroll);
        const floatX =
            4.0 * Math.cos(t * 0.7) +
            2.5 * Math.cos(t * 1.15 - 1.0) +
            2.0 * Math.cos(t * 1.6 + 2.5) +
            1.0 * Math.cos(t * 2.2 + 1.2);
        const floatY =
            5.0 * Math.sin(t * 0.65) +
            3.0 * Math.sin(t * 1.05 + 0.5) +
            2.5 * Math.sin(t * 1.9 + 1.8) +
            1.5 * Math.sin(t * 2.8 + 0.6);
        blob2.style.transform = `translate(${driftX + floatX}%, ${driftY + floatY}%)`;
    }

    requestAnimationFrame(animateBlobs);
}

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
}

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Start background blob animation (independent rAF loop)
    if (blob1 || blob2) {
        requestAnimationFrame(animateBlobs);
    }

    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize skill bar animations
    animateSkillBars();
    
    // Listen for scroll events
    window.addEventListener('scroll', onScroll);
    
    // Initial check
    updateActiveNavLink();
});

// ========================================
// Keyboard Navigation Support
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});
