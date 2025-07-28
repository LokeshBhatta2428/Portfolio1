// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTypewriter();
    initMobileMenu();
    initScrollEffects();
    initProjectFiltering();
    initGalleryLightbox();
    initContactForm();
    initLoadingAnimations();
    initCertificationFiltering();
    initCertificateModal();
    initGalleryFiltering();
    
    // Initialize particles effect
    initParticles();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Enhanced Mobile Menu with smooth animations
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburg');
    const dropdown = document.querySelector('.dropdown');
    const closeBtn = document.querySelector('.dropdown .fa-xmark');
    const dropdownLinks = document.querySelectorAll('.dropdown a');
    
    if (!hamburger || !dropdown) return;
    
    // Toggle menu function
    function toggleMenu() {
        const isActive = dropdown.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Open menu with animation
    function openMenu() {
        dropdown.classList.add('active');
        document.body.style.overflow = 'hidden';
        hamburger.style.transform = 'rotate(90deg)';
        
        // Animate links
        dropdownLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(-50px)';
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }
    
    // Close menu with animation
    function closeMenu() {
        dropdownLinks.forEach((link) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(-50px)';
        });
        
        setTimeout(() => {
            dropdown.classList.remove('active');
            document.body.style.overflow = 'auto';
            hamburger.style.transform = 'rotate(0deg)';
        }, 200);
    }
    
    // Event listeners
    hamburger.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    
    // Close menu when clicking on links
    dropdownLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking outside
    dropdown.addEventListener('click', function(e) {
        if (e.target === dropdown) {
            closeMenu();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dropdown.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Make toggleMenu globally accessible
    window.toggleMenu = toggleMenu;
}

// Enhanced scroll effects
function initScrollEffects() {
    const nav = document.querySelector('nav');
    const backToTopButton = document.querySelector('.back-to-top');
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 10, 0.98)';
            nav.style.backdropFilter = 'blur(15px)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        }
    }
    
    // Back to top button
    function handleBackToTop() {
        if (window.scrollY > 300) {
            backToTopButton?.classList.add('active');
        } else {
            backToTopButton?.classList.remove('active');
        }
    }
    
    // Parallax effect for hero section
    function handleParallax() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    }
    
    // Active nav highlighting
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav .links .link a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id') || '';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}` || 
                (currentSection === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Scroll event listener with throttling
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                handleBackToTop();
                handleParallax();
                highlightActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Back to top click handler
    backToTopButton?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced project filtering with animations
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Project filtering
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Animate cards
                projectCards.forEach((card, index) => {
                    const shouldShow = filter === 'all' || card.getAttribute('data-category') === filter;
                    
                    if (shouldShow) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Initial animation
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Enhanced Gallery Filtering System
function initGalleryFiltering() {
    const filterButtons = document.querySelectorAll('.gallery .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryStats = document.querySelectorAll('.gallery-stats .stat-item');
    
    if (filterButtons.length === 0) return;
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter and animate gallery items
            let visibleCount = 0;
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    visibleCount++;
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                    
                    // Stagger animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateY(0)';
                    }, index * 50);
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8) translateY(20px)';
                    
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });
            
            // Update gallery statistics
            updateGalleryStats(filter, visibleCount);
        });
    });
    
    // Initialize with all items visible
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateY(0)';
        }, index * 100);
    });
}

// Update gallery statistics
function updateGalleryStats(filter, visibleCount) {
    const statItems = document.querySelectorAll('.gallery-stats .stat-item');
    
    if (filter === 'all') {
        // Show original stats
        const stats = [
            { number: 7, label: 'Total Images' },
            { number: 2, label: 'Projects' },
            { number: 2, label: 'Events' },
            { number: 3, label: 'Travel' }
        ];
        
        statItems.forEach((item, index) => {
            if (stats[index]) {
                const numberEl = item.querySelector('.stat-number');
                const labelEl = item.querySelector('.stat-label');
                
                animateNumber(numberEl, 0, stats[index].number, 800);
                labelEl.textContent = stats[index].label;
                item.style.opacity = '1';
            }
        });
    } else {
        // Show filtered stats
        const firstStat = statItems[0];
        if (firstStat) {
            const numberEl = firstStat.querySelector('.stat-number');
            const labelEl = firstStat.querySelector('.stat-label');
            
            animateNumber(numberEl, 0, visibleCount, 800);
            labelEl.textContent = `${filter.charAt(0).toUpperCase() + filter.slice(1)} Images`;
        }
        
        // Dim other stats
        for (let i = 1; i < statItems.length; i++) {
            statItems[i].style.opacity = '0.3';
        }
        
        // Reset opacity after delay
        setTimeout(() => {
            statItems.forEach(item => item.style.opacity = '1');
        }, 2000);
    }
}

