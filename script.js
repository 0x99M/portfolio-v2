let animationObserver;

const getHeaderHeight = () => {
    const header = document.querySelector('.site-header');
    return header ? header.getBoundingClientRect().height : 0;
};

// Add hover effect for cards with tilt
const setupCardTilt = () => {
    const cards = document.querySelectorAll('.experience-card, .skill-column, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
};

// Add parallax effect to floating shapes
const setupParallax = () => {
    const shapes = document.querySelectorAll('.floating-shape');
    
    if (shapes.length === 0) return;
    
    let ticking = false;
    
    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    };
    
    const requestTick = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', requestTick, { passive: true });
};

const handleSmoothScroll = () => {
    const links = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
    if (!links.length) return;

    links.forEach(link => {
        const targetSelector = link.getAttribute('href');
        const targetElement = document.querySelector(targetSelector);

        if (!targetElement || link.pathname !== window.location.pathname) {
            return;
        }

        link.addEventListener('click', event => {
            event.preventDefault();
            const offset = targetElement.getBoundingClientRect().top + window.scrollY - getHeaderHeight() - 8;

            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        });
    });
};

const handleActiveNav = () => {
    const links = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'))
        .filter(link => link.pathname === window.location.pathname);

    if (!links.length) return;

    const sections = links
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (!sections.length) return;

    const setActiveLink = () => {
        const offset = window.scrollY + getHeaderHeight() + 16;
        let currentSection = sections[0];

        sections.forEach(section => {
            if (offset >= section.offsetTop) {
                currentSection = section;
            }
        });

        links.forEach(link => {
            const isCurrent = currentSection && link.getAttribute('href') === `#${currentSection.id}`;
            link.classList.toggle('is-active', isCurrent);
        });
    };

    window.addEventListener('scroll', setActiveLink, { passive: true });
    window.addEventListener('resize', setActiveLink);

    setActiveLink();
};

const setupAnimations = () => {
    if (!('IntersectionObserver' in window)) return;

    animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -12% 0px'
    });

    refreshAnimations();
};

function refreshAnimations() {
    if (!animationObserver) return;

    const candidates = document.querySelectorAll('[data-animate]:not(.is-visible)');
    candidates.forEach(element => animationObserver.observe(element));
}

window.refreshAnimations = refreshAnimations;

document.addEventListener('DOMContentLoaded', () => {
    handleSmoothScroll();
    handleActiveNav();
    setupAnimations();
    setupCardTilt();
    setupParallax();
    
    // Re-initialize card tilt when projects are loaded
    if (window.location.pathname.includes('projects.html')) {
        const originalRefresh = window.refreshAnimations;
        window.refreshAnimations = function() {
            originalRefresh();
            setTimeout(setupCardTilt, 100);
        };
    }
});

