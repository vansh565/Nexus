// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const ctaBtn = document.getElementById('ctaBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeLogin = document.getElementById('closeLogin');
const closeSignup = document.getElementById('closeSignup');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');

// Modal Functions
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = modal.querySelector('.modal');
    modalContent.style.animation = 'modalEnter 0.4s ease-out forwards';
}

function closeModal(modal) {
    const modalContent = modal.querySelector('.modal');
    modalContent.style.animation = 'modalExit 0.3s ease-in forwards';
    
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        modalContent.style.animation = '';
    }, 300);
}

function switchModals(fromModal, toModal) {
    closeModal(fromModal);
    setTimeout(() => {
        openModal(toModal);
    }, 400);
}

// Event Listeners
loginBtn.addEventListener('click', () => openModal(loginModal));
signupBtn.addEventListener('click', () => openModal(signupModal));
ctaBtn.addEventListener('click', () => openModal(signupModal));

closeLogin.addEventListener('click', () => closeModal(loginModal));
closeSignup.addEventListener('click', () => closeModal(signupModal));

switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    switchModals(loginModal, signupModal);
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    switchModals(signupModal, loginModal);
});

// Close modal when clicking outside
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeModal(loginModal);
    }
});

signupModal.addEventListener('click', (e) => {
    if (e.target === signupModal) {
        closeModal(signupModal);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (loginModal.classList.contains('active')) {
            closeModal(loginModal);
        }
        if (signupModal.classList.contains('active')) {
            closeModal(signupModal);
        }
    }
});

// Form Handling
const loginForm = loginModal.querySelector('.modal-form');
const signupForm = signupModal.querySelector('.modal-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add loading state
    const submitBtn = loginForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing In...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message (you can customize this)
        showNotification('Welcome back! Redirecting...', 'success');
        
        // Close modal and redirect to dashboard
        setTimeout(() => {
            closeModal(loginModal);
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        }, 1000);
    }, 2000);
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate password confirmation
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    // Add loading state
    const submitBtn = signupForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Account created successfully! Welcome aboard!', 'success');
        
        // Close modal and redirect to dashboard
        setTimeout(() => {
            closeModal(signupModal);
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        }, 1000);
    }, 2000);
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Trigger entrance animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.add('hide');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Smooth Scrolling for Learn More Button
const learnMoreBtn = document.querySelector('.btn-ghost');
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Scroll to features section
        const featuresSection = document.querySelector('.features-grid');
        if (featuresSection) {
            featuresSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Intersection Observer for Feature Cards Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'cardSlideUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
});

// Add CSS for notifications and modal animations
const additionalStyles = `
/* Notification Styles */
.notification {
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1rem 1.5rem;
    color: white;
    z-index: 3000;
    transform: translateX(400px);
    opacity: 0;
    transition: all 0.3s ease;
    max-width: 350px;
}

.notification.show {
    transform: translateX(0);
    opacity: 1;
}

.notification.hide {
    transform: translateX(400px);
    opacity: 0;
}

.notification-success {
    border-left: 4px solid #10b981;
}

.notification-error {
    border-left: 4px solid #ef4444;
}

.notification-info {
    border-left: 4px solid #3b82f6;
}

.notification-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.notification-message {
    font-size: 0.9rem;
    line-height: 1.4;
}

.notification-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease;
    flex-shrink: 0;
}

.notification-close:hover {
    color: #fff;
}

/* Modal Animation Keyframes */
@keyframes modalEnter {
    from {
        transform: scale(0.9) translateY(20px);
        opacity: 0;
    }
    to {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}

@keyframes modalExit {
    from {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
    to {
        transform: scale(0.95) translateY(-10px);
        opacity: 0;
    }
}

/* Mobile notification adjustments */
@media (max-width: 768px) {
    .notification {
        top: 1rem;
        right: 1rem;
        left: 1rem;
        max-width: none;
        transform: translateY(-100px);
    }
    
    .notification.show {
        transform: translateY(0);
    }
    
    .notification.hide {
        transform: translateY(-100px);
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect styles and event listeners
const rippleStyles = `
.btn-primary, .btn-cta, .btn-submit {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    pointer-events: none;
}

@keyframes rippleEffect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleStyles;
document.head.appendChild(rippleStyleSheet);

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-cta, .btn-submit');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

console.log('🚀 Dark Landing Page Loaded Successfully!');