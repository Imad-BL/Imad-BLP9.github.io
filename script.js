document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            if (!document.body.classList.contains('showroom-body')) {
                nav.classList.remove('scrolled');
            }
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                if (entry.target.classList.contains('stagger-container')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.1}s`;
                        child.classList.add('reveal');
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate, .stagger-container').forEach(el => {
        observer.observe(el);
    });

    // Filter Logic with Animation
    const filterBtns = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            carCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // Modal Logic
    const modal = document.getElementById('carModal');
    if (modal) {
        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalSpecs = document.getElementById('modalSpecs');
        const closeModal = document.querySelector('.close-modal');

        const carData = {
            'Mercedes-Benz Classe G': {
                img: 'assets/cars/mercedes/classe-g/main.png',
                specs: { 'Moteur': 'V8 Biturbo', 'Puissance': '585 ch', '0-100 km/h': '4.5s', 'Transmission': '4MATIC' }
            },
            'Range Rover Evoque': {
                img: 'assets/cars/range-rover/evoque/main.png',
                specs: { 'Moteur': '2.0L Turbo', 'Puissance': '249 ch', 'Confort': 'Premium', 'Terrain': 'All-Wheel' }
            },
            'Volkswagen Golf 8': {
                img: 'assets/cars/volkswagen/golf-8/main.png',
                specs: { 'Moteur': '2.0 TDI', 'Puissance': '150 ch', 'Conso': '4.5L/100', 'Techno': 'IQ.Light' }
            },
            'Peugeot 3008': {
                img: 'assets/cars/peugeot/3008/main.png',
                specs: { 'Moteur': 'PureTech', 'Puissance': '130 ch', 'Cockpit': 'i-Cockpit', 'Aides': 'Niv 2' }
            },
            'Hyundai Tucson': {
                img: 'assets/cars/hyundai/tucson/main.png',
                specs: { 'Moteur': 'Hybrid', 'Puissance': '230 ch', 'Espace': 'XL', 'Garantie': '5 ans' }
            },
            'Volkswagen Tiguan': {
                img: 'assets/cars/volkswagen/tiguan/main.png',
                specs: { 'Moteur': '2.0 TDI', 'Puissance': '150 ch', 'Mode': '4Motion', 'Toit': 'Panoramique' }
            }
        };

        carCards.forEach(card => {
            card.addEventListener('click', () => {
                const carName = card.querySelector('.car-name').innerText;
                const data = carData[carName];

                if (data) {
                    modalImg.src = data.img;
                    modalTitle.innerText = carName;
                    modalSpecs.innerHTML = '';
                    
                    Object.entries(data.specs).forEach(([key, value]) => {
                        modalSpecs.innerHTML += `
                            <div class="modal-spec">
                                <span>${key}</span>
                                <span>${value}</span>
                            </div>
                        `;
                    });

                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Back to Top
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 800) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.transform = 'translateY(0)';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.transform = 'translateY(20px)';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
