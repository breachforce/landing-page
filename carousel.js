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
        
        this.slidesPerView = this.getSlidesPerView();
        this.maxSlide = Math.max(0, this.slides.length - this.slidesPerView);
        
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
        const width = window.innerWidth;
        if (width >= 1024) return 3; // lg screens
        if (width >= 768) return 2;  // md screens
        return 1; // sm screens
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
            const newSlidesPerView = this.getSlidesPerView();
            if (newSlidesPerView !== this.slidesPerView) {
                this.slidesPerView = newSlidesPerView;
                this.maxSlide = Math.max(0, this.slides.length - this.slidesPerView);
                this.currentSlide = Math.min(this.currentSlide, this.maxSlide);
                this.updateCarousel();
                this.updateButtons();
            }
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
        const translateX = -this.currentSlide * (100 / this.slidesPerView);
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
