                // Menu mobile
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Gestion du mode sombre
        const themeToggle = document.getElementById('themeToggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Synchroniser avec le thème de la page principale
        function syncTheme() {
            const savedTheme = localStorage.getItem('theme');
            const systemPrefersDark = prefersDarkScheme.matches;
            const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
            
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        }

        // Appliquer le thème au chargement
        syncTheme();

        // Basculer le thème
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = 'light';
            
            if (currentTheme !== 'dark') {
                newTheme = 'dark';
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            
            localStorage.setItem('theme', newTheme);
        });

        // Écouter les changements de thème depuis d'autres pages
        window.addEventListener('storage', function(e) {
            if (e.key === 'theme') {
                syncTheme();
            }
        });

        // Fonction pour changer l'image principale de la galerie
        function changeImage(src) {
            document.getElementById('main-image').src = src;
            
            // Mettre à jour les thumbnails actifs
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach(thumb => {
                thumb.classList.remove('active');
            });
            
            event.currentTarget.classList.add('active');
        }
        
        // Animation au défilement pour la navigation
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.style.boxShadow = '0 2px 10px var(--shadow)';
                nav.style.background = 'var(--nav-bg)';
            } else {
                nav.style.boxShadow = 'none';
                nav.style.background = 'transparent';
            }
        });

        // Animation des éléments au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observer les éléments à animer
        document.querySelectorAll('.gallery-item, .color-item, .application-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Gestion des accordéons
        document.querySelectorAll('details').forEach(detail => {
            detail.addEventListener('toggle', function() {
                if (this.open) {
                    this.style.background = 'var(--card-bg)';
                } else {
                    this.style.background = 'var(--light)';
                }
            });
        });
              
        // Validation du formulaire de contact
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Validation du nom
            if (name.value.trim() === '') {
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('nameError').style.display = 'none';
            }
            
            // Validation de l'email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('emailError').style.display = 'none';
            }
            
            // Validation du message
            if (message.value.trim() === '') {
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('messageError').style.display = 'none';
            }
            
            // Si le formulaire est valide, on peut l'envoyer
            if (isValid) {
                // Ici, vous ajouteriez le code pour envoyer le formulaire
                alert('Votre message a été envoyé avec succès !');
                this.reset();
            }
        });