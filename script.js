let animationObserver;

const setupThemeToggle = () => {
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    if (!toggleButtons.length) return;

    const toggleTheme = () => {
        const html = document.documentElement;
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        html.classList.add('theme-transitioning');
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme-preference', next);

        setTimeout(() => {
            html.classList.remove('theme-transitioning');
        }, 350);
    };

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('theme-preference')) return;
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    });
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
            const offset = targetElement.getBoundingClientRect().top + window.scrollY - 80;

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
        const offset = window.scrollY + 120;
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

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    if (window.location.hash) {
        const hash = window.location.hash;
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            setTimeout(() => {
                const offset = targetElement.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }, 100);
        }
    } else {
        window.scrollTo(0, 0);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }

    setupThemeToggle();
    setupNavToggle();
    handleSmoothScroll();
    handleActiveNav();
    setupAnimations();
});
