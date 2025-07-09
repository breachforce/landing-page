// BreachForce Community Stats - Dynamic Content Generator
// This file manages the community statistics section

class CommunityStats {
    constructor() {
        this.hasAnimated = false; // Track if animation has run
        this.stats = [
            {
                value: "20+",
                label: "Meetups Held",
                description: "Technical sessions",
                color: "text-red-600"
            },
            {
                value: "20+",
                label: "Expert Speakers",
                description: "Industry professionals",
                color: "text-red-600"
            },
            {
                value: "1500+",
                label: "Community Members",
                description: "Active participants",
                color: "text-red-600"
            }
        ];

        this.sectionConfig = {
            title: "Our Community Impact",
            subtitle: "Building Mumbai's strongest cybersecurity community through knowledge sharing, practical learning, and connecting passionate security professionals."
        };
    }

    // Generate HTML for individual stat item
    generateStatItem(stat) {
        return `
            <div class="text-center">
                <p class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold ${stat.color} mb-3 sm:mb-4">${stat.value}</p>
                <p class="text-base sm:text-lg md:text-xl text-gray-700 font-medium">${stat.label}</p>
                <p class="text-sm text-gray-500 mt-1">${stat.description}</p>
            </div>
        `;
    }

    // Generate complete stats section HTML
    generateStatsSection() {
        const statsGrid = this.stats.map(stat => this.generateStatItem(stat)).join('');
        
        return `
            <h2 class="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">${this.sectionConfig.title}</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10 text-center leading-relaxed">
                ${this.sectionConfig.subtitle}
            </p>
            
            <!-- Stats Grid -->
            <div class="flex flex-wrap justify-center gap-12 sm:gap-16 md:gap-20 lg:gap-24">
                ${statsGrid}
            </div>
        `;
    }

    // Initialize and render the stats section
    init() {
        const statsContainer = document.getElementById('stats-content');
        if (statsContainer) {
            statsContainer.innerHTML = this.generateStatsSection();
            this.setupIntersectionObserver();
        } else {
            console.warn('Stats container not found. Make sure element with id="stats-content" exists.');
        }
    }

    // Set up intersection observer to trigger animation when section is visible
    setupIntersectionObserver() {
        const statsSection = document.getElementById('stats');
        if (!statsSection) return;

        const options = {
            root: null, // Use viewport as root
            rootMargin: '0px',
            threshold: 0.3 // Trigger when 30% of the section is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateStats();
                    this.hasAnimated = true; // Prevent re-animation
                }
            });
        }, options);

        observer.observe(statsSection);
    }

    // Animate numbers from 0 to target value
    animateStats() {
        const statNumbers = document.querySelectorAll('#stats-content .text-red-600');
        
        statNumbers.forEach((element) => {
            const finalText = element.textContent;
            const hasPlus = finalText.includes('+');
            const targetNumber = parseInt(finalText.replace(/[^0-9]/g, ''));
            
            // Set initial state to 0
            element.textContent = '0' + (hasPlus ? '+' : '');
            
            // Start number counting animation immediately
            this.animateNumber(element, 0, targetNumber, hasPlus, 3000); // 3 second duration
        });
    }

    // Animate individual number counting
    animateNumber(element, start, end, hasPlus, duration) {
        const range = end - start;
        const increment = Math.ceil(range / 120); // ~60 frames for smooth animation
        const stepTime = duration / 60;
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = current + (hasPlus ? '+' : '');
        }, stepTime);
    }

    // Method to update stats dynamically (for future use)
    updateStat(index, newValue, newLabel = null, newDescription = null) {
        if (index >= 0 && index < this.stats.length) {
            this.stats[index].value = newValue;
            if (newLabel) this.stats[index].label = newLabel;
            if (newDescription) this.stats[index].description = newDescription;
            this.init(); // Re-render
        }
    }

    // Method to add new stat
    addStat(value, label, description, color = "text-red-600") {
        this.stats.push({ value, label, description, color });
        this.init(); // Re-render
    }
}

// Initialize stats when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const communityStats = new CommunityStats();
    communityStats.init();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CommunityStats;
}
