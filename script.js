let animationObserver;

const getHeaderHeight = () => {
    const header = document.querySelector('.site-header');
    return header ? header.getBoundingClientRect().height : 0;
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
});

