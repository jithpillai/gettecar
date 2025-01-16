// Counter Animation Setup
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    function animateCounter(counterElement, targetValue) {
        // Prevent re-animation
        if (counterElement.dataset.animated === 'true') return;
        counterElement.dataset.animated = 'true';

        const startValue = 0;
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuad = t => t * (2 - t);
            const easedProgress = easeOutQuad(progress);

            const currentValue = Math.round(startValue + (targetValue - startValue) * easedProgress);
            counterElement.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Initialize all counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        observer.observe(counter);
    });
});