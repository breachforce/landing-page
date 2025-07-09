// Carousel functionality for Past Meetups & Highlights
class MeetupCarousel {
    constructor() {
        this.currentSlide = 0;
        this.carousel = document.querySelector('.meetup-carousel');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.indicators = document.querySelectorAll('.carousel-indicator');
        
        if (!this.carousel || !this.slides.length) return;
        
        this.slidesPerView = 1;
        this.maxSlide = Math.max(0, this.slides.length - 1);
        
        this.init();
        this.setupEventListeners();
        this.setupResizeListener();
    }
    
    init() {
        this.updateCarousel();
        this.updateIndicators();
        this.updateButtons();
    }
    
    getSlidesPerView() {
        return 1; // Always show one slide at a time
    }
    
    setupEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/swipe support
        let startX = 0;
        let isDragging = false;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            isDragging = false;
        });
    }
    
    setupResizeListener() {
        window.addEventListener('resize', () => {
            // Ensure carousel position remains correct on resize
            this.updateCarousel();
        });
    }
    
    nextSlide() {
        if (this.currentSlide < this.maxSlide) {
            this.currentSlide++;
            this.updateCarousel();
            this.updateIndicators();
            this.updateButtons();
        }
    }
    
    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateCarousel();
            this.updateIndicators();
            this.updateButtons();
        }
    }
    
    goToSlide(index) {
        if (index >= 0 && index <= this.maxSlide) {
            this.currentSlide = index;
            this.updateCarousel();
            this.updateIndicators();
            this.updateButtons();
        }
    }
    
    updateCarousel() {
        const translateX = -this.currentSlide * 100;
        this.carousel.style.transform = `translateX(${translateX}%)`;
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('bg-red-600');
                indicator.classList.remove('bg-gray-300');
            } else {
                indicator.classList.add('bg-gray-300');
                indicator.classList.remove('bg-red-600');
            }
        });
    }
    
    updateButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 0;
            this.prevBtn.classList.toggle('opacity-50', this.currentSlide === 0);
            this.prevBtn.classList.toggle('cursor-not-allowed', this.currentSlide === 0);
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.maxSlide;
            this.nextBtn.classList.toggle('opacity-50', this.currentSlide === this.maxSlide);
            this.nextBtn.classList.toggle('cursor-not-allowed', this.currentSlide === this.maxSlide);
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MeetupCarousel();
});
