// ==========================================
// MAIN JAVASCRIPT FILE
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize everything
    console.log('WellCare Diagnostics - Website Loaded');
    
    // Page Loading Animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Quick Card Hover Effects
    const quickCards = document.querySelectorAll('.quick-card');
    quickCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Feature Card Stagger Animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Form Validation (for future forms)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
    
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                showError(input, 'This field is required');
                isValid = false;
            } else {
                removeError(input);
            }
            
            // Email validation
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    showError(input, 'Please enter a valid email');
                    isValid = false;
                }
            }
            
            // Phone validation
            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^[\d\s\-\(\)]+$/;
                if (!phoneRegex.test(input.value)) {
                    showError(input, 'Please enter a valid phone number');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group') || input.parentElement;
        let errorDiv = formGroup.querySelector('.error-message');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = 'color: #EF4444; font-size: 14px; margin-top: 5px;';
            formGroup.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        input.style.borderColor = '#EF4444';
    }
    
    function removeError(input) {
        const formGroup = input.closest('.form-group') || input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = '';
    }
    
    // Toast Notification System
    window.showToast = function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        const icon = {
            'success': '<i class="fas fa-check-circle" style="color: #10B981; font-size: 24px;"></i>',
            'error': '<i class="fas fa-times-circle" style="color: #EF4444; font-size: 24px;"></i>',
            'warning': '<i class="fas fa-exclamation-triangle" style="color: #F59E0B; font-size: 24px;"></i>',
            'info': '<i class="fas fa-info-circle" style="color: #3B82F6; font-size: 24px;"></i>'
        };
        
        toast.innerHTML = `
            ${icon[type] || icon.info}
            <span style="flex: 1;">${message}</span>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; cursor: pointer; color: #6B7280; font-size: 20px;">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    };
    
    // Add slideIn/Out animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Copy to Clipboard Function
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!', 'success');
        }).catch(() => {
            showToast('Failed to copy', 'error');
        });
    };
    
    // Print Function
    window.printPage = function() {
        window.print();
    };
    
    // Share Function (Web Share API)
    window.sharePage = function() {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: 'Check out WellCare Diagnostics',
                url: window.location.href
            }).catch(() => {
                // User cancelled or error
            });
        } else {
            copyToClipboard(window.location.href);
            showToast('Link copied to clipboard!', 'success');
        }
    };
    
    // Analytics (placeholder)
    window.trackEvent = function(category, action, label) {
        console.log('Event tracked:', { category, action, label });
        // Add your analytics code here (Google Analytics, etc.)
    };
    
    // Track Quick Card Clicks
    quickCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('h3').textContent;
            trackEvent('Quick Access', 'Click', cardTitle);
        });
    });
    
    // Lazy Loading Images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Cookie Consent (placeholder)
    function showCookieConsent() {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Show cookie banner
            console.log('Show cookie consent banner');
        }
    }
    
    // Initialize cookie consent
    setTimeout(showCookieConsent, 1000);
    
    // Performance Monitoring
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time:', pageLoadTime + 'ms');
        }
    });
    
    // Accessibility: Focus visible for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Add focus visible styles
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .keyboard-nav *:focus {
            outline: 2px solid #0066CC;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(focusStyle);
    
    console.log('All systems initialized successfully! 🎉');
    
});