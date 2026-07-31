
// Preloader
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 1000);

    // Initialize floating elements
    createFloatingElements();
});

// Create floating elements for background animation
function createFloatingElements() {
    const container = document.getElementById('floating-elements');
    const colors = [
        'rgba(212, 175, 55, 0.3)',
        'rgba(255, 46, 99, 0.3)',
        'rgba(10, 36, 99, 0.3)',
        'rgba(255, 255, 255, 0.3)'
    ];

    for (let i = 0; i < 30; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');

        // Random properties
        const size = Math.random() * 100 + 50;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100 + 100;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 10;
        const color = colors[Math.floor(Math.random() * colors.length)];

        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${posX}%`;
        element.style.top = `${posY}%`;
        element.style.background = color;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `-${delay}s`;

        container.appendChild(element);
    }
}

// Scroll animation trigger
const scrollElements = document.querySelectorAll('section');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
};

const displayScrollElement = (element) => {
    element.classList.add('visible');
};

const hideScrollElement = (element) => {
    element.classList.remove('visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else if (elementOutofView(el)) {
            hideScrollElement(el);
        }
    });
};

// Header scroll effect
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                contactForm.reset();
            } else {
                alert("Failed to send message.");
            }

        } catch (error) {
            console.error(error);
            alert("Could not connect to FastAPI.");
        }
    });
}
// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timeline = document.querySelector('.timeline');

const checkTimeline = () => {
    const timelineTop = timeline.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (timelineTop < windowHeight * 0.75) {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        });
        // Remove the event listener after animation triggers
        window.removeEventListener('scroll', checkTimeline);
    }
};

// Mobile menu toggle (for smaller screens)
const mobileMenuToggle = document.createElement('button');
mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
mobileMenuToggle.classList.add('mobile-menu-toggle');
mobileMenuToggle.style.display = 'none'; // Hidden by default

header.appendChild(mobileMenuToggle);

const nav = document.querySelector('nav ul');
mobileMenuToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// Handle responsive menu
function handleResponsiveMenu() {
    if (window.innerWidth <= 768) {
        mobileMenuToggle.style.display = 'block';
        nav.style.display = 'none';
    } else {
        mobileMenuToggle.style.display = 'none';
        nav.style.display = 'flex';
    }
}

// Initialize all animations on load
window.addEventListener('load', () => {
    handleScrollAnimation();
    handleResponsiveMenu();

    // Check if any sections are already in view on load
    scrollElements.forEach(el => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });

    // Initialize timeline animation
    window.addEventListener('scroll', checkTimeline);
});

// Initialize scroll animation
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Trigger once on page load to check initial positions
document.addEventListener('DOMContentLoaded', handleScrollAnimation);

