// slider.js
class TestimonialSlider {
  constructor(selector) {
    this.slider = document.querySelector(selector);
    this.slides = this.slider.querySelectorAll('.testimonial-slide');
    this.currentIndex = 0;
    this.interval = null;
    this.autoScroll = true;
    this.delay = 5000; // 5 detik
    
    this.init();
  }

  init() {
    // 1. Buat navigation dots
    this.createDots();
    
    // 2. Setup event listeners
    this.slider.querySelector('.prev-btn').addEventListener('click', () => this.prevSlide());
    this.slider.querySelector('.next-btn').addEventListener('click', () => this.nextSlide());
    
    // 3. Auto-scroll
    if (this.autoScroll) {
      this.startAutoScroll();
      this.slider.addEventListener('mouseenter', () => this.stopAutoScroll());
      this.slider.addEventListener('mouseleave', () => this.startAutoScroll());
    }
    
    // 4. Tampilkan slide pertama
    this.showSlide(this.currentIndex);
  }

  showSlide(index) {
    // Sembunyikan semua slide
    this.slides.forEach(slide => {
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');
    });
    
    // Tampilkan slide yang dipilih
    this.slides[index].classList.add('active');
    this.slides[index].setAttribute('aria-hidden', 'false');
    
    // Update dot navigation
    this.updateDots(index);
    
    // Update currentIndex
    this.currentIndex = index;
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex);
  }

  createDots() {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    
    this.slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => this.showSlide(i));
      dotsContainer.appendChild(dot);
    });
    
    this.slider.appendChild(dotsContainer);
    this.dots = dotsContainer.querySelectorAll('.dot');
  }

  updateDots(index) {
    this.dots.forEach(dot => dot.classList.remove('active'));
    this.dots[index].classList.add('active');
  }

  startAutoScroll() {
    this.interval = setInterval(() => this.nextSlide(), this.delay);
  }

  stopAutoScroll() {
    clearInterval(this.interval);
  }
}

// Inisialisasi slider
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialSlider('.testimonial-slider');
});
