// Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('span');
            icon.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('span').textContent = '☰';
            });
        });

        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Image slider functionality
        let slideIndex = 1;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.nav-dot');

        function showSlide(n) {
            if (n > slides.length) slideIndex = 1;
            if (n < 1) slideIndex = slides.length;
            
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[slideIndex - 1].classList.add('active');
            dots[slideIndex - 1].classList.add('active');
        }

        function currentSlide(n) {
            slideIndex = n;
            showSlide(slideIndex);
        }

        // Auto slide
        setInterval(() => {
            slideIndex++;
            showSlide(slideIndex);
        }, 5000);

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Form submission
        const contactForm = document.getElementById('contactForm');
        const notification = document.getElementById('notification');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show notification
            notification.classList.add('show');
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
            
            // Reset form
            contactForm.reset();
        });

        // Active navigation link highlighting
        const sections = document.querySelectorAll('section');
        const navMenuLinks = document.querySelectorAll('.nav-menu a');

        window.addEventListener('scroll', () => {
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (scrollY >= sectionTop) {
                    currentSection = section.getAttribute('id');
                }
            });

            navMenuLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loading');
                }
            });
        }, observerOptions);

        // Observe all sections
        sections.forEach(section => {
            observer.observe(section);
        });
