// ==========================================
// SCROLL EFFECTS - scroll.js
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        // Show/Hide scroll button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Scroll Animation - Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.feature-card, .quick-card, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const heroContent = hero.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
                }
            }
        });
    }
    
    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const statsSection = document.querySelector('.stats-section');
    
    if (statsSection && statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = stat.textContent.trim();
            const isPercentage = target.includes('%');
            const isPlus = target.includes('+');
            const hasM = target.includes('M');
            const number = parseInt(target.replace(/[^0-9]/g, ''));
            
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    let displayValue = Math.floor(current);
                    if (isPercentage) {
                        stat.textContent = displayValue + '%';
                    } else if (hasM) {
                        stat.textContent = displayValue + 'M+';
                    } else if (isPlus) {
                        stat.textContent = displayValue + '+';
                    } else {
                        stat.textContent = displayValue;
                    }
                }
            }, 30);
        });
    }
    
    // Progress Bar on Scroll
    const progressBar = document.createElement('div');
    progressBar.id = 'scrollProgress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(to right, #0066CC, #00A86B);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    });
    
    // Smooth reveal for sections
    const sections = document.querySelectorAll('section:not(.hero)');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        sectionObserver.observe(section);
    });
    
    // Add stagger delay to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add stagger delay to quick cards
    const quickCards = document.querySelectorAll('.quick-card');
    quickCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    console.log('Scroll effects initialized');
    
});