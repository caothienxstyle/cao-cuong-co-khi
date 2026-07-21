AOS.init({
    once: false, 
    mirror: true,
    duration: 800, 
    easing: 'ease-out-quad'
});

const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const suffix = target === 100 ? '%' : '+'; 
    const duration = 2000; 
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            const easeOutProgress = 1 - Math.pow(1 - progress, 3); 
            const currentValue = Math.floor(easeOutProgress * target);
            
            counter.innerText = currentValue + suffix;
            requestAnimationFrame(updateNumber); 
        } else {
            counter.innerText = target + suffix; 
        }
    };
    requestAnimationFrame(updateNumber);
};

const counterBar = document.querySelector('.counter-bar');
if (counterBar) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.3 }); 
    observer.observe(counterBar);
}

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
        if (scrollTopBtn) {
        scrollTopBtn.style.setProperty('--scroll-progress', `${progress}%`);
                if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
});
scrollTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

