let animationObserver;

// Add hover effect for cards with tilt
const setupCardTilt = () => {
    const cards = document.querySelectorAll('.skill-column');
    
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

const setupNavToggle = () => {
    const nav = document.querySelector('.section-indicator');
    if (!nav) return;

    const toggle = nav.querySelector('.nav-toggle');
    const navLinks = nav.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    const setMenuState = (isOpen) => {
        nav.classList.toggle('is-menu-open', isOpen);
        toggle.classList.toggle('is-active', isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.classList.toggle('nav-open', isOpen);
    };

    const closeMenu = () => {
        if (!nav.classList.contains('is-menu-open')) return;
        setMenuState(false);
    };

    toggle.addEventListener('click', () => {
        const isOpen = !nav.classList.contains('is-menu-open');
        setMenuState(isOpen);
        if (isOpen) {
            toggle.focus();
        }
    });

    navLinks.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (!link) return;
        closeMenu();
    });

    document.addEventListener('click', (event) => {
        if (!nav.classList.contains('is-menu-open')) return;
        if (nav.contains(event.target)) return;
        closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
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
            const offset = targetElement.getBoundingClientRect().top + window.scrollY - 72;

            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        });
    });
};

const handleActiveNav = () => {
    const links = Array.from(document.querySelectorAll('.section-indicator a[href^="#"]'));
    const sections = Array.from(document.querySelectorAll('section[id]'));
    
    if (!links.length || !sections.length) return;

    const setActiveSection = () => {
        const offset = window.scrollY + 100;
        let currentSection = sections[0];

        sections.forEach(section => {
            if (offset >= section.offsetTop) {
                currentSection = section;
            }
        });

        links.forEach(link => {
            const isCurrent = link.getAttribute('href') === `#${currentSection.id}`;
            link.classList.toggle('is-active', isCurrent);
        });
    };

    window.addEventListener('scroll', setActiveSection, { passive: true });
    window.addEventListener('resize', setActiveSection);

    setActiveSection();
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

// Prevent scroll restoration and ensure page starts at top
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Ensure page starts at top on load (unless there's an intentional hash)
window.addEventListener('load', () => {
    // Only scroll to hash if it's in the URL when page loads (user clicked a link)
    if (window.location.hash) {
        const hash = window.location.hash;
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            // Use setTimeout to ensure smooth scroll works properly
            setTimeout(() => {
                const offset = targetElement.getBoundingClientRect().top + window.scrollY - 72;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }, 100);
        }
    } else {
        // No hash, ensure we're at the top
        window.scrollTo(0, 0);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Immediately prevent any scrolling until page is ready
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
    
    setupNavToggle();
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

