// Landing Page JavaScript

// Function to navigate to the main website
function enterMainSite() {
    // Show loading state
    const button = document.querySelector('.cta-primary');
    const originalText = button.innerHTML;
    
    button.innerHTML = `
        <span style="display: flex; align-items: center; gap: 0.5rem;">
            Loading...
            <div style="width: 16px; height: 16px; border: 2px solid transparent; border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        </span>
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Navigate to the main website after a brief delay
    setTimeout(() => {
        // Update this URL to point to your main website
        // If running locally, it should be the localhost URL where your Next.js app is running
        window.location.href = 'http://localhost:3001';
        
        // Alternative: Open in new tab
        // window.open('http://localhost:3001', '_blank');
    }, 1500);
}

// Function for learn more button
function learnMore() {
    // Scroll to features section
    const featuresSection = document.querySelector('.features-section');
    featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Wildrose Painters business functions
function visitWildrosePainters() {
    const button = document.querySelector('.business-btn.primary');
    const originalText = button.innerHTML;
    
    button.innerHTML = `
        <span style="display: flex; align-items: center; gap: 0.5rem;">
            Loading...
            <div style="width: 16px; height: 16px; border: 2px solid transparent; border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        </span>
    `;
    
    setTimeout(() => {
        // Navigate to Wildrose Painters website
        window.open('https://wildrosepainters.ca', '_blank');
        button.innerHTML = originalText;
    }, 1500);
}

function contactWildrose() {
    // Add a contact animation
    const button = document.querySelector('.business-btn.secondary');
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        // You can add contact form or redirect to contact page
        alert('Contact form coming soon! Email: info@wildrosepainters.ca');
    }, 150);
}

// Enhanced typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on load
    const heroContent = document.querySelector('.hero-content');
    const heroVisualElement = document.querySelector('.hero-visual');
    const featuresSection = document.querySelector('.features-section');
    const businessSection = document.querySelector('.business-section');
    
    // Initial fade-in animation
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroVisualElement.style.opacity = '0';
    heroVisualElement.style.transform = 'translateX(30px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'all 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
        
        heroVisualElement.style.transition = 'all 1s ease 0.3s';
        heroVisualElement.style.opacity = '1';
        heroVisualElement.style.transform = 'translateX(0)';
    }, 300);
    
    // Typing effect for hero subtitle
    setTimeout(() => {
        const subtitle = document.querySelector('.hero-subtitle');
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 80);
    }, 1000);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    [featuresSection, businessSection].forEach(section => {
        if (section) {
            section.style.opacity = '0';
            observer.observe(section);
        }
    });
    
    // Add parallax scrolling effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add hover sound effects (visual feedback)
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary, .business-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transition = 'all 0.2s ease';
            button.style.filter = 'brightness(1.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.filter = 'brightness(1)';
        });
    });
    
    // Add click ripple effect
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Smooth scroll for all internal links
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
    const heroVisual = document.querySelector('.hero-visual');
    
    // Add fade-in animation
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroVisual.style.opacity = '0';
    heroVisual.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'all 0.8s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 200);
    
    setTimeout(() => {
        heroVisual.style.transition = 'all 0.8s ease';
        heroVisual.style.opacity = '1';
        heroVisual.style.transform = 'translateY(0)';
    }, 400);
    
    // Add parallax effect to floating card
    const floatingCard = document.querySelector('.floating-card');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        floatingCard.style.transform = `translateX(${x * 0.01}px) translateY(${y * 0.01}px)`;
    });
    
    // Add click animation to feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('cta-primary')) {
                enterMainSite();
            } else if (focusedElement.classList.contains('cta-secondary')) {
                learnMore();
            }
        }
    });
});

// Add some dynamic background effects
function createFloatingParticles() {
    const particleCount = 15;
    const container = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            animation: float-particle ${5 + Math.random() * 10}s infinite linear;
            left: ${Math.random() * 100}vw;
            top: 100vh;
        `;
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, (5 + Math.random() * 10) * 1000);
    }
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Create particles periodically
setInterval(createFloatingParticles, 3000);

// Initial particles
createFloatingParticles();