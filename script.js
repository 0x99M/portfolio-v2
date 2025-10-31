// ==================== 
// Smooth Scrolling Navigation
// ==================== 
document.addEventListener('DOMContentLoaded', () => {
    // Handle smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==================== 
    // Active Navigation State
    // ==================== 
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('.section, .hero');
        const navHeight = document.querySelector('.nav').offsetHeight;
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial check
    
    // ==================== 
    // Intersection Observer for Fade-in Animations
    // ==================== 
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
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // ==================== 
    // Nav Background on Scroll
    // ==================== 
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ==================== 
    // Prevent Animation on Page Load
    // ==================== 
    // Remove animation delay after initial load
    setTimeout(() => {
        fadeElements.forEach(element => {
            element.style.animationDelay = '0s';
        });
    }, 2000);
});

// ==================== 
// Mobile Menu Toggle (if needed for future expansion)
// ==================== 
function initMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// ==================== 
// Parallax Effect for Hero Section (Optional Enhancement)
// ==================== 
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroContent = hero.querySelector('.hero-content');
            
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        });
    }
}

// Initialize parallax if on homepage
if (document.querySelector('.hero')) {
    initParallax();
}

// ==================== 
// Image Lazy Loading Enhancement
// ==================== 
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observe lazy images
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==================== 
// Skills Tag Animation
// ==================== 
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
    });
});

// ==================== 
// Smooth Page Transitions
// ==================== 
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});

// ==================== 
// Copy Email on Click (Enhancement)
// ==================== 
function initEmailCopy() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const email = link.getAttribute('href').replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    // Show temporary notification
                    showNotification('Email copied to clipboard!');
                });
            }
        });
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background-color: #2563eb;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add slideIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize email copy functionality
document.addEventListener('DOMContentLoaded', initEmailCopy);

// ==================== 
// Performance: Debounce Scroll Events
// ==================== 
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handlers for better performance
const debouncedScroll = debounce(() => {
    // Additional scroll-based animations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

