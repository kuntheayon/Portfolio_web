function projectAlert(name) {
    alert(name + " - This project demonstrates full-stack web development skills including modern frontend frameworks, robust backend APIs, database integration, and responsive design. Technologies used vary by project but typically include React.js, Node.js, Express.js, and various database systems.");
}

// Skill Progress Bar Animation
class SkillAnimator {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.animated = false;
        this.init();
    }

    init() {
        if (this.skillBars.length > 0) {
            this.setupObserver();
        }
    }

    setupObserver() {
        const options = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateSkills();
                    this.animated = true;
                }
            });
        }, options);

        const skillsSection = document.querySelector('.skills-showcase');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    animateSkills() {
        this.skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';

                // Animate the percentage counter
                const percentageElement = bar.parentElement.previousElementSibling.querySelector('.skill-percentage');
                if (percentageElement) {
                    this.animateCounter(percentageElement, 0, parseInt(progress), 2000);
                }
            }, index * 200);
        });
    }

    animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                element.textContent = end + '%';
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current) + '%';
            }
        }, 16);
    }
}

// Scroll Reveal Animation
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.overview-card, .feature, .intro-card, .cta-content');
        this.init();
    }

    init() {
        if (this.elements.length > 0) {
            this.setupElements();
            this.setupObserver();
        }
    }

    setupElements() {
        this.elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        });
    }

    setupObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Enhanced Button Interactions
class ButtonEffects {
    constructor() {
        this.init();
    }

    init() {
        this.addRippleEffect();
        this.addMagneticEffect();
    }

    addRippleEffect() {
        const buttons = document.querySelectorAll('.hero-btn, .cta-button, .card-link');

        buttons.forEach(button => {
            button.addEventListener('click', function (e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: translate(${x}px, ${y}px) scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    addMagneticEffect() {
        const buttons = document.querySelectorAll('.cta-button');

        buttons.forEach(button => {
            button.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });

            button.addEventListener('mouseleave', function () {
                this.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize skill progress bars
    new SkillAnimator();

    // Initialize scroll reveal animations
    new ScrollReveal();

    // Initialize button effects
    new ButtonEffects();

    // Form submission handler for contact form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(0, 0) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);