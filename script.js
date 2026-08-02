// ==========================================
// RAY Community - Main JavaScript File
// Developer: Wael Mohamed
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Intersection Observer for Fade-in Animations on Cards & Sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.division-card, .concept-grid, .collateral-card, .comparison-card, .color-card, .typography-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });

    // 3. Interactive Color Card Copy to Clipboard Functionality
    const colorCards = document.querySelectorAll('.color-card');
    
    colorCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.setAttribute('title', 'انقر لنسخ كود اللون');
        
        card.addEventListener('click', () => {
            const hexSpan = card.querySelector('.color-info span');
            if (hexSpan) {
                const hexCode = hexSpan.textContent.trim();
                navigator.clipboard.writeText(hexCode).then(() => {
                    // Temporary visual feedback
                    const originalText = hexSpan.textContent;
                    hexSpan.textContent = 'تم النسخ!';
                    hexSpan.style.color = 'var(--neon-green)';
                    
                    setTimeout(() => {
                        hexSpan.textContent = originalText;
                        hexSpan.style.color = 'var(--text-muted)';
                    }, 1500);
                }).catch(err => {
                    console.error('فشل في نسخ الكود: ', err);
                });
            }
        });
    });

    // 4. Dynamic Interactive Badge Effect on Hero Section
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        heroBadge.addEventListener('mouseenter', () => {
            heroBadge.style.boxShadow = '0 0 20px rgba(198, 255, 0, 0.4)';
            heroBadge.style.borderColor = 'var(--neon-green)';
        });
        
        heroBadge.addEventListener('mouseleave', () => {
            heroBadge.style.boxShadow = 'none';
            heroBadge.style.borderColor = 'rgba(198, 255, 0, 0.3)';
        });
    }

    console.log('RAY Community Script Loaded Successfully.');
});