// Enhanced gallery lightbox with proper navigation
function initGalleryLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const currentCounter = document.querySelector('.current-image');
    const totalCounter = document.querySelector('.total-images');
    const imageLoading = document.querySelector('.image-loading');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!lightbox || !lightboxImg || galleryItems.length === 0) return;
    
    let currentImageIndex = 0;
    let visibleItems = [];
    
    // Update visible items based on current filter
    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => 
            getComputedStyle(item).display !== 'none' && 
            !item.classList.contains('hidden') &&
            item.style.opacity !== '0'
        );
        
        if (totalCounter) {
            totalCounter.textContent = visibleItems.length;
        }
    }
    
    // Get image data from gallery item
    function getImageData(item) {
        const img = item.querySelector('.gallery-image img');
        const title = item.querySelector('.gallery-info h3')?.textContent || 'Image';
        const description = item.querySelector('.gallery-info p')?.textContent || '';
        
        return {
            src: img ? img.src : '',
            alt: img ? img.alt : 'Gallery Image',
            title: title,
            description: description
        };
    }
    
    // Open lightbox
    function openLightbox(clickedIndex) {
        updateVisibleItems();
        
        if (visibleItems.length === 0) return;
        
        // Find the correct index in visible items
        const clickedItem = galleryItems[clickedIndex];
        const visibleIndex = visibleItems.indexOf(clickedItem);
        
        if (visibleIndex === -1) return;
        
        currentImageIndex = visibleIndex;
        
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Show loading state
        if (imageLoading) {
            imageLoading.style.display = 'flex';
            imageLoading.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                <span>Loading image...</span>
            `;
        }
        if (lightboxImg) lightboxImg.style.display = 'none';
        
        loadLightboxContent();
        
        // Animate lightbox appearance
        requestAnimationFrame(() => {
            lightbox.style.opacity = '1';
            lightbox.classList.add('active');
        });
        
        updateNavButtons();
        updateCounter();
    }
    
    // Load lightbox content
    function loadLightboxContent() {
        if (currentImageIndex < 0 || currentImageIndex >= visibleItems.length) return;
        
        const item = visibleItems[currentImageIndex];
        const imageData = getImageData(item);
        
        // Create new image to preload
        const newImg = new Image();
        
        newImg.onload = function() {
            if (lightboxImg) {
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                lightboxImg.style.display = 'block';
                lightboxImg.style.opacity = '1';
            }
            
            if (imageLoading) imageLoading.style.display = 'none';
            
            // Update caption
            if (lightboxTitle) lightboxTitle.textContent = imageData.title;
            if (lightboxDescription) lightboxDescription.textContent = imageData.description;
        };
        
        newImg.onerror = function() {
            if (imageLoading) {
                imageLoading.innerHTML = `
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Failed to load image</span>
                `;
            }
            console.error('Failed to load image:', imageData.src);
        };
        
        newImg.src = imageData.src;
        newImg.alt = imageData.alt;
    }
    
    // Close lightbox
    function closeLightboxFunc() {
        lightbox.style.opacity = '0';
        lightbox.classList.remove('active');
        
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset states
            if (lightboxImg) {
                lightboxImg.style.display = 'none';
                lightboxImg.src = '';
                lightboxImg.style.opacity = '1';
            }
        }, 300);
    }
    
    // Navigate to next image
    function showNext() {
        updateVisibleItems();
        if (visibleItems.length <= 1) return;
        
        currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
        
        // Fade out current image
        if (lightboxImg) lightboxImg.style.opacity = '0';
        if (imageLoading) imageLoading.style.display = 'flex';
        
        setTimeout(() => {
            loadLightboxContent();
            updateNavButtons();
            updateCounter();
        }, 150);
    }
    
    // Navigate to previous image
    function showPrev() {
        updateVisibleItems();
        if (visibleItems.length <= 1) return;
        
        currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
        
        // Fade out current image
        if (lightboxImg) lightboxImg.style.opacity = '0';
        if (imageLoading) imageLoading.style.display = 'flex';
        
        setTimeout(() => {
            loadLightboxContent();
            updateNavButtons();
            updateCounter();
        }, 150);
    }
    
    // Update navigation buttons visibility
    function updateNavButtons() {
        updateVisibleItems();
        
        if (visibleItems.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
        } else {
            if (prevBtn) prevBtn.style.display = 'flex';
            if (nextBtn) nextBtn.style.display = 'flex';
        }
    }
    
    // Update counter display
    function updateCounter() {
        if (currentCounter) {
            currentCounter.textContent = currentImageIndex + 1;
        }
        if (totalCounter) {
            totalCounter.textContent = visibleItems.length;
        }
    }
    
    // Event listeners for gallery items
    galleryItems.forEach((item, index) => {
        const imageContainer = item.querySelector('.gallery-image');
        if (imageContainer) {
            imageContainer.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(index);
            });
            
            // Also make the whole item clickable
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(index);
            });
        }
    });
    
    // Navigation event listeners
    closeLightbox?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightboxFunc();
    });
    
    nextBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });
    
    prevBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });
    
    // Close when clicking overlay
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    lightboxOverlay?.addEventListener('click', closeLightboxFunc);
    
    // Close when clicking outside content (but not on navigation buttons)
    lightbox?.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    e.preventDefault();
                    closeLightboxFunc();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    showPrev();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    showNext();
                    break;
            }
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    lightbox?.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    lightbox?.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const xDiff = touchStartX - touchEndX;
        const yDiff = Math.abs(touchStartY - touchEndY);
        
        // Only handle horizontal swipes (ignore vertical scrolling)
        if (Math.abs(xDiff) > swipeThreshold && yDiff < 100) {
            if (xDiff > 0) {
                // Swipe left - next image
                showNext();
            } else {
                // Swipe right - previous image
                showPrev();
            }
        }
    }
    
    // Prevent lightbox content from closing when clicked
    const lightboxContent = document.querySelector('.lightbox-content');
    lightboxContent?.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Enhanced typewriter effect
function initTypewriter() {
    const textElement = document.querySelector('.typewriter-text');
    if (!textElement) return;
    
    const phrases = [
        'Cyber Security Student',
        'Ethical Hacker',
        'IT Enthusiast',
        'Penetration Tester',
        'Network Security Analyst'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// Enhanced contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            // Show success message with animation
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        }
    });
}

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Clear previous errors
    clearErrors();
    
    let isValid = true;
    
    if (!name?.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }
    
    if (!email?.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }
    
    if (!subject?.value.trim()) {
        showError(subject, 'Subject is required');
        isValid = false;
    }
    
    if (!message?.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    const inputGroup = input.closest('.input-group');
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.cssText = `
        color: #ff0080;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        animation: fadeIn 0.3s ease;
    `;
    errorElement.textContent = message;
    
    inputGroup.appendChild(errorElement);
    input.style.borderColor = '#ff0080';
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('input, textarea').forEach(el => {
        el.style.borderColor = 'rgba(0, 255, 136, 0.3)';
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-color)' : 'var(--accent-color)'};
        color: var(--bg-color);
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: var(--neon-glow);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Loading animations for elements
function initLoadingAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for loading animation
    document.querySelectorAll('.skill-card, .service-box, .project-card, .cert-item, .gallery-item, .cert-card').forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Particle effect for cyber theme
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#00ff88';
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) +
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(0, 255, 136, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Enhanced certification filtering functionality
function initCertificationFiltering() {
    const certFilterButtons = document.querySelectorAll('.cert-filter-btn');
    const certCards = document.querySelectorAll('.cert-card');
    
    if (certFilterButtons.length === 0 || certCards.length === 0) return;
    
    certFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            certFilterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter and animate cards
            certCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    card.classList.remove('hidden');
                    // Stagger animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                } else {
                    card.classList.add('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                }
            });
            
            // Update stats
            updateCertificationStats(filter);
        });
    });
    
    // Initialize with all certifications visible
    certCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

// Update certification statistics based on filter
function updateCertificationStats(filter) {
    const statItems = document.querySelectorAll('.stat-item');
    const certCards = document.querySelectorAll('.cert-card');
    
    if (filter === 'all') {
        // Show original stats
        const stats = [
            { number: certCards.length, label: 'Total Certifications' },
            { number: document.querySelectorAll('[data-category="cybersecurity"]').length, label: 'Cybersecurity' },
            { number: document.querySelectorAll('[data-category="programming"]').length, label: 'Programming' },
            { number: document.querySelectorAll('[data-category="networking"]').length, label: 'Networking' }
        ];
        
        statItems.forEach((item, index) => {
            if (stats[index]) {
                const numberEl = item.querySelector('.stat-number');
                const labelEl = item.querySelector('.stat-label');
                
                animateNumber(numberEl, 0, stats[index].number, 1000);
                labelEl.textContent = stats[index].label;
            }
        });
    } else {
        // Show filtered stats
        const visibleCards = document.querySelectorAll(`[data-category="${filter}"]`);
        const firstStat = statItems[0];
        
        if (firstStat) {
            const numberEl = firstStat.querySelector('.stat-number');
            const labelEl = firstStat.querySelector('.stat-label');
            
            animateNumber(numberEl, 0, visibleCards.length, 1000);
            labelEl.textContent = `${filter.charAt(0).toUpperCase() + filter.slice(1)} Certs`;
        }
        
        // Hide other stats
        for (let i = 1; i < statItems.length; i++) {
            statItems[i].style.opacity = '0.3';
        }
        
        // Reset opacity after filter change
        setTimeout(() => {
            statItems.forEach(item => item.style.opacity = '1');
        }, 2000);
    }
}

// Animate numbers counting up
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Certificate Modal System
function initCertificateModal() {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalCertImage');
    const modalTitle = document.getElementById('modalCertTitle');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeBtn = document.getElementById('closeModal');
    const downloadBtn = document.getElementById('downloadCert');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const viewCertBtns = document.querySelectorAll('.view-cert-btn');
    
    if (!modal || !modalImg || !modalTitle) return;
    
    let currentCertImage = '';
    let currentCertTitle = '';
    
    // Open modal function
    function openModal(imageSrc, title) {
        currentCertImage = imageSrc;
        currentCertTitle = title;
        
        modalTitle.textContent = title;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Show loading spinner
        loadingSpinner.style.display = 'flex';
        modalImg.style.display = 'none';
        
        // Load image
        const img = new Image();
        img.onload = function() {
            modalImg.src = imageSrc;
            modalImg.alt = title;
            modalImg.style.display = 'block';
            loadingSpinner.style.display = 'none';
            
            // Animate modal appearance
            requestAnimationFrame(() => {
                modal.classList.add('active');
            });
        };
        
        img.onerror = function() {
            loadingSpinner.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <span>Failed to load certificate</span>
            `;
            console.error('Failed to load certificate image:', imageSrc);
        };
        
        img.src = imageSrc;
    }
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modalImg.src = '';
            modalImg.style.display = 'none';
            loadingSpinner.style.display = 'flex';
            loadingSpinner.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                <span>Loading certificate...</span>
            `;
        }, 300);
    }
    
    // Download certificate function
    function downloadCertificate() {
        if (!currentCertImage) return;
        
        const link = document.createElement('a');
        link.href = currentCertImage;
        link.download = `${currentCertTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_certificate`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Event listeners for view certificate buttons
    viewCertBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const imageSrc = this.getAttribute('data-cert-image');
            const title = this.getAttribute('data-cert-title');
            
            if (imageSrc && title) {
                openModal(imageSrc, title);
            }
        });
    });
    
    // Event listeners for closing modal
    modalClose?.addEventListener('click', closeModal);
    closeBtn?.addEventListener('click', closeModal);
    downloadBtn?.addEventListener('click', downloadCertificate);
    
    // Close modal when clicking overlay
    modalOverlay?.addEventListener('click', closeModal);
    
    // Close modal when clicking outside content
    modal?.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal && modal.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'Enter':
                    if (e.target === downloadBtn) {
                        downloadCertificate();
                    }
                    break;
            }
        }
    });
    
    // Focus management for accessibility
    modal?.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .loading {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .loading.loaded {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Enhanced contact form with email functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formStatus = document.getElementById('formStatus');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;
        
        // Clear previous status
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';
        
        try {
            if (validateContactForm()) {
                await sendEmail();
                showFormStatus('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
            }
        } catch (error) {
            console.error('Error sending email:', error);
            showFormStatus('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Enhanced form validation
function validateContactForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Clear previous errors
    clearFormErrors();
    
    let isValid = true;
    
    // Name validation
    if (!name?.value.trim()) {
        showFieldError(name, 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showFieldError(name, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Email validation
    if (!email?.value.trim()) {
        showFieldError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (!subject?.value) {
        showFieldError(subject, 'Please select a subject');
        isValid = false;
    }
    
    // Message validation
    if (!message?.value.trim()) {
        showFieldError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showFieldError(message, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

// Send email using EmailJS
async function sendEmail() {
    const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || 'Not provided',
        company: document.getElementById('company').value || 'Not provided',
        subject: document.getElementById('subject').value,
        budget: document.getElementById('budget').value || 'Not specified',
        message: document.getElementById('message').value,
        to_email: 'lokesh.bhatta2005@gmail.com',
        reply_to: document.getElementById('email').value,
        timestamp: new Date().toLocaleString()
    };
    
    // For now, we'll use a simple method that works with most email clients
    // You can integrate with EmailJS, Formspree, or Netlify Forms for production
    
    // Method 1: Using EmailJS (recommended for production)
    if (typeof emailjs !== 'undefined') {
        return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
    }
    
    // Method 2: Fallback - mailto link (opens email client)
    const emailBody = `
Name: ${formData.from_name}
Email: ${formData.from_email}
Phone: ${formData.phone}
Company: ${formData.company}
Subject: ${formData.subject}
Budget: ${formData.budget}
Timestamp: ${formData.timestamp}

Message:
${formData.message}
    `.trim();
    
    const mailtoLink = `mailto:lokesh.bhatta2005@gmail.com?subject=Portfolio Contact: ${formData.subject}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Simulate delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
}

