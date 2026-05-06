document.addEventListener('DOMContentLoaded', () => {
    // Filter Logic
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
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // Modal Logic
    const modal = document.getElementById('carModal');
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

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close and scroll logic
    document.querySelector('.close-and-scroll').addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.car-card, .section-header, .filters, .hero-content, .feature-card, .contact-info, .contact-form').forEach(el => {
        observer.observe(el);
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.padding = '1rem 5%';
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.padding = '2rem 5%';
            nav.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)';
        }
    });

    // Back to Top Logic
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Dashboard Demo Logic
    window.openDashboardDemo = () => {
        alert("Solution Enterprise ERP: Développée par notre équipe d'Ingénieurs et Designers. Elle automatise vos contrats, gère votre flotte en temps réel et intègre vos paiements sécurisés. Contactez-nous pour une démonstration complète.");
    };
});
