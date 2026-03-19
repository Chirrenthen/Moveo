// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        const nav = document.querySelector('.nav-links');
        const burger = document.querySelector('.burger');
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});

// --- Search and Filter Logic ---

const destinationSearch = document.getElementById('destinationSearch');
const mainSearchBtn = document.getElementById('mainSearchBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card[data-category]');
const noResults = document.getElementById('noResults');

let currentFilter = 'all';
let searchQuery = '';

const filterDestinations = () => {
    let visibleCardsCount = 0;

    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const name = card.getAttribute('data-name').toLowerCase();
        
        const matchesFilter = currentFilter === 'all' || category === currentFilter;
        const matchesSearch = name.includes(searchQuery.toLowerCase());

        if (matchesFilter && matchesSearch) {
            card.classList.remove('hide');
            visibleCardsCount++;
        } else {
            card.classList.add('hide');
        }
    });

    noResults.style.display = visibleCardsCount === 0 ? 'block' : 'none';
};

// Filter Button Click
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        filterDestinations();
    });
});

// Search Input Logic
destinationSearch.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    filterDestinations();
});

mainSearchBtn.addEventListener('click', () => {
    searchQuery = destinationSearch.value;
    filterDestinations();
    document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
});

// --- Intersection Observer for reveal animations ---
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries, revealOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        revealOnScroll.unobserve(entry.target);
    });
}, revealOptions);

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.8s ease-out";
    revealOnScroll.observe(section);
});

const style = document.createElement('style');
style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

navSlide();
