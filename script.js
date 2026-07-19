// =========================================================================
// 1. KHỞI TẠO THƯ VIỆN HIỆU ỨNG CUỘN TRANG AOS
// =========================================================================
AOS.init({
    once: false, 
    mirror: true,
    duration: 800, // Thêm thời gian chạy hiệu ứng mặc định (800ms) cho mượt hơn
    easing: 'ease-out-quad'
});

// =========================================================================
// 2. HIỆU ỨNG SỐ CHẠY TỰ ĐỘNG (COUNTER ANIMATION NÂNG CẤP)
// =========================================================================
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const suffix = target === 100 ? '%' : '+'; // Tự nhận diện hậu tố dựa trên mốc (100 là %, còn lại là +)
    const duration = 2000; // Tổng thời gian chạy hiệu ứng cố định là 2 giây (2000ms)
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
            // Thuật toán Ease-Out: Chạy nhanh lúc đầu, chậm dần về sau giúp hiệu ứng mượt mà
            const progress = elapsedTime / duration;
            const easeOutProgress = 1 - Math.pow(1 - progress, 3); 
            const currentValue = Math.floor(easeOutProgress * target);
            
            counter.innerText = currentValue + suffix;
            requestAnimationFrame(updateNumber); // Thay thế setTimeout bằng requestAnimationFrame để tối ưu FPS
        } else {
            counter.innerText = target + suffix; // Đảm bảo số cuối cùng chuẩn xác
        }
    };
    requestAnimationFrame(updateNumber);
};

// Sử dụng IntersectionObserver để tự động kích hoạt khi phần tử xuất hiện trên màn hình
const counterBar = document.querySelector('.counter-bar');
if (counterBar) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                observer.unobserve(entry.target); // Chạy 1 lần duy nhất rồi dừng theo dõi
            }
        });
    }, { threshold: 0.3 }); // Hiện được 30% khối thì bắt đầu chạy hiệu ứng
    observer.observe(counterBar);
}

// =========================================================================
// 3. NÚT BACK TO TOP KÈM VÒNG TRÒN TIẾN TRÌNH (PROGRESS RING)
// =========================================================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    // Tính toán tỷ lệ phần trăm đã cuộn trang
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    
    // Cập nhật biến CSS để vẽ vòng tròn (Cần thêm CSS phía dưới)
    if (scrollTopBtn) {
        scrollTopBtn.style.setProperty('--scroll-progress', `${progress}%`);
        
        // Ẩn/Hiện nút mượt mà khi cuộn quá 400px
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
});

// Click cuộn lên đầu trang mượt mà
scrollTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});