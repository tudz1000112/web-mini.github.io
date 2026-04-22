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

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
    mobileNav.style.right = mobileNav.style.right === '0px' ? '-300px' : '0px';
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = mobileNav.style.right === '0px' ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)';
    spans[1].style.opacity = mobileNav.style.right === '0px' ? '0' : '1';
    spans[2].style.transform = mobileNav.style.right === '0px' ? 'rotate(-45deg) translate(5px, -5px)' : 'rotate(0)';
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.style.right = '-300px';
        // Reset hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0)';
    }
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
            mobileNav.style.right = '-300px';
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0)';
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(30, 41, 59, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'var(--bg-card)';
        header.style.backdropFilter = 'var(--blur)';
    }
});

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.card, .feature-item, .tool-card').forEach(el => {
    observer.observe(el);
});