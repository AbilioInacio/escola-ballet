document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const matriculaSection = document.getElementById('matricula');

    // Observer to hide navbar when reaching the contact form
    const hideNavbarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navbar.style.opacity = '0';
                navbar.style.pointerEvents = 'none'; // Prevent clicks when hidden
            } else {
                navbar.style.opacity = '1';
                navbar.style.pointerEvents = 'all';
            }
        });
    }, { threshold: 0.1 });

    if (matriculaSection) {
        hideNavbarObserver.observe(matriculaSection);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
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

    // Form Handling
    const form = document.getElementById('leadForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const parentName = document.getElementById('parentName').value;
            const childName = document.getElementById('childName').value;
            const childAge = document.getElementById('childAge').value;
            const whatsapp = document.getElementById('whatsapp').value;
            const neighborhood = document.getElementById('neighborhood').value;
            const city = document.getElementById('city').value;

            // Get radio value safely
            const experienceElement = document.querySelector('input[name="experience"]:checked');
            const experience = experienceElement ? experienceElement.value : 'Não informado';

            if (!parentName || !childName || !whatsapp) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Construct WhatsApp Message
            const phoneNumber = '5564981405552';
            const message = `Olá! Gostaria de verificar vagas para o espetáculo Nárnia.
            
*Responsável:* ${parentName}
*Criança:* ${childName}
*Idade:* ${childAge} anos
*Bairro:* ${neighborhood}
*Já fez ballet:* ${experience}
*Cidade:* ${city}
*WhatsApp:* ${whatsapp}`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Provide visual feedback then redirect
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerText = 'Redirecionando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                submitBtn.innerText = 'Verificar Vagas';
                submitBtn.disabled = false;
                form.reset();
            }, 1000);
        });
    }

    // Scroll Animations (simple intersection observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section h2, .benefit-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Simple Particle Effect for Hero (Snow/Magic)
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 50; i++) {
            createParticle(hero);
        }
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random properties
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            top: -10px;
            left: ${x}%;
            animation: fall ${duration}s linear ${delay}s infinite;
            pointer-events: none;
        `;

        container.appendChild(particle);
    }

    // Add keyframes for particles dynamically
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes fall {
            to {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
});
