// ==============================================
// 1. PRELOADER
// ==============================================
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Animasi fade out
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';
        
        // Hapus elemen setelah animasi selesai
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
});

// ==============================================
// 2. AOS INITIALIZATION
// ==============================================
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 50
});

// ==============================================
// 3. DARK/LIGHT MODE TOGGLE
// ==============================================
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    const html = document.documentElement;
    const icon = themeToggle.querySelector('span.material-symbols-outlined');

    // Fungsi toggle theme
    const toggleTheme = () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        icon.textContent = newTheme === 'dark' ? 'dark_mode' : 'light_mode';
        localStorage.setItem('pastnow-theme', newTheme);
        
        // Dispatch event untuk komponen lain
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
    };

    // Event listener
    themeToggle.addEventListener('click', toggleTheme);

    // Load saved theme
    const savedTheme = localStorage.getItem('pastnow-theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    icon.textContent = savedTheme === 'dark' ? 'dark_mode' : 'light_mode';
}

// ==============================================
// 4. MOBILE MENU TOGGLE
// ==============================================
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        // Toggle class active
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// ==============================================
// 5. TYPING EFFECT (HERO SECTION)
// ==============================================
const initTypingEffect = () => {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const texts = [
        "Solusi Produktif...",
        "Komunitas Supportif...",
        "Tempat Belajar Asik...",
        "Wujudkan Mimpi Bersama..."
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    };

    // Mulai efek mengetik
    setTimeout(type, 1000);
};

// ==============================================
// 6. TESTIMONIAL SLIDER
// ==============================================
const initTestimonialSlider = () => {
    const slider = document.querySelector('.testimoni-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.testimoni-slide');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    };
    
    // Navigation
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-slide (opsional)
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }, 5000);
};

// ==============================================
// 7. FAQ ACCORDION
// ==============================================
const initFAQAccordion = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('.material-symbols-outlined');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Tutup semua item terlebih dahulu
            faqItems.forEach(el => {
                el.classList.remove('active');
                el.querySelector('.faq-answer').style.maxHeight = null;
                el.querySelector('.material-symbols-outlined').textContent = 'expand_more';
            });
            
            // Buka item yang diklik jika sebelumnya tertutup
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.textContent = 'expand_less';
            }
        });
    });
};

// ==============================================
// 8. INITIALIZE ALL COMPONENTS
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initTestimonialSlider();
    initFAQAccordion();
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.hamburger').classList.remove('active');
            document.querySelector('.mobile-menu').classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});