// Show form status message
function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    if (!formStatus) return;
    
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    // Auto hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

// Show field error
function showFieldError(input, message) {
    const inputGroup = input.closest('.input-group');
    
    // Remove existing error
    const existingError = inputGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    // Add error styling to input
    input.classList.add('error');
    
    // Insert error message
    inputGroup.appendChild(errorElement);
    
    // Focus on first error field
    if (!document.querySelector('.input-group input.error, .input-group select.error, .input-group textarea.error')) {
        input.focus();
    }
}

// Clear form errors
function clearFormErrors() {
    // Remove error classes
    document.querySelectorAll('.input-group input, .input-group select, .input-group textarea').forEach(el => {
        el.classList.remove('error');
    });
    
    // Remove error messages
    document.querySelectorAll('.field-error').forEach(el => el.remove());
}

// Enhanced email validation
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
}

// Initialize contact form enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Auto-resize textarea
    const textarea = document.getElementById('message');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
    
    // Add input animations
    const inputs = document.querySelectorAll('.input-group input, .input-group select, .input-group textarea');
    inputs.forEach(input => {
        // Focus effects
        input.addEventListener('focus', function() {
            this.closest('.input-group').classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.closest('.input-group').classList.remove('focused');
            
            // Add filled class if has value
            if (this.value.trim()) {
                this.closest('.input-group').classList.add('filled');
            } else {
                this.closest('.input-group').classList.remove('filled');
            }
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateSingleField(this);
            }
        });
    });
});

