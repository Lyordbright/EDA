
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Show hero content after a brief delay
    setTimeout(function () {
        document.getElementById('hero-content').classList.add('appear');
    }, 300);

    // Animate the program card in the hero section
    setTimeout(function () {
        document.querySelector('.scale-in').classList.add('appear');
    }, 800);

    // Initialize intersection observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');

                // If it's a counter, animate the counting
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .counter').forEach(el => {
        observer.observe(el);
    });



    // Scroll to top functionality
    document.getElementById('scroll-to-top').addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Counter animation function
    function animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-target'));
        const duration = 2000; // Animation duration in ms
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        // If already counted, skip
        if (element.classList.contains('counted')) return;

        const counter = setInterval(function () {
            frame++;

            // Calculate current value
            const progress = frame / totalFrames;
            const currentValue = Math.round(target * progress);

            // Update element
            if (element.id === 'counter-1') {
                element.textContent = currentValue.toFixed(1);
            } else {
                element.textContent = currentValue;
            }

            // Add plus sign if needed
            if (element.id === 'counter-2' && currentValue === target) {
                element.textContent = element.textContent + '+';
            }

            // Add percentage if needed
            if (element.id === 'counter-3' && currentValue === target) {
                element.textContent = element.textContent + '%';
            }

            // Add hours text if needed
            if (element.id === 'counter-4' && currentValue === target) {
                element.textContent = element.textContent + 'h';
            }

            // Check if complete
            if (frame === totalFrames) {
                clearInterval(counter);
                element.classList.add('counted');
            }
        }, frameDuration);
    }

    // Simple form validation
    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your message! We will contact you shortly.');
        this.reset();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});