// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for Fade-In Animations
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Interactive blob tracking with mouse (subtle effect)
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Move blobs slightly opposite to mouse
        blob1.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
        blob2.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    });

    // Language Toggle Logic
    const langBtn = document.getElementById('lang-toggle');
    const i18nElements = document.querySelectorAll('[data-i18n]');
    let currentLang = 'en'; // default

    function updateLanguage(lang) {
        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        
        if (lang === 'en') {
            langBtn.textContent = 'TR';
        } else {
            langBtn.textContent = 'EN';
        }
    }

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'tr' : 'en';
        updateLanguage(currentLang);
    });

    // Initialize with default
    updateLanguage(currentLang);

    // Poems Logic
    const poemsGrid = document.getElementById('poems-grid');
    const poemModal = document.getElementById('poem-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-btn');

    if (poemsGrid && typeof poems !== 'undefined') {
        poems.forEach((poem) => {
            const card = document.createElement('div');
            card.className = 'poem-card glass-card';
            
            const title = document.createElement('h3');
            title.textContent = poem.title;
            
            const author = document.createElement('p');
            author.className = 'poem-author';
            author.textContent = poem.author;
            
            const preview = document.createElement('p');
            preview.className = 'poem-preview';
            preview.textContent = poem.content;
            
            card.appendChild(title);
            card.appendChild(author);
            card.appendChild(preview);
            
            card.addEventListener('click', () => {
                modalTitle.textContent = poem.title + ' - ' + poem.author;
                modalBody.textContent = poem.content;
                poemModal.classList.add('active');
            });
            
            poemsGrid.appendChild(card);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            poemModal.classList.remove('active');
        });
    }

    if (poemModal) {
        poemModal.addEventListener('click', (e) => {
            if (e.target === poemModal) {
                poemModal.classList.remove('active');
            }
        });
    }

    // Poems Scroll Logic
    const poemsScrollLeft = document.getElementById('poems-scroll-left');
    const poemsScrollRight = document.getElementById('poems-scroll-right');
    
    if (poemsGrid && poemsScrollLeft && poemsScrollRight) {
        poemsScrollLeft.addEventListener('click', () => {
            const card = poemsGrid.querySelector('.poem-card');
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = parseFloat(getComputedStyle(poemsGrid).gap) || 32; // fallback to 32px (2rem)
                poemsGrid.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
            }
        });

        poemsScrollRight.addEventListener('click', () => {
            const card = poemsGrid.querySelector('.poem-card');
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = parseFloat(getComputedStyle(poemsGrid).gap) || 32;
                poemsGrid.scrollBy({ left: (cardWidth + gap), behavior: 'smooth' });
            }
        });
    }

    // Albums Scroll Logic
    const albumsScrollLeft = document.getElementById('albums-scroll-left');
    const albumsScrollRight = document.getElementById('albums-scroll-right');
    const albumsGrid = document.getElementById('albums-grid');
    
    if (albumsGrid && albumsScrollLeft && albumsScrollRight) {
        albumsScrollLeft.addEventListener('click', () => {
            const card = albumsGrid.querySelector('.album-card');
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = parseFloat(getComputedStyle(albumsGrid).gap) || 32;
                albumsGrid.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
            }
        });

        albumsScrollRight.addEventListener('click', () => {
            const card = albumsGrid.querySelector('.album-card');
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = parseFloat(getComputedStyle(albumsGrid).gap) || 32;
                albumsGrid.scrollBy({ left: (cardWidth + gap), behavior: 'smooth' });
            }
        });
    }
});