// Single field validation
function validateSingleField(field) {
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (!field.value.trim()) {
                errorMessage = 'Name is required';
                isValid = false;
            } else if (field.value.trim().length < 2) {
                errorMessage = 'Name must be at least 2 characters';
                isValid = false;
            }
            break;
            
        case 'email':
            if (!field.value.trim()) {
                errorMessage = 'Email is required';
                isValid = false;
            } else if (!isValidEmail(field.value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'subject':
            if (!field.value) {
                errorMessage = 'Please select a subject';
                isValid = false;
            }
            break;
            
        case 'message':
            if (!field.value.trim()) {
                errorMessage = 'Message is required';
                isValid = false;
            } else if (field.value.trim().length < 10) {
                errorMessage = 'Message must be at least 10 characters';
                isValid = false;
            }
            break;
    }
    
    if (isValid) {
        field.classList.remove('error');
        const errorElement = field.closest('.input-group').querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    } else {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}
// Enhanced navigation with theme toggle and mobile menu
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initNavigation();
    initScrollEffects();
    initProjectFiltering();
    initGalleryLightbox();
    initContactForm();
    initLoadingAnimations();
    initCertificationFiltering();
    initCertificateModal();
    initGalleryFiltering();
    
    // Initialize particles effect
    initParticles();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            updateToggleState(true);
        } else {
            body.classList.remove('dark-mode');
            updateToggleState(false);
        }
        localStorage.setItem('theme', theme);
    }
    
    function updateToggleState(isDark) {
        const toggles = [themeToggle, mobileThemeToggle].filter(Boolean);
        
        toggles.forEach(toggle => {
            const icon = toggle.querySelector('.theme-toggle-icon');
            
            if (isDark) {
                toggle.classList.add('active');
                icon.className = 'theme-toggle-icon fas fa-moon';
            } else {
                toggle.classList.remove('active');
                icon.className = 'theme-toggle-icon fas fa-sun';
            }
        });
    }
    
    function toggleTheme() {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition effect
        body.style.transition = 'all 0.3s ease';
        
        setTheme(newTheme);
        
        // Remove transition after animation
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
        
        // Show theme change notification
        showThemeNotification(newTheme);
    }
    
    // Event listeners
    themeToggle?.addEventListener('click', toggleTheme);
    mobileThemeToggle?.addEventListener('click', toggleTheme);
    
    // Keyboard support
    [themeToggle, mobileThemeToggle].forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        }
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    let isMenuOpen = false;
    
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    }
    
    function openMobileMenu() {
        mobileMenuBtn.classList.add('active');
        mobileMenu.classList.add('active');
        body.style.overflow = 'hidden';
        
        // Animate menu links
        mobileNavLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
        
        // Set focus to first menu item for accessibility
        setTimeout(() => {
            mobileNavLinks[0]?.focus();
        }, 200);
    }
    
    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
        isMenuOpen = false;
        
        // Reset link animations
        mobileNavLinks.forEach(link => {
            link.style.transition = '';
            link.style.opacity = '';
            link.style.transform = '';
        });
    }
    
    // Event listeners
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(closeMobileMenu, 150);
        });
    });
    
    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Handle resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Make functions globally accessible
    window.toggleMobileMenu = toggleMobileMenu;
}

