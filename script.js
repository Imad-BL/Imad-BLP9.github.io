
    /* ═══════════════════════════════
       1. SCROLL PROGRESS BAR
    ═══════════════════════════════ */
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg, var(--morocco-red), var(--morocco-green));z-index:9999;width:0%;transition:width 0.1s;`;
    document.body.appendChild(progressBar);
    window.addEventListener('scroll', () => {
        const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = pct + '%';
    });

    /* ═══════════════════════════════
       2. NAVBAR SCROLL + MOBILE MENU
    ═══════════════════════════════ */
    const nav = document.getElementById('mainNav');

    // Add hamburger button if not present
    if (nav && !document.getElementById('hamburger')) {
        const burger = document.createElement('button');
        burger.id = 'hamburger';
        burger.innerHTML = '<i class="fas fa-bars"></i>';
        burger.style.cssText = `display:none;background:transparent;border:1px solid rgba(212,175,55,0.4);color:var(--primary);padding:0.5rem 0.8rem;border-radius:4px;cursor:pointer;font-size:1rem;`;
        nav.appendChild(burger);

        // Mobile overlay menu
        const mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobileMenu';
        mobileMenu.style.cssText = `display:none;position:fixed;top:0;left:0;width:100%;height:100vh;background:rgba(5,5,5,0.98);z-index:9000;flex-direction:column;align-items:center;justify-content:center;gap:2rem;`;
        mobileMenu.innerHTML = `
            <button id="closeMenu" style="position:absolute;top:2rem;right:5%;background:transparent;border:none;color:#fff;font-size:2rem;cursor:pointer;"><i class="fas fa-times"></i></button>
            <a href="#home" class="mob-link">Accueil</a>
            <a href="#fleet" class="mob-link">Expérience</a>
            <a href="#pricing" class="mob-link">Solutions 2030</a>
            <a href="demo/hub.html" class="mob-link">Démo Live</a>
            <a href="#contact" class="mob-link">Contact</a>
            <a href="#contact" style="margin-top:1rem;padding:1rem 2.5rem;background:var(--morocco-red);color:#fff;font-weight:800;font-size:0.9rem;text-decoration:none;letter-spacing:2px;text-transform:uppercase;">Démarrer</a>
        `;
        document.body.appendChild(mobileMenu);

        // Style mobile links
        const style = document.createElement('style');
        style.textContent = `.mob-link{color:#fff;text-decoration:none;font-size:1.8rem;font-weight:800;letter-spacing:3px;text-transform:uppercase;transition:color 0.3s;} .mob-link:hover{color:var(--primary);}`;
        document.head.appendChild(style);

        burger.addEventListener('click', () => {
            mobileMenu.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        document.getElementById('closeMenu').addEventListener('click', () => {
            mobileMenu.style.display = 'none';
            document.body.style.overflow = '';
        });
        mobileMenu.querySelectorAll('.mob-link, a:last-child').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.display = 'none';
                document.body.style.overflow = '';
            });
        });

        // Show burger on mobile
        const checkBurger = () => {
            burger.style.display = window.innerWidth <= 768 ? 'block' : 'none';
        };
        checkBurger();
        window.addEventListener('resize', checkBurger);
    }

    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                nav.classList.add('scrolled');
            } else {
                if (!document.body.classList.contains('showroom-body')) {
                    nav.classList.remove('scrolled');
                }
            }
        });
    }

    /* ═══════════════════════════════
       3. INTERSECTION OBSERVER ANIMATIONS
    ═══════════════════════════════ */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                if (entry.target.classList.contains('stagger-container')) {
                    Array.from(entry.target.children).forEach((child, i) => {
                        child.style.transitionDelay = `${i * 0.1}s`;
                        child.classList.add('reveal');
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate, .stagger-container').forEach(el => observer.observe(el));

    /* ═══════════════════════════════
       4. ANIMATED COUNTERS
    ═══════════════════════════════ */
    function animateCounter(el, target, suffix = '') {
        let start = 0;
        const duration = 2000;
        const step = 16;
        const increment = target / (duration / step);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                el.textContent = target.toLocaleString('fr-FR') + suffix;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(start).toLocaleString('fr-FR') + suffix;
            }
        }, step);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const suffix = el.dataset.suffix || '';
                animateCounter(el, target, suffix);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

    /* ═══════════════════════════════
       5. TYPING EFFECT
    ═══════════════════════════════ */
    const typeTarget = document.getElementById('typeText');
    if (typeTarget) {
        const words = ['Innovation', 'Maroc 2030', 'Prestige', 'Tourisme'];
        let wi = 0, ci = 0, deleting = false;
        function type() {
            const word = words[wi];
            typeTarget.textContent = deleting ? word.substring(0, ci--) : word.substring(0, ci++);
            if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1800); return; }
            if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; }
            setTimeout(type, deleting ? 60 : 120);
        }
        type();
    }

    /* ═══════════════════════════════
       6. CAR CARD FILTER
    ═══════════════════════════════ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            carCards.forEach(card => {
                const cats = card.getAttribute('data-category') || '';
                const show = filter === 'all' || cats.includes(filter);
                card.style.transition = 'opacity 0.4s, transform 0.4s';
                if (show) {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95) translateY(10px)';
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => { card.style.display = 'none'; }, 400);
                }
            });
        });
    });

    /* ═══════════════════════════════
       7. CAR MODAL
    ═══════════════════════════════ */
    const modal = document.getElementById('carModal');
    if (modal) {
        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalSpecs = document.getElementById('modalSpecs');
        const closeModal = document.querySelector('.close-modal');

        const carData = {
            'Mercedes-Benz Classe G': { img: 'assets/cars/mercedes/classe-g/main.png', specs: { 'Moteur': 'V8 Biturbo 4.0L', 'Puissance': '585 ch', '0–100 km/h': '4.5s', 'Transmission': '4MATIC+' }, price: '1,500 MAD/j' },
            'Range Rover Evoque': { img: 'assets/cars/range-rover/evoque/main.png', specs: { 'Moteur': '2.0L Turbo', 'Puissance': '249 ch', 'Confort': 'Premium', 'Terrain': 'All-Wheel' }, price: '900 MAD/j' },
            'Volkswagen Golf 8': { img: 'assets/cars/volkswagen/golf-8/main.png', specs: { 'Moteur': '2.0 TDI', 'Puissance': '150 ch', 'Conso': '4.5L/100', 'Techno': 'IQ.Light' }, price: '450 MAD/j' },
            'Peugeot 3008': { img: 'assets/cars/peugeot/3008/main.png', specs: { 'Moteur': 'PureTech 130', 'Puissance': '130 ch', 'Cockpit': 'i-Cockpit', 'Norme': 'Euro 6' }, price: '400 MAD/j' },
            'Hyundai Tucson': { img: 'assets/cars/hyundai/tucson/main.png', specs: { 'Moteur': 'Hybrid', 'Puissance': '230 ch', 'Espace': 'XL Famille', 'Garantie': '5 ans' }, price: '380 MAD/j' },
            'Volkswagen Tiguan': { img: 'assets/cars/volkswagen/tiguan/main.png', specs: { 'Moteur': '2.0 TDI', 'Puissance': '150 ch', 'Mode': '4Motion', 'Toit': 'Panoramique' }, price: '420 MAD/j' }
        };

        carCards.forEach(card => {
            card.addEventListener('click', () => {
                const name = card.querySelector('.car-name')?.innerText;
                const data = carData[name];
                if (!data) return;
                modalImg.src = data.img;
                modalTitle.innerText = name;
                modalSpecs.innerHTML = Object.entries(data.specs).map(([k, v]) =>
                    `<div class="modal-spec"><span>${k}</span><span>${v}</span></div>`
                ).join('');
                // Add price if not already there
                const existingPrice = modal.querySelector('.modal-price');
                if (existingPrice) existingPrice.remove();
                const priceEl = document.createElement('div');
                priceEl.className = 'modal-price';
                priceEl.style.cssText = 'margin-top:1.5rem;padding:1rem;background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.3);border-radius:8px;text-align:center;font-size:1.2rem;font-weight:800;color:var(--primary);';
                priceEl.innerHTML = `À partir de <strong>${data.price}</strong>`;
                modalSpecs.after(priceEl);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                setTimeout(() => modal.querySelector('.modal-content').style.transform = 'scale(1)', 10);
            });
        });

        [closeModal].forEach(el => el?.addEventListener('click', closeModalFn));
        window.addEventListener('click', e => { if (e.target === modal) closeModalFn(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalFn(); });
        function closeModalFn() { modal.style.display = 'none'; document.body.style.overflow = ''; }

        // Close and scroll
        document.querySelectorAll('.close-and-scroll').forEach(btn => {
            btn.addEventListener('click', () => {
                closeModalFn();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    /* ═══════════════════════════════
       8. SMOOTH SCROLL
    ═══════════════════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ═══════════════════════════════
       9. BACK TO TOP
    ═══════════════════════════════ */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.style.display = 'flex';
        backToTop.style.opacity = '0';
        backToTop.style.transform = 'translateY(20px)';
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.transform = 'translateY(20px)';
            }
        });
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ═══════════════════════════════
       10. PRICE CARD HOVER 3D TILT
    ═══════════════════════════════ */
    document.querySelectorAll('.price-card, .feature-card, .module-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
            card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s ease';
        });
    });

    /* ═══════════════════════════════
       11. FLOATING PARTICLES (hero only)
    ═══════════════════════════════ */
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 18; i++) {
            const p = document.createElement('div');
            const size = Math.random() * 4 + 1;
            p.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(212,175,55,${Math.random() * 0.4 + 0.1});top:${Math.random()*100}%;left:${Math.random()*100}%;animation:floatParticle ${Math.random()*8+6}s ease-in-out infinite;animation-delay:${Math.random()*5}s;pointer-events:none;z-index:1;`;
            hero.appendChild(p);
        }
        if (!document.getElementById('particleStyle')) {
            const ps = document.createElement('style');
            ps.id = 'particleStyle';
            ps.textContent = `@keyframes floatParticle{0%,100%{transform:translateY(0) translateX(0) scale(1);opacity:0.5;}50%{transform:translateY(-40px) translateX(20px) scale(1.3);opacity:1;}}`;
            document.head.appendChild(ps);
        }
    }

    /* ═══════════════════════════════
       12. ACTIVE NAV LINK HIGHLIGHT
    ═══════════════════════════════ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const activateLink = () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        navLinks.forEach(a => {
            a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--primary)' : '';
            a.style.opacity = a.getAttribute('href') === `#${current}` ? '1' : '';
        });
    };
    window.addEventListener('scroll', activateLink);

});
