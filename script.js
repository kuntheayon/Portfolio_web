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
        this.elements = document.querySelectorAll('.overview-card, .feature, .intro-card, .cta-content, .project-card, .about-card, .value-card');
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
        const buttons = document.querySelectorAll('.hero-btn, .cta-button, .card-link, .btn-primary, .btn-secondary');

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

// Navigation Active State Handler
class NavigationHandler {
    constructor() {
        this.navLinks = document.querySelectorAll('nav a');
        this.init();
    }

    init() {
        this.updateActiveNav();
        window.addEventListener('load', () => this.updateActiveNav());
    }

    updateActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage ||
                (currentPage === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
}

// Form Validation and Submission
class FormHandler {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupValidation();
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validateForm()) {
            // Show success message
            const submitBtn = this.form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent Successfully!';

            // Reset form
            this.form.reset();

            // Restore button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 3000);
        }
    }

    validateForm() {
        const nameInput = this.form.querySelector('#name');
        const emailInput = this.form.querySelector('#email');
        const subjectInput = this.form.querySelector('#subject');
        const messageInput = this.form.querySelector('#message');

        let isValid = true;

        // Validate name
        if (!nameInput.value.trim()) {
            this.showFieldError(nameInput, 'Name is required');
            isValid = false;
        }

        // Validate email
        if (!this.isValidEmail(emailInput.value)) {
            this.showFieldError(emailInput, 'Please enter a valid email');
            isValid = false;
        }

        // Validate subject
        if (!subjectInput.value.trim()) {
            this.showFieldError(subjectInput, 'Subject is required');
            isValid = false;
        }

        // Validate message
        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
            this.showFieldError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(field, message) {
        // Add error styling
        field.style.borderColor = '#dc3545';
        field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';

        // Create error message
        const errorMsg = document.createElement('small');
        errorMsg.style.color = '#dc3545';
        errorMsg.style.display = 'block';
        errorMsg.style.marginTop = '5px';
        errorMsg.textContent = message;

        // Remove previous error if exists
        const prevError = field.nextElementSibling;
        if (prevError && prevError.tagName === 'SMALL') {
            prevError.remove();
        }

        field.parentNode.insertBefore(errorMsg, field.nextSibling);

        // Remove error on focus
        field.addEventListener('focus', () => {
            field.style.borderColor = '#e9ecef';
            field.style.boxShadow = '';
            if (errorMsg) errorMsg.remove();
        }, { once: true });
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                if (e.target.value.trim()) {
                    e.target.style.borderColor = '';
                }
            });
        });
    }
}

// Scroll Progress Bar
class ScrollProgressBar {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateProgress());
    }

    updateProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        // You can use this value to update a progress bar if needed
        // Example: document.querySelector('.progress-bar').style.width = scrolled + '%';
    }
}

// Performance: Lazy Load Images
class LazyImageLoader {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.style.animation = 'fadeIn 0.5s ease-in';
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
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

    // Initialize navigation handler
    new NavigationHandler();

    // Initialize form handler
    new FormHandler();

    // Initialize scroll progress
    new ScrollProgressBar();

    // Initialize lazy loading
    new LazyImageLoader();

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

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
    });
});

// Add animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(0, 0) scale(4);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Loading state for forms */
    .submit-btn:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }
`;
document.head.appendChild(style);