// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load theme from localStorage
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    
    if (body.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Color Theme Switcher
const colorButtons = document.querySelectorAll('.color-btn');
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        body.className = body.className.replace(/theme-\d+/, '');
        body.classList.add(`theme-${theme}`);
        
        // Save color theme
        localStorage.setItem('colorTheme', theme);
    });
});

// Load color theme from localStorage
const savedColorTheme = localStorage.getItem('colorTheme');
if (savedColorTheme) {
    body.className = body.className.replace(/theme-\d+/, '');
    body.classList.add(`theme-${savedColorTheme}`);
}

// Dark Overlay Toggle
const overlayToggle = document.getElementById('overlayToggle');
const darkOverlay = document.getElementById('darkOverlay');

overlayToggle.addEventListener('click', () => {
    darkOverlay.classList.toggle('active');
    overlayToggle.innerHTML = darkOverlay.classList.contains('active') 
        ? '<i class="fas fa-eye-slash"></i>' 
        : '<i class="fas fa-eye"></i>';
});

// Glassmorphism Toggle
const glassToggle = document.getElementById('glassToggle');
glassToggle.addEventListener('click', () => {
    body.classList.toggle('glassmorphism');
    glassToggle.innerHTML = body.classList.contains('glassmorphism') 
        ? '<i class="fas fa-glass-water-slash"></i>' 
        : '<i class="fas fa-glass-water"></i>';
});

// Animation Toggle
const animationToggle = document.getElementById('animationToggle');
animationToggle.addEventListener('click', () => {
    body.classList.toggle('no-animations');
    animationToggle.innerHTML = body.classList.contains('no-animations') 
        ? '<i class="fas fa-play"></i>' 
        : '<i class="fas fa-pause"></i>';
});

// Matrix Effect Toggle
const matrixToggle = document.getElementById('matrixToggle');
const matrixCanvas = document.getElementById('matrixCanvas');
const matrixCtx = matrixCanvas.getContext('2d');

matrixToggle.addEventListener('click', () => {
    matrixCanvas.classList.toggle('active');
    matrixToggle.innerHTML = matrixCanvas.classList.contains('active') 
        ? '<i class="fas fa-stop"></i>' 
        : '<i class="fas fa-code"></i>';
    
    if (matrixCanvas.classList.contains('active')) {
        initMatrix();
    }
});

