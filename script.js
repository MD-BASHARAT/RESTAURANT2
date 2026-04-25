// Navbar scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body
    document.body.classList.add('loading');

    // Check if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        const preloaderTl = gsap.timeline({
            onComplete: () => {
                document.body.classList.remove('loading');
                initAnimations();
            }
        });

        // Preloader Animation
        preloaderTl.to('.preloader-line', {
            width: '100%',
            duration: 1.5,
            ease: 'power3.inOut'
        })
        .to('.preloader-logo', {
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in'
        }, '+=0.2')
        .to('.preloader-line', {
            opacity: 0,
            duration: 0.3
        }, '<')
        .to('#preloader', {
            yPercent: -100,
            duration: 0.8,
            ease: 'power4.inOut'
        });

        function initAnimations() {
            // Force scroll to top on refresh to ensure animations trigger correctly
            window.scrollTo(0, 0);

            // Navbar entrance
            gsap.from('nav', {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            // Hero section animations
            const tl = gsap.timeline();
            if (document.querySelector('.hero-content h1')) {
                tl.from('.hero-content h1', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' })
                  .from('.hero-content p', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.6')
                  .from('.hero-cta', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.6')
                  .from('.hero-image', { opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.out' }, '-=0.6')
                  .from('#signature-crunch', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' });
            } else if (document.querySelector('.hero-image') && document.querySelector('.hero-content')) {
                 tl.from('.hero-image', { opacity: 0, x: -50, duration: 1.2, ease: 'power3.out' })
                   .from('.hero-content h1', { opacity: 0, x: 50, duration: 1, ease: 'power3.out' }, '-=0.8')
                   .from('.hero-content p', { opacity: 0, x: 50, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, '-=0.6');
            }

            // Staggered glass cards
            const glassCards = document.querySelectorAll('.glass:not(form):not(#signature-crunch)');
            if (glassCards.length > 0) {
                gsap.from(glassCards, {
                    scrollTrigger: {
                        trigger: glassCards[0].parentElement,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out'
                });
            }

            // Other reveal elements... (rest of the animations)
            const sectionText = document.querySelectorAll('h2, main > section > .container > div > p');
            sectionText.forEach(el => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });

            if (document.querySelector('.footer-col')) {
                gsap.from('.footer-col', {
                    scrollTrigger: {
                        trigger: 'footer',
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out'
                });
            }

            const revealElements = document.querySelectorAll('.reveal:not(.glass)');
            revealElements.forEach(el => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 40,
                    duration: 1,
                    ease: 'power3.out'
                });
            });
            
            if(document.querySelector('#contactForm')) {
                 gsap.from('#contactForm', {
                    scrollTrigger: {
                        trigger: '#contactForm',
                        start: 'top 85%',
                    },
                    opacity: 0,
                    x: 50,
                    duration: 1,
                    ease: 'power3.out'
                });
            }

            gsap.to('.flying-dish.left', {
                scrollTrigger: {
                    trigger: '.flavor-explosion',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                left: '10%',
                rotation: 20,
                scale: 1.2,
                ease: 'none'
            });

            gsap.to('.flying-dish.right', {
                scrollTrigger: {
                    trigger: '.flavor-explosion',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                right: '10%',
                rotation: -20,
                scale: 1.2,
                ease: 'none'
            });
        }
    }
});

// Form validation (if on contact or login page)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login functionality would be implemented here!');
    });
}
