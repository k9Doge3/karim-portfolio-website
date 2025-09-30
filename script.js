// Professional Landing Page JavaScript

// Navigation functions for main sections
function navigateToSection(section) {
    const button = event.target.closest('.nav-card');
    const originalContent = button.innerHTML;
    
    // Add loading state
    button.style.opacity = '0.7';
    button.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        switch(section) {
            case 'business':
                window.open('https://wildrosepainters.ca', '_blank');
                break;
            case 'portfolio':
                // Navigate to portfolio/GitHub section
                window.location.href = 'http://localhost:3001/portfolio';
                break;
            case 'resume':
                // Navigate to resume section
                window.location.href = 'http://localhost:3001/resume';
                break;
            case 'life':
                // Navigate to personal life section (requires auth)
                window.location.href = 'http://localhost:3001/life';
                break;
            default:
                console.log('Unknown section:', section);
        }
        
        // Reset button state
        button.style.opacity = '1';
        button.style.transform = 'scale(1)';
    }, 500);
}

// Download resume function
function downloadResume() {
    const button = event.target.closest('.quick-link');
    const originalContent = button.innerHTML;
    
    button.innerHTML = `
        <span class="link-icon">⏳</span>
        <span class="link-text">Preparing...</span>
    `;
    
    setTimeout(() => {
        // You can replace this with actual resume download logic
        alert('Resume download will be available soon! For now, please visit the Resume section.');
        button.innerHTML = originalContent;
    }, 1500);
}

// Enhanced page loading animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate header elements
    const header = document.querySelector('.professional-header');
    const navCards = document.querySelectorAll('.nav-card');
    const quickLinks = document.querySelector('.quick-links');
    const skillsPreview = document.querySelector('.skills-preview');
    
    // Initial state
    header.style.opacity = '0';
    header.style.transform = 'translateY(-30px)';
    
    // Animate header
    setTimeout(() => {
        header.style.transition = 'all 0.8s ease';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 200);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections
    [quickLinks, skillsPreview].forEach(section => {
        if (section) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease';
            observer.observe(section);
        }
    });
    
    // Add hover effects for cards
    navCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click ripple effect to all interactive elements
    const interactiveElements = document.querySelectorAll('.nav-card, .quick-link, .skill-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
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
                background: rgba(102, 126, 234, 0.3);
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
    
    // Add typing effect to name
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        
        setTimeout(() => {
            typeWriter(nameElement, originalText, 100);
        }, 800);
    }
    
    // Smooth scrolling for any internal links
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
    
    // Add professional fade-in animation for skills
    setTimeout(() => {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 1200 + (index * 100));
        });
    }, 100);
});

// Typing effect function
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

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);