// Matrix Rain Effect
function initMatrix() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = matrixCanvas.width / fontSize;
    
    const drops = [];
    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        if (!matrixCanvas.classList.contains('active')) return;
        
        matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        matrixCtx.fillStyle = '#0F0';
        matrixCtx.font = fontSize + 'px monospace';
        
        for(let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if(drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(draw, 35);
    
    matrixCanvas.addEventListener('click', () => {
        clearInterval(matrixInterval);
        matrixCanvas.classList.remove('active');
        matrixToggle.innerHTML = '<i class="fas fa-code"></i>';
    });
}

// Random Background Color
const randomBg = document.getElementById('randomBg');
randomBg.addEventListener('click', () => {
    const colors = [
        'linear-gradient(135deg, #667eea, #764ba2)',
        'linear-gradient(135deg, #f093fb, #f5576c)',
        'linear-gradient(135deg, #4facfe, #00f2fe)',
        'linear-gradient(135deg, #43e97b, #38f9d7)',
        'linear-gradient(135deg, #fa709a, #fee140)',
        'linear-gradient(135deg, #30cfd0, #330867)',
        'linear-gradient(135deg, #a8edea, #fed6e3)',
        'linear-gradient(135deg, #ff9a9e, #fecfef)',
        'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
        'linear-gradient(135deg, #fdcbf1, #e6dee9)'
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;
    
    showToast('Màu nền đã được thay đổi!', 'success');
});

// Font Toggle
const fontToggle = document.getElementById('fontToggle');
const fontFamilies = ['sans-serif', 'serif', 'mono'];
let currentFontIndex = 0;

fontToggle.addEventListener('click', () => {
    currentFontIndex = (currentFontIndex + 1) % fontFamilies.length;
    const fontClass = fontFamilies[currentFontIndex] === 'sans-serif' ? '' : 
                    fontFamilies[currentFontIndex] === 'serif' ? 'font-serif' : 'font-mono';
    
    body.className = body.className.replace(/font-(sans|serif|mono)/g, '');
    if (fontClass) body.classList.add(fontClass);
    
    fontToggle.innerHTML = fontFamilies[currentFontIndex] === 'sans-serif' ? '<i class="fas fa-font"></i>' :
                         fontFamilies[currentFontIndex] === 'serif' ? '<i class="fas fa-feather"></i>' : 
                         '<i class="fas fa-code"></i>';
    
    showToast(`Font đã thay đổi thành ${fontFamilies[currentFontIndex]}`, 'info');
});

// Font Size Controls
const fontSizeUp = document.getElementById('fontSizeUp');
const fontSizeDown = document.getElementById('fontSizeDown');
let currentFontSize = 16;

fontSizeUp.addEventListener('click', () => {
    currentFontSize = Math.min(currentFontSize + 2, 24);
    document.documentElement.style.setProperty('--font-size', `${currentFontSize}px`);
    showToast('Kích thước font đã tăng', 'info');
});

fontSizeDown.addEventListener('click', () => {
    currentFontSize = Math.max(currentFontSize - 2, 12);
    document.documentElement.style.setProperty('--font-size', `${currentFontSize}px`);
    showToast('Kích thước font đã giảm', 'info');
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
    mobileNav.style.right = mobileNav.style.right === '0px' ? '-320px' : '0px';
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = mobileNav.style.right === '0px' ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)';
    spans[1].style.opacity = mobileNav.style.right === '0px' ? '0' : '1';
    spans[2].style.transform = mobileNav.style.right === '0px' ? 'rotate(-45deg) translate(5px, -5px)' : 'rotate(0)';
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.style.right = '-320px';
        // Reset hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0)';
    }
});

// Accordion
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        // Close other items
        accordionItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile nav
            mobileNav.style.right = '-320px';
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0)';
        }
    });
});

// Scroll to Top/Bottom
const scrollTop = document.getElementById('scrollTop');
const scrollBottom = document.getElementById('scrollBottom');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTop.classList.add('show');
        scrollBottom.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
        scrollBottom.classList.remove('show');
    }
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(17, 24, 39, 0.95)';
        header.style.backdropFilter = 'blur(24px)';
        header.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'var(--bg-card)';
        header.style.backdropFilter = 'var(--blur)';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollBottom.addEventListener('click', () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});

// Toast Notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    toast.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}

// Loading Spinner
const loadingSpinner = document.getElementById('loadingSpinner');

function showLoading() {
    loadingSpinner.classList.add('show');
}

function hideLoading() {
    loadingSpinner.classList.remove('show');
}

// Demo loading spinner
setTimeout(() => {
    showLoading();
    setTimeout(() => {
        hideLoading();
        showToast('Trang web đã tải xong!', 'success');
    }, 2000);
}, 1000);

// 3D Button hover effects
document.querySelectorAll('.3d-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateZ(35px) rotateX(-8deg)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateZ(0) rotateX(0)';
    });
});

// Feature card hover effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateZ(25px) rotateX(-5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateZ(0) rotateX(0)';
    });
});

// Social button hover effects
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.2)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Card animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
}, observerOptions);

// Observe card
document.querySelector('.card').style.animation = 'fadeInUp 1s ease forwards';

// Add parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const card = document.querySelector('.card');
    if (card) {
        card.style.transform = `translateY(${scrolled * 0.4}px) perspective(1200px) rotateX(8deg)`;
    }
    
    // Animate glow effect
    const glow = document.querySelector('.glow-effect');
    if (glow) {
        glow.style.transform = `translate(${scrolled * 0.3}px, ${scrolled * 0.2}px)`;
    }
});

// Button click effects
document.querySelectorAll('.btn, .3d-btn, .social-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect style
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize animations on load
window.addEventListener('load', () => {
    // Animate elements
    document.querySelectorAll('.card, .feature-card, .3d-btn').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        setTimeout(() => {
            el.style.transition = 'all 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
});
