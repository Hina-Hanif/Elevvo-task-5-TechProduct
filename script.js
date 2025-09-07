// Enhanced JavaScript with Premium Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) alternative
    initScrollAnimations();
    
    // Theme Toggle Functionality
    initThemeToggle();
    
    // Pricing Toggle
    initPricingToggle();
    
    // Mobile Menu
    initMobileMenu();
    
    // Smooth Scrolling
    initSmoothScrolling();
    
    // Navbar Scroll Effects
    initNavbarEffects();
    
    // Counter Animations
    initCounterAnimations();
    
    // Button Interactions
    initButtonInteractions();
    
    // Parallax Effects
    initParallaxEffects();
    
    // Typing Animation
    initTypingAnimation();
});

// Scroll Animations (AOS Alternative)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Add stagger effect for grid items
                if (entry.target.parentElement.classList.contains('features-grid') ||
                    entry.target.parentElement.classList.contains('testimonials-grid') ||
                    entry.target.parentElement.classList.contains('pricing-grid')) {
                    
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 100}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attributes
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Theme Toggle with Enhanced Animation
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition class for smooth theme change
        body.classList.add('theme-transitioning');
        
        // Change theme
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Create ripple effect
        createRippleEffect(this, newTheme === 'dark' ? '#0ea5e9' : '#a855f7');
        
        // Remove transition class after animation
        setTimeout(() => {
            body.classList.remove('theme-transitioning');
        }, 300);
    });
}

// Pricing Toggle with Smooth Animation
function initPricingToggle() {
    const pricingToggle = document.getElementById('pricingToggle');
    const priceAmounts = document.querySelectorAll('.amount');
    let isYearly = false;
    
    pricingToggle.addEventListener('click', function() {
        isYearly = !isYearly;
        this.classList.toggle('active');
        
        priceAmounts.forEach(priceAmount => {
            const monthlyPrice = priceAmount.dataset.monthly;
            const yearlyPrice = priceAmount.dataset.yearly;
            
            // Animate price change with scale and fade
            priceAmount.style.transform = 'scale(0.8)';
            priceAmount.style.opacity = '0.5';
            
            setTimeout(() => {
                priceAmount.textContent = isYearly ? yearlyPrice : monthlyPrice;
                priceAmount.style.transform = 'scale(1.1)';
                priceAmount.style.opacity = '1';
                
                setTimeout(() => {
                    priceAmount.style.transform = 'scale(1)';
                }, 150);
            }, 150);
        });
        
        // Animate toggle switch
        const slider = this.querySelector('.toggle-slider');
        slider.style.transform = isYearly ? 'translateX(26px)' : 'translateX(0)';
    });
}

// Mobile Menu with Smooth Animation
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    let isMenuOpen = false;
    
    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        // Animate hamburger menu
        const spans = this.querySelectorAll('span');
        if (isMenuOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
        
        // Toggle mobile menu (you would need to add mobile menu styles)
        navLinks.classList.toggle('mobile-active');
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.getElementById('navLinks').classList.remove('mobile-active');
            }
        });
    });
}

// Enhanced Navbar Scroll Effects
function initNavbarEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = document.body.getAttribute('data-theme') === 'dark' 
                ? 'rgba(10, 10, 10, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = 'var(--shadow-lg)';
        } else {
            navbar.style.background = document.body.getAttribute('data-theme') === 'dark' 
                ? 'rgba(10, 10, 10, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// Counter Animations for Statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Enhanced Button Interactions
function initButtonInteractions() {
    // Ripple effect for all buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(this, 'rgba(255, 255, 255, 0.6)', e);
        });
        
        // Magnetic effect for primary buttons
        if (button.classList.contains('btn-primary') || button.classList.contains('glow-btn')) {
            addMagneticEffect(button);
        }
    });
    
    // Feature card hover effects
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });
}

// Create Ripple Effect
function createRippleEffect(element, color = 'rgba(255, 255, 255, 0.6)', event = null) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    let x, y;
    if (event) {
        x = event.clientX - rect.left - size / 2;
        y = event.clientY - rect.top - size / 2;
    } else {
        x = rect.width / 2 - size / 2;
        y = rect.height / 2 - size / 2;
    }
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: ${color};
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Magnetic Effect for Buttons
function addMagneticEffect(element) {
    element.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.gradient-orb, .floating-card');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.2;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Typing Animation for Hero Title
function initTypingAnimation() {
    const titleLines = document.querySelectorAll('.hero-title .title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            typeText(line, text, 50);
        }, index * 800);
    });
}

function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .theme-transitioning * {
        transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    .mobile-active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-primary);
        border-top: 1px solid var(--border-primary);
        padding: 1rem;
        box-shadow: var(--shadow-lg);
        animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature-card {
        transform-style: preserve-3d;
        perspective: 1000px;
    }
    
    .glow-btn:hover {
        animation: glow-pulse 2s infinite;
    }
    
    @keyframes glow-pulse {
        0%, 100% {
            box-shadow: 0 0 20px rgba(14, 165, 233, 0.3);
        }
        50% {
            box-shadow: 0 0 40px rgba(14, 165, 233, 0.6);
        }
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
    }
`;

document.head.appendChild(style);

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Mouse cursor trail effect
let mouseTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', function(e) {
    mouseTrail.push({ x: e.clientX, y: e.clientY });
    
    if (mouseTrail.length > trailLength) {
        mouseTrail.shift();
    }
    
    updateTrail();
});

function updateTrail() {
    const existingTrails = document.querySelectorAll('.mouse-trail');
    existingTrails.forEach(trail => trail.remove());
    
    mouseTrail.forEach((point, index) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.cssText = `
            position: fixed;
            left: ${point.x}px;
            top: ${point.y}px;
            width: ${(trailLength - index) / 2}px;
            height: ${(trailLength - index) / 2}px;
            background: var(--primary-400);
            border-radius: 50%;
            opacity: ${(trailLength - index) / trailLength * 0.5};
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 100);
    });
}