// Initialize AOS Animation
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Initialize other components
    initPreloader();
    initDarkMode();
    initSliders();
    initTypedText();
    initFAQAccordion();
    initMobileMenu();
    loadTallyForm();
});

// Load Tally Form
function loadTallyForm() {
    // Tally script is loaded in the HTML head
    // This ensures the iframe is properly loaded
    if (typeof Tally !== 'undefined') {
        Tally.loadEmbeds();
    } else {
        // Fallback if Tally script fails to load
        const tallyIframe = document.querySelector('iframe[data-tally-src]');
        if (tallyIframe) {
            tallyIframe.setAttribute('src', tallyIframe.getAttribute('data-tally-src'));
        }
    }
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Make floating WhatsApp button float
const floatingBtn = document.querySelector('.floating-whatsapp');
if (floatingBtn) {
    floatingBtn.style.animation = 'float 3s ease-in-out infinite';
}

// Form validation for newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value && emailInput.value.includes('@')) {
            // Simulate successful submission
            this.innerHTML = '<p class="success-message">Terima kasih telah berlangganan!</p>';
        } else {
            emailInput.style.borderColor = 'red';
            setTimeout(() => {
                emailInput.style.borderColor = '';
            }, 2000);
        }
    });
}
