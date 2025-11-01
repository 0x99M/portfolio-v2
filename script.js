let animationObserver;

// Add hover effect for cards with tilt
const setupCardTilt = () => {
    const cards = document.querySelectorAll('.experience-card, .skill-column');
    
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
    const links = Array.from(document.querySelectorAll('.section-indicator a[href^="#"]'));
    if (!links.length) return;

    links.forEach(link => {
        const targetSelector = link.getAttribute('href');
        const targetElement = document.querySelector(targetSelector);

        if (!targetElement || link.pathname !== window.location.pathname) {
            return;
        }

        link.addEventListener('click', event => {
            event.preventDefault();
            const offset = targetElement.getBoundingClientRect().top + window.scrollY - 32;

            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        });
    });
};

const handleActiveNav = () => {
    const links = Array.from(document.querySelectorAll('.section-indicator a[href^="#"]'))
        .filter(link => link.pathname === window.location.pathname);

    if (!links.length) return;

    const sections = links
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (!sections.length) return;

    const setActiveLink = () => {
        const offset = window.scrollY + 100;
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

// Experience Card Stack Effect
const setupExperienceStack = () => {
    const stack = document.querySelector('.experience-stack');
    if (!stack) return;

    const cards = Array.from(stack.querySelectorAll('.experience-card'));
    if (!cards.length) return;

    const cardCount = cards.length;
    const baseStackHeight = cardCount * 110;

    const setStackHeight = () => {
        stack.style.minHeight = `${baseStackHeight}vh`;
    };

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const updateCardStates = () => {
        const viewportHeight = window.innerHeight;
        const stackRect = stack.getBoundingClientRect();
        const stackTop = window.scrollY + stackRect.top;
        const stackHeight = stackRect.height || viewportHeight;

        const scrollCenter = window.scrollY + viewportHeight * 0.45;
        const rawProgress = (scrollCenter - stackTop) / (stackHeight - viewportHeight * 0.5);
        const progress = clamp(rawProgress, 0, 1);
        const activeIndex = progress * (cardCount - 1);

        cards.forEach((card, index) => {
            const distance = index - activeIndex;
            const absDistance = Math.abs(distance);

            const translateY = distance * 70;
            const scale = 1 - clamp(absDistance * 0.12, 0, 0.45);
            const opacity = 1 - clamp(absDistance * 0.5, 0, 0.75);

            card.style.transform = `translateY(${translateY}px) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = String(cardCount * 10 - Math.round(absDistance * 10));

            card.classList.toggle('is-active', absDistance < 0.3);
            card.classList.toggle('is-behind', distance < -0.3);
            card.classList.toggle('is-ahead', distance > 0.3);
        });
    };

    let ticking = false;
    const requestUpdate = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateCardStates();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', () => {
        setStackHeight();
        updateCardStates();
    });

    setStackHeight();
    updateCardStates();
};

document.addEventListener('DOMContentLoaded', () => {
    handleSmoothScroll();
    handleActiveNav();
    setupAnimations();
    setupCardTilt();
    setupParallax();
    setupExperienceStack();
    
    // Re-initialize card tilt when projects are loaded
    if (window.location.pathname.includes('projects.html')) {
        const originalRefresh = window.refreshAnimations;
        window.refreshAnimations = function() {
            originalRefresh();
            setTimeout(setupCardTilt, 100);
        };
    }
});

