// Mailchimp form validation
(function ($) {
  window.fnames = new Array();
  window.ftypes = new Array();
  fnames[0] = 'EMAIL'; ftypes[0] = 'email';
  fnames[1] = 'FNAME'; ftypes[1] = 'text';
  fnames[2] = 'LNAME'; ftypes[2] = 'text';
  fnames[3] = 'ADDRESS'; ftypes[3] = 'address';
  fnames[4] = 'PHONE'; ftypes[4] = 'phone';
  fnames[5] = 'BIRTHDAY'; ftypes[5] = 'birthday';
  fnames[6] = 'COMPANY'; ftypes[6] = 'text';
}(jQuery));
var $mcj = jQuery.noConflict(true);

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle with animation
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");

      // Animate menu icon
      if (menuToggle.classList.contains("active")) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }

  // Close menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // Enhanced header scroll effect with parallax
  const header = document.querySelector("header");
  const hero = document.querySelector(".hero");
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Header effect
    if (currentScrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Parallax effect for hero section
    if (hero && currentScrollY <= hero.offsetHeight) {
      const translateY = currentScrollY * 0.4;
      hero.style.backgroundPositionY = `calc(50% + ${translateY}px)`;
    }

    // Direction-aware scroll animations
    const scrollingDown = currentScrollY > lastScrollY;
    document.body.setAttribute('data-scroll-direction', scrollingDown ? 'down' : 'up');

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Run once on load

  // Smooth scroll for anchor links with enhanced easing
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate distance to scroll
        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top + startPosition - 80;
        const distance = targetPosition - startPosition;
        const duration = 1000; // ms
        let start = null;

        // Custom easing function
        function easeInOutQuart(t) {
          return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
        }

        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const percentage = Math.min(progress / duration, 1);
          const easing = easeInOutQuart(percentage);

          window.scrollTo(0, startPosition + distance * easing);

          if (progress < duration) {
            window.requestAnimationFrame(step);
          }
        }

        window.requestAnimationFrame(step);
      }
    });
  });

  // Enhanced form interactions
  const enhanceForms = () => {
    // Newsletter form with enhanced feedback
    const newsletterForm = document.querySelector(".newsletter-form");
    if (newsletterForm) {
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');

      // Add focus effects
      if (emailInput) {
        emailInput.addEventListener('focus', () => {
          emailInput.parentElement.classList.add('focused');
        });

        emailInput.addEventListener('blur', () => {
          emailInput.parentElement.classList.remove('focused');
        });
      }

      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (emailInput && emailInput.value) {
          // Visual feedback animation
          submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';

          // Simulate server request
          setTimeout(() => {
            // Success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            submitBtn.classList.add('success');
            emailInput.value = "";

            // Reset after delay
            setTimeout(() => {
              submitBtn.innerHTML = 'Subscribe';
              submitBtn.classList.remove('success');
            }, 3000);
          }, 1500);
        }
      });
    }

    // Contact form with enhanced validation and feedback
    const contactForm = document.querySelector(".contact-form form");
    if (contactForm) {
      const formInputs = contactForm.querySelectorAll('input, textarea');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      // Add validation classes
      formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', () => {
          input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
          input.parentElement.classList.remove('focused');

          // Validate on blur
          if (input.hasAttribute('required') && !input.value.trim()) {
            input.parentElement.classList.add('error');
          } else {
            input.parentElement.classList.remove('error');
          }

          // Email validation
          if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
              input.parentElement.classList.add('error');
            }
          }
        });

        // Clear error on input
        input.addEventListener('input', () => {
          input.parentElement.classList.remove('error');
        });
      });

      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Validate all fields
        let hasErrors = false;
        formInputs.forEach(input => {
          if (input.hasAttribute('required') && !input.value.trim()) {
            input.parentElement.classList.add('error');
            hasErrors = true;
          }

          if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
              input.parentElement.classList.add('error');
              hasErrors = true;
            }
          }
        });

        if (!hasErrors) {
          // Visual feedback animation
          submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
          submitBtn.disabled = true;

          // Simulate server request
          setTimeout(() => {
            // Success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.classList.add('success');

            // Reset form
            this.reset();

            // Reset after delay
            setTimeout(() => {
              submitBtn.innerHTML = 'Send Message';
              submitBtn.classList.remove('success');
              submitBtn.disabled = false;
            }, 3000);
          }, 1500);
        }
      });
    }
  };

  enhanceForms();

  // Advanced scroll animations with Intersection Observer
  const setupScrollAnimations = () => {
    // Elements to animate
    const animatedElements = document.querySelectorAll(
      ".blog-card, .affiliate-card, .about-image, .about-text, .section-title, .stat, .contact-item, .social-links a"
    );

    // Animation variations
    const animations = [
      'fade-in',
      'slide-up',
      'slide-left',
      'slide-right',
      'scale-in',
      'rotate-in'
    ];

    // Assign random animations to elements
    animatedElements.forEach((element, index) => {
      // Assign animation class
      const animationClass = `animate-${animations[index % animations.length]}`;
      element.classList.add(animationClass);

      // Set initial state
      element.style.opacity = "0";

      // Add delay for staggered effect
      const delay = (index % 3) * 0.15;
      element.style.transitionDelay = `${delay}s`;
    });

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          entry.target.style.opacity = "1";

          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    });

    // Observe all elements
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  };

  setupScrollAnimations();

  // Parallax effect for sections
  const setupParallaxEffects = () => {
    const parallaxSections = document.querySelectorAll('.about, .affiliates, .newsletter');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      parallaxSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Check if section is in viewport
        if (scrollY > sectionTop - window.innerHeight && scrollY < sectionTop + sectionHeight) {
          const yPos = (scrollY - sectionTop) * 0.1;
          section.style.backgroundPositionY = `calc(50% + ${yPos}px)`;
        }
      });
    });
  };

  setupParallaxEffects();

  // Typed.js-like effect for hero subtitle
  const setupTypingEffect = () => {
    const heroSubtitle = document.querySelector('.hero-content h2');

    if (heroSubtitle) {
      const text = heroSubtitle.textContent;
      heroSubtitle.textContent = '';

      const typeText = (text, element, i = 0) => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          setTimeout(() => typeText(text, element, i + 1), 100);
        } else {
          // Add blinking cursor at the end
          element.classList.add('typing-done');
        }
      };

      // Start typing after a delay
      setTimeout(() => {
        typeText(text, heroSubtitle);
      }, 1500);
    }
  };

  setupTypingEffect();

  // Interactive affiliate cards
  const setupAffiliateCards = () => {
    const affiliateCards = document.querySelectorAll('.affiliate-card');

    affiliateCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        // Add 3D tilt effect
        card.style.transition = 'transform 0.3s ease';

        card.addEventListener('mousemove', (e) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const cardCenterY = cardRect.top + cardRect.height / 2;

          const mouseX = e.clientX - cardCenterX;
          const mouseY = e.clientY - cardCenterY;

          // Calculate rotation based on mouse position
          const rotateX = mouseY * -0.05;
          const rotateY = mouseX * 0.05;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';

        // Remove mousemove event
        card.removeEventListener('mousemove', () => { });
      });
    });
  };

  setupAffiliateCards();

  // Preload images for smoother experience
  const preloadImages = () => {
    const imagesToPreload = document.querySelectorAll('img');

    imagesToPreload.forEach(img => {
      const src = img.getAttribute('src');
      if (src) {
        const preloadImg = new Image();
        preloadImg.src = src;
      }
    });
  };

  preloadImages();

  // Add scroll progress indicator
  const setupScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
      width: 0%;
      z-index: 1001;
      transition: width 0.1s ease;
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      progressBar.style.width = `${scrollPercent}%`;
    });
  };

  setupScrollProgress();

  // Add back-to-top button
  const setupBackToTop = () => {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--gradient);
      color: white;
      border: none;
      cursor: pointer;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.transform = 'translateY(0)';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transform = 'translateY(20px)';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  setupBackToTop();

  // Add dark/light mode toggle
  const setupThemeToggle = () => {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 70px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--gradient);
      color: white;
      border: none;
      cursor: pointer;
      z-index: 999;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    `;

    document.body.appendChild(themeToggle);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');

      if (document.body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
      }
    });
  };

  setupThemeToggle();

  // Add CSS for dark theme
  const addDarkThemeStyles = () => {
    const darkThemeStyles = document.createElement('style');
    darkThemeStyles.textContent = `
      body.dark-theme {
        --text-color: #f0f0f0;
        --dark-color: #121212;
        --light-color: #1e1e1e;
        --gray-color: #2a2a2a;
        background-color: #121212;
        color: #f0f0f0;
      }

      body.dark-theme header {
        background-color: rgba(30, 30, 30, 0.95);
      }

      body.dark-theme header.scrolled {
        background-color: rgba(30, 30, 30, 0.98);
      }

      body.dark-theme .blog-card,
      body.dark-theme .affiliate-card,
      body.dark-theme .form-group input,
      body.dark-theme .form-group textarea {
        background-color: #1e1e1e;
        color: #f0f0f0;
      }

      body.dark-theme .blog-content h3,
      body.dark-theme .affiliate-card h3 {
        color: #f0f0f0;
      }

      body.dark-theme .blog-content p,
      body.dark-theme .affiliate-card p,
      body.dark-theme .stat-text {
        color: #aaa;
      }

      body.dark-theme .social-links a {
        background-color: #2a2a2a;
        color: #f0f0f0;
      }

      body.dark-theme .form-group input,
      body.dark-theme .form-group textarea {
        border-color: #333;
      }

      body.dark-theme .section-title {
        color: #f0f0f0;
      }

      body.dark-theme .nav-links a {
        color: #f0f0f0;
      }
    `;

    document.head.appendChild(darkThemeStyles);
  };

  addDarkThemeStyles();

  // Add image lazy loading
  const setupLazyLoading = () => {
    const lazyImages = document.querySelectorAll('img:not([loading])');

    lazyImages.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  };

  setupLazyLoading();

  // Add page load animation
  const setupPageLoadAnimation = () => {
    const pageOverlay = document.createElement('div');
    pageOverlay.className = 'page-overlay';
    pageOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--dark-color);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.5s ease;
    `;

    const logo = document.createElement('div');
    logo.className = 'overlay-logo';
    logo.style.cssText = `
      font-size: 2.5rem;
      font-weight: 700;
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      opacity: 0;
      transform: scale(0.8);
      transition: all 0.5s ease;
    `;
    logo.textContent = 'PJ Ventures';

    pageOverlay.appendChild(logo);
    document.body.appendChild(pageOverlay);

    // Animate logo
    setTimeout(() => {
      logo.style.opacity = '1';
      logo.style.transform = 'scale(1)';
    }, 100);

    // Hide overlay
    setTimeout(() => {
      pageOverlay.style.opacity = '0';

      // Remove overlay after animation
      setTimeout(() => {
        pageOverlay.remove();
      }, 500);
    }, 1500);
  };

  setupPageLoadAnimation();

  // Blog post popup functionality
  const setupBlogPopups = () => {
    const blogCards = document.querySelectorAll('.blog-card');
    const popupOverlay = document.getElementById('popup-overlay');
    const closeButtons = document.querySelectorAll('.close-popup');

    // Open popup when clicking on a blog card
    blogCards.forEach(card => {
      card.addEventListener('click', function() {
        const blogId = this.getAttribute('data-blog-id');
        if (blogId) {
          const popup = document.getElementById(`popup-${blogId}`);
          if (popup) {
            // Show overlay
            popupOverlay.style.display = 'block';

            // Show popup
            popup.style.display = 'block';

            // Add active class after a small delay (for animation)
            setTimeout(() => {
              popup.classList.add('active');
            }, 10);

            // Prevent scrolling on body
            document.body.style.overflow = 'hidden';
          }
        }
      });
    });

    // Close popup when clicking on close button
    closeButtons.forEach(button => {
      button.addEventListener('click', closePopup);
    });

    // Close popup when clicking on overlay
    popupOverlay.addEventListener('click', closePopup);

    // Close popup when pressing ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closePopup();
      }
    });

    // Function to close active popup
    function closePopup() {
      const activePopup = document.querySelector('.blog-popup.active');
      if (activePopup) {
        activePopup.classList.remove('active');

        // Hide popup after animation completes
        setTimeout(() => {
          activePopup.style.display = 'none';
          popupOverlay.style.display = 'none';

          // Re-enable scrolling on body
          document.body.style.overflow = '';
        }, 300);
      }
    }
  };

  setupBlogPopups();

  // Gallery functionality for blog popups
  const setupGallery = () => {
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    const mainImage = document.querySelector('.popup-main-image');

    if (galleryThumbs.length && mainImage) {
      // Set first thumbnail as active by default
      galleryThumbs[0].classList.add('active');

      galleryThumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
          // Update main image
          const fullImageSrc = this.getAttribute('data-full');
          const altText = this.getAttribute('alt');

          // Animate image change
          mainImage.style.opacity = '0';

          setTimeout(() => {
            mainImage.src = fullImageSrc;
            mainImage.alt = altText;
            mainImage.style.opacity = '1';
          }, 300);

          // Update active state
          galleryThumbs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }
  };

  // Call gallery setup when a popup is opened
  document.addEventListener('click', function(e) {
    if (e.target.closest('.blog-card')) {
      // Small delay to ensure popup is rendered
      setTimeout(setupGallery, 100);
    }
  });
});
