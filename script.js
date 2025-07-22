// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the typewriter effect
    initTypewriter();
    
    // Check if navigation is open when page loads
    checkMenuState();
    
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
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active nav link based on scroll position
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Back to top button visibility
    const backToTopButton = document.querySelector('.back-to-top');
    if(backToTopButton) {
        window.addEventListener('scroll', function() {
            if(window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
    }
  });
  
  // Function to toggle the mobile menu
  function toggleMenu() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
    
    // Store menu state in local storage
    const isMenuOpen = dropdown.classList.contains('active');
    localStorage.setItem('menuOpen', isMenuOpen);
    
    // Toggle body scroll when menu is open/closed
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }
  
  // Check if menu was open in previous session
  function checkMenuState() {
    const wasMenuOpen = localStorage.getItem('menuOpen') === 'true';
    if(wasMenuOpen) {
        document.querySelector('.dropdown').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
  }
  
  // Typewriter effect
  function initTypewriter() {
    const textElement = document.querySelector('.typewriter-text');
    if(!textElement) return;
    
    const phrases = [
        'Cyber Security Student',
        'Ethical Hacker',
        'IT Enthusiast',
        'Penetration Tester',
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if(isDeleting) {
            // Delete characters
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Delete faster
        } else {
            // Type characters
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Type slower
        }
        
        // If word is complete
        if(!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            isDeleting = true;
            typingSpeed = 1500; // Wait before deleting
        } 
        // If deletion is complete
        else if(isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Next phrase
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(type, 1000);
  }
  
  // Highlight active nav based on scroll position
  function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.links .link a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if(pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${currentSection}` || 
           (currentSection === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
  }
  
  // Add CSS animations on scroll
  window.addEventListener('scroll', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
  });
  
  // Form validation for contact form
  function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Validate name
    if(!name.value.trim()) {
        displayError(name, 'Name is required');
        isValid = false;
    }
    
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email.value.trim() || !emailPattern.test(email.value)) {
        displayError(email, 'Valid email is required');
        isValid = false;
    }
    
    // Validate message
    if(!message.value.trim()) {
        displayError(message, 'Message is required');
        isValid = false;
    }
    
    return isValid;
  }
    

//for gallery part
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
                
                // Add animation
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 200);
            });
        });
    });
    
    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const galleryImages = document.querySelectorAll('.gallery-image img');
    
    // Open lightbox when an image is clicked
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h3')?.textContent || '';
            const description = this.querySelector('p')?.textContent || '';
            
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
            lightbox.style.display = 'block';
            
            currentImageIndex = index;
            updateNavigationButtons();
            
            document.body.style.overflow = 'hidden'; // Prevent scrolling while lightbox is open
        });
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
    
    // Click outside of image to close lightbox
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Next image
    nextBtn.addEventListener('click', function() {
        currentImageIndex++;
        if (currentImageIndex >= galleryItems.length) {
            currentImageIndex = 0;
        }
        updateLightboxContent();
    });
    
    // Previous image
    prevBtn.addEventListener('click', function() {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = galleryItems.length - 1;
        }
        updateLightboxContent();
    });
    
    // Update lightbox content
    function updateLightboxContent() {
        const item = galleryItems[currentImageIndex];
        
        if (item.style.display !== 'none') {
            const img = item.querySelector('img');
            const title = item.querySelector('h3')?.textContent || '';
            const description = item.querySelector('p')?.textContent || '';
            
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
            
            updateNavigationButtons();
        } else {
            // If current image is hidden by filter, find next visible image
            if (nextBtn.click()) {
                nextBtn.click();
            } else {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    }
    
    // Update navigation buttons visibility
    function updateNavigationButtons() {
        // Count visible items
        const visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
        
        if (visibleItems.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        }
    }
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'Escape') {
                closeLightbox.click();
            }
        }
    });
    
    // Also update the toggleMenu function if it's not already in your script.js
    window.toggleMenu = function() {
        const dropdown = document.querySelector('.dropdown');
        dropdown.classList.toggle('active');
    };
    
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
});

// Function to toggle mobile menu
function toggleMenu() {
    document.querySelector('.dropdown').classList.toggle('active');
}

// Form validation function
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
        alert('Please fill all fields');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Alert on successful submission
    alert('You have submitted the form');
    
    // Clear form fields after submission
    document.getElementById('contactForm').reset();
    
    // Prevent actual form submission to server
    return false;
}

// Add event listener to the form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            validateForm();
        });
    }
});