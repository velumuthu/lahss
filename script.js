// Global variables
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.nav-dot');

        // Initialize the website
        document.addEventListener('DOMContentLoaded', function() {
            initializeSlider();
            initializeCounters();
            initializeScrollEffects();
            initializeMobileMenu();
            initializeNavigation();
            initializeForm();
        });

        // Slider functionality
        function initializeSlider() {
            setInterval(() => {
                nextSlide();
            }, 5000);
        }

        function currentSlide(n) {
            showSlide(currentSlideIndex = n - 1);
        }

        function nextSlide() {
            showSlide(currentSlideIndex = (currentSlideIndex + 1) % slides.length);
        }

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[n].classList.add('active');
            dots[n].classList.add('active');
        }

        // Counter animation
        function initializeCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const observerOptions = {
                threshold: 0.5,
                rootMargin: '0px 0px -100px 0px'
            };

            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            counters.forEach(counter => {
                counterObserver.observe(counter);
            });
        }

        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 16);
        }

        // Scroll effects
        function initializeScrollEffects() {
            const header = document.getElementById('header');
            const backToTop = document.getElementById('backToTop');
            
            window.addEventListener('scroll', () => {
                // Header scroll effect
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                    backToTop.classList.add('visible');
                } else {
                    header.classList.remove('scrolled');
                    backToTop.classList.remove('visible');
                }

                // Update active navigation
                updateActiveNavigation();
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

            // Observe elements for animation
            document.querySelectorAll('.class-card, .facility-card, .feature-item, .contact-item, .news-card, .gallery-item').forEach(el => {
                observer.observe(el);
            });
        }

        // Mobile menu
        function initializeMobileMenu() {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navMenu = document.getElementById('navMenu');

            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
            });

            // Close mobile menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                });
            });
        }

        // Navigation
        function initializeNavigation() {
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
        }

        function updateActiveNavigation() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // Form handling
        function initializeForm() {
            const form = document.getElementById('contactForm');
            form.addEventListener('submit', handleFormSubmit);
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Message sent successfully! We will get back to you soon.', 'success');
                document.getElementById('contactForm').reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
        }

        // Utility functions
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        function showNotification(message, type = 'info') {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = `notification show ${type}`;
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 4000);
        }

        // Modal functions
        function showModal(type, data = {}) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');

    // Apply scrollable styling via JavaScript
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '9999'
    });

    Object.assign(modalContent.style, {
        background: '#fff',
        padding: '2rem',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflowY: 'auto',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
    });

    let content = '';

    switch (type) {
        case 'privacy':
            content = `
                <button onclick="document.getElementById('modal').style.display='none'" style="float:right;font-size:1.5rem;border:none;background:none;cursor:pointer;">&times;</button>
                <h2>Privacy Policy</h2>
                <p>At Lourdu Annai Higher School, we are committed to protecting your privacy and personal information. This policy outlines how we collect, use, and protect your data.</p>
                <h3>Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you fill out forms, contact us, or register for events.</p>
                <h3>How We Use Information</h3>
                <p>We use the information to communicate with you, provide services, and improve our educational programs.</p>
                <h3>Contact Us</h3>
                <p>If you have any questions about this privacy policy, please contact us at info@lourduannaischool.edu.in</p>
            `;
            break;
        default:
            content = '<p>Content not found.</p>';
    }

    modalContent.innerHTML = content;
    modal.style.display = 'flex';
}

        function showFeatureModal(feature) {
            const features = {
                'academic': {
                    title: 'Academic Excellence',
                    content: `
                        <h2>Academic Excellence</h2>
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Academic Excellence" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <p>Our commitment to academic excellence is reflected in our consistent high performance in board examinations and competitive tests.</p>
                        <h3>Key Achievements:</h3>
                        <ul>
                            <li>100% pass rate in Class 10 board exams</li>
                            <li>98% pass rate in Class 12 board exams</li>
                            <li>Multiple district and state-level academic awards</li>
                        </ul>
                        <h3>Our Approach:</h3>
                        <ul>
                            <li>Regular assessments and feedback</li>
                            <li>Personalized attention to each student</li>
                            <li>Advanced teaching methodologies</li>
                            <li>Extra classes for slow learners</li>
                        </ul>
                    `
                },
                'faculty': {
                    title: 'Experienced Faculty',
                    content: `
                        <h2>Experienced Faculty</h2>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Faculty" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <p>Our dedicated teaching staff consists of highly qualified and experienced educators who are passionate about nurturing young minds.</p>
                        <h3>Faculty Qualifications:</h3>
                        <ul>
                            <li>100% qualified teachers with relevant degrees</li>
                            <li>Average teaching experience: 12 years</li>
                            <li>Regular training and professional development</li>
                            <li>Subject matter experts in their respective fields</li>
                        </ul>
                        <h3>Teaching Excellence:</h3>
                        <ul>
                            <li>Student-centered learning approach</li>
                            <li>Use of modern teaching aids and technology</li>
                            <li>Regular parent-teacher interactions</li>
                            <li>Continuous assessment and improvement</li>
                        </ul>
                    `
                },
                'development': {
                    title: 'Holistic Development',
                    content: `
                        <h2>Holistic Development</h2>
                        <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Holistic Development" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <p>We believe in developing the complete personality of our students through academics, sports, arts, and character building.</p>
                        <h3>Areas of Development:</h3>
                        <ul>
                            <li>Academic excellence and critical thinking</li>
                            <li>Physical fitness and sports activities</li>
                            <li>Creative arts and cultural programs</li>
                            <li>Leadership and communication skills</li>
                            <li>Moral values and ethical behavior</li>
                        </ul>
                        <h3>Activities & Programs:</h3>
                        <ul>
                            <li>Annual sports meet and inter-house competitions</li>
                            <li>Cultural festivals and talent shows</li>
                            <li>Science exhibitions and quiz competitions</li>
                            <li>Community service and social awareness programs</li>
                            <li>Leadership development workshops</li>
                        </ul>
                    `
                }
            };
            
            if (features[feature]) {
                const modal = document.getElementById('modal');
                const modalContent = document.getElementById('modalContent');
                modalContent.innerHTML = features[feature].content;
                modal.style.display = 'block';
            }
        }

        function showClassModal(classType) {
            const classes = {
                'primary': {
                    title: 'Primary Classes (1-5)',
                    content: `
                        <h2>Primary Classes (1-5)</h2>
                        <img src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Primary Classes" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <p>Our primary education program focuses on building strong foundations through interactive learning and creative activities.</p>
                        <h3>Curriculum Highlights:</h3>
                        <ul>
                            <li>English Language and Literature</li>
                            <li>Tamil Language and Literature</li>
                            <li>Mathematics with practical applications</li>
                            <li>Environmental Science</li>
                            <li>Social Studies</li>
                            <li>Art and Craft</li>
                            <li>Physical Education</li>
                            <li>Moral Science</li>
                        </ul>
                        <h3>Teaching Methodology:</h3>
                        <ul>
                            <li>Play-based learning for younger students</li>
                            <li>Activity-based teaching methods</li>
                            <li>Audio-visual aids and interactive sessions</li>
                            <li>Regular assessments and feedback</li>
                            <li>Individual attention to each student</li>
                        </ul>
                    `
                },
                'upper-primary': {
                    title: 'Upper Primary Classes (6-8)',
                    content: `
                        <h2>Upper Primary Classes (6-8)</h2>
                        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Upper Primary Classes" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <p>The upper primary years focus on expanding knowledge horizons and preparing students for secondary education.</p>
                        <h3>Subject Areas:</h3>
                        <ul>
                            <li>English Language and Communication</li>
                            <li>Tamil Literature and Grammar</li>
                            <li>Mathematics and Algebra basics</li>
                            <li>Science (Physics, Chemistry, Biology)</li>
                            <li>Social Science (History, Geography, Civics)</li>
                            <li>Computer Science fundamentals</li>
                            <li>Physical Education and Sports</li>
                        </ul>
                        <h3>Learning Approach:</h3>
                        <ul>
                            <li>Concept-based learning with practical examples</li>
                            <li>Laboratory sessions for science subjects</li>
                            <li>Regular tests and continuous evaluation</li>
                        </ul>
                        <h3>Additional Activities:</h3>
                        <ul>
                            <li>Science exhibitions and model making</li>
                            <li>Literary competitions and debates</li>
                            <li>Sports tournaments and physical fitness programs</li>
                            <li>Cultural programs and talent development</li>
                        </ul>
                    `
                },
                'secondary': {
                    title: 'Secondary Classes (9-10)',
                    content: `
                        <h2>Secondary Classes (9-10)</h2>
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Secondary Classes" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <p>Our secondary program prepares students for board examinations with comprehensive curriculum and focused preparation.</p>
                        <h3>Board Examination Subjects:</h3>
                        <ul>
                            <li>English (First Language)</li>
                            <li>Tamil (Second Language)</li>
                            <li>Mathematics</li>
                            <li>Science (Physics, Chemistry, Biology)</li>
                            <li>Social Science</li>
                            <li>Computer Applications (Optional)</li>
                        </ul>
                        <h3>Exam Preparation:</h3>
                        <ul>
                            <li>Regular unit tests and mock examinations</li>
                            <li>Previous year question paper practice</li>
                            <li>Special coaching for weak students</li>
                            <li>Study materials and reference books provided</li>
                            <li>Career guidance and counseling sessions</li>
                        </ul>
                        <h3>Academic Support:</h3>
                        <ul>
                            <li>Additional classes during exam preparation</li>
                            <li>Subject-wise doubt clearing sessions</li>
                            <li>Regular parent meetings for progress updates</li>
                            <li>Study tips and exam strategies workshops</li>
                        </ul>
                    `
                },
                'higher-secondary': {
                    title: 'Higher Secondary Classes (11-12)',
                    content: `
                        <h2>Higher Secondary Classes (11-12)</h2>
                        <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Higher Secondary Classes" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <p>Our higher secondary program offers specialized streams with expert guidance for competitive exams and career preparation.</p>
                        <h3>Available Streams:</h3>
                        <ul>
                            <li><strong>Science Stream:</strong> Physics, Chemistry, Biology/Mathematics, English, Tamil</li>
                            <li><strong>Commerce Stream:</strong> Accountancy, Business Studies, Economics, English, Tamil</li>
                            <li><strong>Arts Stream:</strong> History, Geography, Political Science, English, Tamil</li>
                        </ul>
                        <h3>Competitive Exam Preparation:</h3>
                        <ul>
                            <li>JEE Main and Advanced coaching</li>
                            <li>NEET preparation for medical aspirants</li>
                            <li>CA Foundation classes for commerce students</li>
                            <li>Civil services preliminary guidance</li>
                            <li>Regular mock tests and performance analysis</li>
                        </ul>
                        <h3>Career Guidance:</h3>
                        <ul>
                            <li>Individual counseling sessions</li>
                            <li>College admission guidance</li>
                            <li>Scholarship information and assistance</li>
                            <li>Industry expert guest lectures</li>
                            <li>Internship and placement support</li>
                        </ul>
                    `
                }
            };
            
            if (classes[classType]) {
                const modal = document.getElementById('modal');
                const modalContent = document.getElementById('modalContent');
                modalContent.innerHTML = classes[classType].content;
                modal.style.display = 'block';
            }
        }

        function showFacilityModal(facility) {
            const facilities = {
                'smart-classroom': {
                    title: 'Smart Classrooms',
                    content: `
                        <h2>Smart Classrooms</h2>
                        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Smart Classroom" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <p>Our smart classrooms are equipped with the latest technology to enhance the learning experience and make education more interactive and engaging.</p>
                        <h3>Technology Features:</h3>
                        <ul>
                            <li>75-inch interactive whiteboards in every classroom</li>
                            <li>High-definition projectors and sound systems</li>
                            <li>High-speed Wi-Fi connectivity</li>
                            <li>Document cameras for real-time demonstrations</li>
                            <li>Student response systems for interactive quizzes</li>
                        </ul>
                        <h3>Learning Benefits:</h3>
                        <ul>
                            <li>Visual and auditory learning enhancement</li>
                            <li>Interactive lessons and multimedia content</li>
                            <li>Real-time collaboration and participation</li>
                            <li>Access to online educational resources</li>
                            <li>Improved student engagement and retention</li>
                        </ul>
                        <h3>Subjects Enhanced:</h3>
                        <ul>
                            <li>Science with virtual experiments and simulations</li>
                            <li>Geography with interactive maps and satellite imagery</li>
                            <li>History with virtual museum tours and documentaries</li>
                        </ul>
                    `
                },
                'science-lab': {
                    title: 'Science Laboratories',
                    content: `
                        <h2>Science Laboratories</h2>
                        <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Science Lab" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <p>Our well-equipped science laboratories provide students with hands-on experience in Physics, Chemistry, and Biology.</p>
                        <h3>Physics Laboratory:</h3>
                        <ul>
                            <li>Advanced equipment for mechanics and optics experiments</li>
                            <li>Digital multimeters and oscilloscopes</li>
                            <li>Wave motion and sound apparatus</li>
                            <li>Electromagnetic field demonstration kits</li>
                            <li>Safety equipment and proper ventilation</li>
                        </ul>
                        <h3>Chemistry Laboratory:</h3>
                        <ul>
                            <li>Fume hoods for safe chemical experiments</li>
                            <li>Complete set of reagents and chemicals</li>
                            <li>Analytical balances and pH meters</li>
                            <li>Distillation and extraction equipment</li>
                            <li>Fire safety systems and emergency showers</li>
                        </ul>
                        <h3>Biology Laboratory:</h3>
                        <ul>
                            <li>High-resolution microscopes for cellular studies</li>
                            <li>Preserved specimens and slide collections</li>
                            <li>Models of human anatomy and plant structures</li>
                            <li>Incubators for biological experiments</li>
                            <li>Dissection tools and safety equipment</li>
                        </ul>
                    `
                },
                'computer-lab': {
                    title: 'Computer Laboratory',
                    content: `
                        <h2>Computer Laboratory</h2>
                        <img src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Computer Lab" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <p>Our state-of-the-art computer laboratory is designed to provide students with comprehensive digital literacy and programming skills.</p>
                        <h3>Hardware Specifications:</h3>
                        <ul>
                            <li>50 latest desktop computers with modern processors</li>
                            <li>High-speed internet connectivity (100 Mbps)</li>
                            <li>Interactive smart board for demonstrations</li>
                            <li>Printers, scanners, and multimedia devices</li>
                            <li>Air-conditioned environment with proper seating</li>
                        </ul>
                        <h3>Software and Programming:</h3>
                        <ul>
                            <li>Microsoft Office Suite (Word, Excel, PowerPoint)</li>
                            <li>Programming languages: Python, Java, C++</li>
                            <li>Web development tools: HTML, CSS, JavaScript</li>
                            <li>Database management systems</li>
                            <li>Educational software and simulation tools</li>
                        </ul>
                        <h3>Additional Features:</h3>
                        <ul>
                            <li>Dedicated computer teacher and lab assistant</li>
                            <li>Regular workshops on latest technologies</li>
                            <li>Coding competitions and tech fests</li>
                            <li>Career guidance in IT fields</li>
                        </ul>
                    `
                },
                'library': {
                    title: 'School Library',
                    content: `
                        <h2>School Library</h2>
                        <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Library" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <p>Our extensive library serves as the heart of learning, providing access to a vast collection of books and digital resources.</p>
                        <h3>Collection Highlights:</h3>
                        <ul>
                            <li>Over 15,000 books across all subjects and age groups</li>
                            <li>Reference books and encyclopedias</li>
                            <li>Fiction and non-fiction literature</li>
                            <li>Magazines, newspapers, and periodicals</li>
                            <li>Digital library with e-books and online databases</li>
                        </ul>
                        <h3>Facilities:</h3>
                        <ul>
                            <li>Comfortable reading areas with proper lighting</li>
                            <li>Separate sections for different age groups</li>
                            <li>Computer terminals for digital access</li>
                            <li>Group study rooms for collaborative learning</li>
                            <li>Air-conditioned environment for comfortable study</li>
                        </ul>
                        <h3>Special Programs:</h3>
                        <ul>
                            <li>Annual reading challenge for students</li>
                            <li>Book review competitions</li>
                            <li>Library orientation for new students</li>
                            <li>Research project support</li>
                            <li>Inter-school quiz competitions</li>
                        </ul>
                    `
                },
                'sports': {
                    title: 'Sports Complex',
                    content: `
                        <h2>Sports Complex</h2>
                        <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Sports Complex" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <p>Our comprehensive sports complex promotes physical fitness, teamwork, and sportsmanship among students of all ages.</p>
                        <h3>Outdoor Facilities:</h3>
                        <ul>
                            <li>Football field with goal posts</li>
                            <li>Basketball courts with international standards</li>
                            <li>Hockey field for inter-house competitions</li>
                            <li>400-meter athletics track for running events</li>
                            <li>Long jump and high jump pits</li>
                        </ul>
                        <h3>Achievements:</h3>
                        <ul>
                            <li>Multiple district championships in various sports</li>
                            <li>State-level medals in athletics and swimming</li>
                            <li>Recognition as Best Sports School in the district</li>
                            <li>Several students selected for state teams</li>
                        </ul>
                        <h3>Coaching Staff:</h3>
                        <ul>
                            <li>Qualified physical education teachers</li>
                            <li>Specialized coaches for different sports</li>
                            <li>First aid trained staff for safety</li>
                            <li>Regular fitness assessments and training programs</li>
                        </ul>
                    `
                },
                'auditorium': {
                    title: 'School Auditorium',
                    content: `
                        <h2>School Auditorium</h2>
                        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Auditorium" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                        <p>Our modern auditorium serves as the cultural hub of the school, hosting various events, performances, and educational programs.</p>
                        <h3>Technical Specifications:</h3>
                        <ul>
                            <li>Seating capacity: 800 people</li>
                            <li>Advanced sound system with wireless microphones</li>
                            <li>Professional lighting with stage effects</li>
                            <li>High-definition projection system</li>
                            <li>Air-conditioned with comfortable seating</li>
                        </ul>
                        <h3>Events Hosted:</h3>
                        <ul>
                            <li>Annual cultural festivals and competitions</li>
                            <li>Educational seminars and guest lectures</li>
                            <li>Parent-teacher meetings and award ceremonies</li>
                            <li>Drama performances and talent shows</li>
                            <li>Inter-school competitions and conferences</li>
                        </ul>
                        <h3>Educational Programs:</h3>
                        <ul>
                            <li>Career guidance sessions with industry experts</li>
                            <li>Motivational talks by renowned personalities</li>
                            <li>Educational documentaries and film screenings</li>
                            <li>Science demonstrations and exhibitions</li>
                            <li>Cultural exchange programs</li>
                        </ul>
                    `
                }
            };
            
            if (facilities[facility]) {
                const modal = document.getElementById('modal');
                const modalContent = document.getElementById('modalContent');
                modalContent.innerHTML = facilities[facility].content;
                modal.style.display = 'block';
            }
        }

        function openImageModal(imageSrc) {
            const modal = document.getElementById('modal');
            const modalContent = document.getElementById('modalContent');
            
            modalContent.innerHTML = `
                <img src="${imageSrc}" alt="Gallery Image" style="width: 100%; height: auto; border-radius: 10px;">
            `;
            
            modal.style.display = 'block';
        }

        function closeModal() {
            const modal = document.getElementById('modal');
            modal.style.display = 'none';
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('modal');
            if (event.target === modal) {
                closeModal();
            }
        });

        // Keyboard navigation for modal
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        // Additional interactive features
        function addInteractiveFeatures() {
            // Add hover effects to cards
            document.querySelectorAll('.class-card, .facility-card, .news-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Add click animation to buttons
            document.querySelectorAll('.cta-button, .submit-btn').forEach(button => {
                button.addEventListener('click', function(e) {
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255,255,255,0.4);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        pointer-events: none;
                    `;
                    
                    this.style.position = 'relative';
                    this.style.overflow = 'hidden';
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }

        // Initialize additional features when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            addInteractiveFeatures();
        });

        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .parallax-element {
                transition: transform 0.1s ease-out;
            }
        `;
        document.head.appendChild(style);

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const parallaxElements = hero.querySelectorAll('.hero-content, .image-slider');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Lazy loading for images
        function lazyLoadImages() {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }

        // Performance optimization
        function optimizePerformance() {
            // Throttle scroll events
            let ticking = false;
            function updateOnScroll() {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        // Scroll-based updates here
                        ticking = false;
                    });
                    ticking = true;
                }
            }
            window.addEventListener('scroll', updateOnScroll);

            // Preload critical images
            const criticalImages = [
            ];

            criticalImages.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }

        // Initialize performance optimizations
        document.addEventListener('DOMContentLoaded', function() {
            optimizePerformance();
            lazyLoadImages();
        });

        // Search functionality (if needed)
        function initializeSearch() {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.addEventListener('input', function(e) {
                    const query = e.target.value.toLowerCase();
                    // Implement search logic here
                    console.log('Searching for:', query);
                });
            }
        }

        // Cookie consent (if needed)
        function showCookieConsent() {
            const consent = localStorage.getItem('cookieConsent');
            if (!consent) {
                setTimeout(() => {
                    showNotification('This website uses cookies to enhance your experience. By continuing to browse, you agree to our cookie policy.', 'info');
                    // Store consent
                    localStorage.setItem('cookieConsent', 'true');
                }, 3000);
            }
        }

        // Error handling for images
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('img').forEach(img => {
                img.addEventListener('error', function() {
                    this.src = 'https://via.placeholder.com/400x200/667eea/ffffff?text=Image+Not+Available';
                    this.alt = 'Image not available';
                });
            });
        });

        // Accessibility improvements
        function improveAccessibility() {
            // Add focus indicators
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    document.body.classList.add('using-keyboard');
                }
            });

            document.addEventListener('mousedown', function() {
                document.body.classList.remove('using-keyboard');
            });

            // Skip to content link
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.textContent = 'Skip to main content';
            skipLink.className = 'skip-link';
            skipLink.style.cssText = `
                position: absolute;
                top: -40px;
                left: 6px;
                background: #000;
                color: #fff;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 10000;
                transition: top 0.3s;
            `;
            
            skipLink.addEventListener('focus', function() {
                this.style.top = '6px';
            });
            
            skipLink.addEventListener('blur', function() {
                this.style.top = '-40px';
            });
            
            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        // Initialize accessibility features
        document.addEventListener('DOMContentLoaded', function() {
            improveAccessibility();
        });

        // Console welcome message
        console.log(`
            🎓 Welcome to Lourdu Annai Higher School Website!
            
            Built with modern web technologies:
            ✅ Responsive Design
            ✅ Interactive Animations
            ✅ Accessibility Features
            ✅ Performance Optimized
            
            For admissions and inquiries:
            📧 info@lourduannaischool.edu.in
            📞 +91 4175-123456
        `);