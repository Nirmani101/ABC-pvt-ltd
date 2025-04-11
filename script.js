


    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggler.innerHTML = '☰';
                }
            }
        });
    });

    // Hero slideshow
    const slideshowItems = document.querySelectorAll('.slideshow-item');
    let currentSlide = 0;

    function nextSlide() {
        slideshowItems[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slideshowItems.length;
        slideshowItems[currentSlide].classList.add('active');
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Industry carousel
    const industryContainer = document.querySelector('.industry-container');
    const industryCards = document.querySelectorAll('.industry-card');
    const carouselBtnPrev = document.querySelector('.carousel-btn.prev');
    const carouselBtnNext = document.querySelector('.carousel-btn.next');
    const carouselDots = document.querySelectorAll('.dot');

    let cardWidth = industryCards[0].offsetWidth + 20; // Card width + margin
    let cardsPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
    let position = 0;
    let maxPosition = Math.ceil(industryCards.length / cardsPerView) - 1;
    let currentPosition = 0;

    // Update card width on window resize
    window.addEventListener('resize', function() {
        cardWidth = industryCards[0].offsetWidth + 20;
        cardsPerView = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
        maxPosition = Math.ceil(industryCards.length / cardsPerView) - 1;
        
        // Reset position to prevent empty spaces
        if (currentPosition > maxPosition) {
            currentPosition = maxPosition;
            position = -(currentPosition * cardsPerView * cardWidth);
            updateCarouselPosition();
        }
    });

    function updateCarouselPosition() {
        industryContainer.style.transform = `translateX(${position}px)`;
        
        // Update active dot
        carouselDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPosition);
        });
    }

    carouselBtnNext.addEventListener('click', function() {
        if (currentPosition < maxPosition) {
            currentPosition++;
            position = -(currentPosition * cardsPerView * cardWidth);
            updateCarouselPosition();
        }
    });

    carouselBtnPrev.addEventListener('click', function() {
        if (currentPosition > 0) {
            currentPosition--;
            position = -(currentPosition * cardsPerView * cardWidth);
            updateCarouselPosition();
        }
    });

    // Carousel dot navigation
    carouselDots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentPosition = parseInt(this.getAttribute('data-index'));
            position = -(currentPosition * cardsPerView * cardWidth);
            updateCarouselPosition();
        });
    });

    // Map point hover animation
    const mapPoints = document.querySelectorAll('.map-point');

    mapPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            this.querySelector('.map-tooltip').style.opacity = '1';
        });
        
        point.addEventListener('mouseleave', function() {
            this.querySelector('.map-tooltip').style.opacity = '0';
        });
    });

    // Initial setup
    updateCarouselPosition();

    // Preload images for better performance
    function preloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const newImg = new Image();
                newImg.src = src;
            }
        });
    }

    // Run preload on load
    window.addEventListener('load', preloadImages);

    // Add animation on scroll
    function animateOnScroll() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Add initial styles for animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on load
    window.addEventListener('load', animateOnScroll);
