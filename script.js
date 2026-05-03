// ==================== CUSTOM CURSOR ====================
const cursorDot = document.getElementById('cursorDot');

document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

document.addEventListener('mouseenter', () => { cursorDot.style.opacity = '1'; });
document.addEventListener('mouseleave', () => { cursorDot.style.opacity = '0'; });

document.querySelectorAll('a, button, .skill-tag, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.width = '20px';
        cursorDot.style.height = '20px';
        cursorDot.style.opacity = '0.5';
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorDot.style.opacity = '1';
    });
});

// ==================== TYPING ANIMATION ====================
const phrases = [
    'Full-Stack Developer',
    'AI Systems Engineer',
    'Automation Builder',
    'CS Student @ MJCET'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
    }

    setTimeout(type, speed);
}

window.addEventListener('load', () => setTimeout(type, 800));

// ==================== NAVIGATION ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Navbar scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ESC closes mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ==================== ACTIVE SECTION HIGHLIGHT ====================
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== SCROLL REVEAL ====================
const fadeEls = document.querySelectorAll('.skill-category, .project-card, .contact-method, .about-text p, .stat-box');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    revealObserver.observe(el);
});

// ==================== TERMINAL LINE ANIMATION ====================
const terminalLines = document.querySelectorAll('.terminal-line');
terminalLines.forEach((line, i) => {
    line.style.opacity = '0';
    setTimeout(() => {
        line.style.transition = 'opacity 0.3s ease';
        line.style.opacity = '1';
    }, 600 + i * 120);
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        showNotification('// error: all fields required', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('// error: invalid email format', 'error');
        return;
    }

    showNotification('// message sent successfully!', 'success');
    contactForm.reset();
});

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const note = document.createElement('div');
    note.className = 'notification';

    Object.assign(note.style, {
        position: 'fixed',
        top: '90px',
        right: '20px',
        padding: '14px 20px',
        borderRadius: '2px',
        zIndex: '10000',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.8rem',
        fontWeight: '500',
        maxWidth: '380px',
        border: '1px solid',
        animation: 'slideInRight 0.3s ease',
        letterSpacing: '0.3px'
    });

    if (type === 'success') {
        note.style.background = 'rgba(100, 220, 180, 0.1)';
        note.style.borderColor = 'rgba(100, 220, 180, 0.4)';
        note.style.color = '#64dcb4';
    } else {
        note.style.background = 'rgba(239, 68, 68, 0.1)';
        note.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        note.style.color = '#f87171';
    }

    note.textContent = message;

    if (!document.getElementById('note-style')) {
        const s = document.createElement('style');
        s.id = 'note-style';
        s.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(120%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(120%); opacity: 0; }
            }
        `;
        document.head.appendChild(s);
    }

    document.body.appendChild(note);

    setTimeout(() => {
        note.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => note.remove(), 300);
    }, 4000);
}

// ==================== BACK TO TOP ====================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== CONSOLE ====================
console.log('%c[MAS] Portfolio', 'color: #64dcb4; font-family: monospace; font-size: 16px; font-weight: bold;');
console.log('%c> Maaz Ali Shaik — Full-Stack & AI Developer', 'color: #7a7a9a; font-family: monospace; font-size: 13px;');
console.log('%c> Hyderabad, India', 'color: #4a4a6a; font-family: monospace; font-size: 12px;');
