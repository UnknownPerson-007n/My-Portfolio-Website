// ==================== NAVIGATION FUNCTIONALITY ====================

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger icon
    const bars = hamburger.querySelectorAll('.bar');
    hamburger.classList.toggle('active');
    
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

// Close mobile menu when clicking on a link
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

// ==================== SCROLL EFFECTS ====================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==================== SMOOTH SCROLLING ====================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== ACTIVE SECTION HIGHLIGHTING ====================

// Highlight active section in navigation
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================

// Fade-in animation for elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill items and project cards
const animateElements = document.querySelectorAll('.skill-item, .project-card');
animateElements.forEach(element => {
    observer.observe(element);
});

// ==================== CONTACT FORM HANDLING ====================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show success message
    showNotification('Thank you for your message! I will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Optional: Here you can add code to send the form data to a server
    // For example, using fetch() to submit to a backend API
});

// ==================== NOTIFICATION SYSTEM ====================

function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '400px',
        minWidth: '300px'
    });
    
    if (type === 'success') {
        notification.style.background = '#10b981';
        notification.style.color = 'white';
    } else {
        notification.style.background = '#ef4444';
        notification.style.color = 'white';
    }
    
    // Add notification styles
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-icon {
            font-size: 1.25rem;
            font-weight: bold;
        }
        
        @media (max-width: 480px) {
            .notification {
                right: 10px !important;
                left: 10px !important;
                min-width: auto !important;
                max-width: calc(100% - 20px) !important;
            }
        }
    `;
    
    if (!document.getElementById('notification-styles')) {
        notificationStyle.id = 'notification-styles';
        document.head.appendChild(notificationStyle);
    }
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ==================== BACK TO TOP BUTTON ====================

const backToTopButton = document.getElementById('backToTop');

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Scroll to top when clicking the button
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== TYPING ANIMATION (Optional) ====================

// Uncomment this section if you want a typing effect for the hero title
/*
const typingText = document.querySelector('.typing-text');
const textToType = 'Frontend Developer';
let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        typingText.textContent = textToType.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 150);
    }
}

// Start typing effect after page loads
window.addEventListener('load', () => {
    typingText.textContent = '';
    setTimeout(typeWriter, 500);
});
*/

// ==================== FORM INPUT ENHANCEMENTS ====================

// Add floating label effect to form inputs
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    // Remove focus effect
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Check if input has value on page load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// ==================== PROJECT CARD ANIMATIONS ====================

// Add hover tilt effect to project cards (Optional)
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ==================== SKILL CARDS STAGGER ANIMATION ====================

// Stagger animation for skill cards
const skillCards = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

skillCards.forEach(card => {
    skillObserver.observe(card);
});

// ==================== PREVENT FORM RESUBMISSION ====================

// Prevent accidental form resubmission
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ==================== PAGE LOAD ANIMATION ====================

// Fade in hero content on page load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});

// ==================== SCROLL REVEAL FOR SECTIONS ====================

// Reveal sections on scroll
const revealSections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    sectionObserver.observe(section);
});

// ==================== CONSOLE MESSAGE ====================

console.log('%c🚀 Portfolio Website Loaded Successfully!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cDeveloped by Mauaz Ali Shaik', 'color: #10b981; font-size: 14px;');
console.log('%cFrontend Developer | Passionate about creating user-friendly interfaces', 'color: #6b7280; font-size: 12px;');

// ==================== PERFORMANCE OPTIMIZATION ====================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(highlightNavigation));

// ==================== ACCESSIBILITY ENHANCEMENTS ====================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Focus trap for mobile menu
const focusableElements = navLinks.querySelectorAll('a, button');
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

navLinks.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
});

// ==================== END OF SCRIPT ====================