// Enhanced Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active nav link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Smooth hover effects
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
}

// Enhanced scroll effects with theme awareness
function initScrollEffects() {
    const nav = document.querySelector('nav');
    const backToTopButton = document.querySelector('.back-to-top');
    
    function handleNavbarScroll() {
        const scrolled = window.scrollY > 50;
        const isDark = document.body.classList.contains('dark-mode');
        
        if (scrolled) {
            nav.style.background = isDark ? 'rgba(15, 23, 42, 0.98)' : 'rgba(248, 250, 252, 0.98)';
            nav.style.backdropFilter = 'blur(25px)';
            nav.style.boxShadow = isDark ? 
                '0 4px 20px rgba(0, 212, 255, 0.25)' : 
                '0 4px 20px rgba(0, 212, 255, 0.15)';
        } else {
            nav.style.background = isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(248, 250, 252, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.boxShadow = isDark ? 
                '0 2px 10px rgba(0, 212, 255, 0.2)' : 
                '0 2px 10px rgba(0, 212, 255, 0.1)';
        }
    }
    
    function handleBackToTop() {
        if (window.scrollY > 300) {
            backToTopButton?.classList.add('active');
        } else {
            backToTopButton?.classList.remove('active');
        }
    }
    
    function handleParallax() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
    }
    
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            
            if (window.pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id') || '';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}` || 
                (currentSection === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll handler
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                handleBackToTop();
                handleParallax();
                highlightActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Back to top click handler
    backToTopButton?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Theme change notification
function showThemeNotification(theme) {
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.innerHTML = `
        <i class="fas fa-${theme === 'dark' ? 'moon' : 'sun'}"></i>
        <span>${theme === 'dark' ? 'Dark' : 'Light'} mode activated</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        color: var(--text-color);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: var(--shadow-medium);
        border: 2px solid var(--border-accent);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Enhanced particles with theme awareness
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.4;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 25));
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.size = Math.random() * 3 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            const isDark = document.body.classList.contains('dark-mode');
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? '#00d4ff' : '#00a8e8';
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isDark = document.body.classList.contains('dark-mode');
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) +
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    
                    const opacity = 1 - distance / 120;
                    ctx.strokeStyle = isDark ? 
                        `rgba(0, 212, 255, ${opacity * 0.6})` : 
                        `rgba(0, 168, 232, ${opacity * 0.4})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Rest of your existing functions remain the same...
// (initTypewriter, initContactForm, etc.)