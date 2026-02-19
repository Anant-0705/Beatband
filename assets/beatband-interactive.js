/**
 * BeatBand Interactive Enhancements
 * Custom JavaScript for enhanced user experience
 */

(function() {
  'use strict';

  // ========================================
  // SCROLL REVEAL ANIMATIONS
  // ========================================
  
  function initScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe product cards
    document.querySelectorAll('.product-card, .collection-card').forEach(card => {
      observer.observe(card);
    });

    // Observe sections
    document.querySelectorAll('section[class*="section"]').forEach(section => {
      observer.observe(section);
    });
  }

  // ========================================
  // PARALLAX EFFECT
  // ========================================
  
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (!parallaxElements.length) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          
          parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
    });
  }

  // ========================================
  // MAGNETIC CURSOR EFFECT
  // ========================================
  
  function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.button-primary, .magnetic-hover');
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ========================================
  // SMOOTH SCROLL TO ANCHOR
  // ========================================
  
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        
        const headerOffset = document.querySelector('header-component')?.offsetHeight || 0;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  // ========================================
  // PRODUCT CARD HOVER EFFECTS
  // ========================================
  
  function enhanceProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
      // Add 3D tilt effect
      card.addEventListener('mousemove', (e) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  // ========================================
  // ADD TO CART SUCCESS ANIMATION
  // ========================================
  
  function enhanceAddToCart() {
    document.addEventListener('cart:item-added', (event) => {
      // Create success notification
      const notification = document.createElement('div');
      notification.className = 'cart-success-popup';
      notification.innerHTML = `
        <div class="cart-success-content animated-gradient">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Added to cart!</span>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      // Add styles dynamically
      const styles = document.createElement('style');
      styles.textContent = `
        .cart-success-popup {
          position: fixed;
          top: 100px;
          right: 20px;
          z-index: 10000;
          animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
        }
        .cart-success-content {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
        }
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          to {
            opacity: 0;
            transform: translateX(400px);
          }
        }
      `;
      document.head.appendChild(styles);
      
      // Remove notification after animation
      setTimeout(() => {
        notification.remove();
        styles.remove();
      }, 3000);
    });
  }

  // ========================================
  // DYNAMIC BACKGROUND MESH
  // ========================================
  
  function initDynamicBackground() {
    const hero = document.querySelector('.hero, [class*="hero"]');
    if (!hero) return;

    // Create floating particles
    const particleCount = window.innerWidth > 768 ? 20 : 10;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.animationDuration = `${8 + Math.random() * 4}s`;
      hero.appendChild(particle);
    }
  }

  // ========================================
  // STAGGER ANIMATIONS FOR LISTS
  // ========================================
  
  function initStaggerAnimations() {
    const grids = document.querySelectorAll('.product-grid, .collection-list');
    
    grids.forEach(grid => {
      const items = grid.querySelectorAll('.product-grid__item, .collection-list__item');
      
      items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in-up');
      });
    });
  }

  // ========================================
  // HEADER SCROLL EFFECT
  // ========================================
  
  function enhanceHeader() {
    const header = document.querySelector('header-component');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset;
          
          if (currentScroll > 100) {
            header.classList.add('header-scrolled');
            header.style.boxShadow = '0 4px 30px rgba(99, 102, 241, 0.15)';
            header.style.backdropFilter = 'blur(20px)';
          } else {
            header.classList.remove('header-scrolled');
            header.style.boxShadow = '';
            header.style.backdropFilter = '';
          }
          
          lastScroll = currentScroll;
          ticking = false;
        });
        
        ticking = true;
      }
    });
  }

  // ========================================
  // IMAGE LAZY LOAD WITH FADE IN
  // ========================================
  
  function enhanceImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease-in-out';
      
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    });
  }

  // ========================================
  // PRODUCT VARIANT COLOR PREVIEW
  // ========================================
  
  function enhanceVariantPicker() {
    const variantSwatches = document.querySelectorAll('[data-variant-swatch]');
    
    variantSwatches.forEach(swatch => {
      swatch.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
        this.style.zIndex = '10';
      });
      
      swatch.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '1';
      });
    });
  }

  // ========================================
  // ANIMATED COUNTER
  // ========================================
  
  function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.dataset.counter);
          const duration = 2000;
          const startTime = Date.now();
          
          function updateCounter() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(progress * endValue);
            
            target.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              target.textContent = endValue.toLocaleString();
            }
          }
          
          updateCounter();
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
  }

  // ========================================
  // INITIALIZE ALL ENHANCEMENTS
  // ========================================
  
  function init() {
    // Detect device type
    const isMobile = window.matchMedia('(max-width: 749px)').matches;
    const isTablet = window.matchMedia('(min-width: 750px) and (max-width: 989px)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      initScrollReveal();
      
      // Only init parallax on larger screens
      if (!isMobile) {
        initParallax();
      }
      
      // Reduce intensive animations on mobile
      if (!isMobile) {
        initDynamicBackground();
      }
      
      initStaggerAnimations();
      
      // Only 3D effects on desktop with mouse
      if (!isTouchDevice && !isMobile && !isTablet) {
        enhanceProductCards();
      }
    }
    
    // Initialize non-animation features
    if (!isTouchDevice) {
      initMagneticButtons(); // Only for mouse users
    }
    
    initSmoothScroll();
    enhanceAddToCart();
    enhanceHeader();
    enhanceImageLoading();
    enhanceVariantPicker();
    animateCounters();
    
    // Mobile-specific enhancements
    if (isMobile || isTouchDevice) {
      initMobileEnhancements();
    }
    
    // Tablet-specific enhancements
    if (isTablet) {
      initTabletEnhancements();
    }
    
    console.log('🎵 BeatBand enhancements loaded successfully!');
  }
  
  // ========================================
  // MOBILE-SPECIFIC ENHANCEMENTS
  // ========================================
  
  function initMobileEnhancements() {
    // Prevent scroll during menu open
    const menuButton = document.querySelector('[aria-controls="header-drawer"]');
    if (menuButton) {
      menuButton.addEventListener('click', () => {
        document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
      });
    }
    
    // Touch feedback for cards
    const cards = document.querySelectorAll('.product-card, .collection-card');
    cards.forEach(card => {
      card.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
      });
      
      card.addEventListener('touchend', function() {
        this.style.transform = '';
      });
    });
    
    // Swipe to close drawer
    initSwipeGestures();
    
    // Optimize images for mobile
    lazyLoadMobileImages();
    
    // Add haptic feedback (if supported)
    if ('vibrate' in navigator) {
      document.querySelectorAll('.button-primary').forEach(button => {
        button.addEventListener('click', () => {
          navigator.vibrate(10); // Subtle vibration
        });
      });
    }
  }
  
  // ========================================
  // TABLET-SPECIFIC ENHANCEMENTS
  // ========================================
  
  function initTabletEnhancements() {
    // Optimize grid layout for tablets
    const grids = document.querySelectorAll('.product-grid');
    grids.forEach(grid => {
      grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    });
  }
  
  // ========================================
  // SWIPE GESTURES
  // ========================================
  
  function initSwipeGestures() {
    const drawers = document.querySelectorAll('.cart-drawer, .header-drawer');
    
    drawers.forEach(drawer => {
      let startX = 0;
      let currentX = 0;
      let isDragging = false;
      
      drawer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      });
      
      drawer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        
        // Only allow swipe in the correct direction
        if ((drawer.classList.contains('cart-drawer') && diff > 0) ||
            (drawer.classList.contains('header-drawer') && diff < 0)) {
          drawer.style.transform = `translateX(${diff}px)`;
        }
      });
      
      drawer.addEventListener('touchend', () => {
        if (!isDragging) return;
        
        const diff = currentX - startX;
        const threshold = 100;
        
        if (Math.abs(diff) > threshold) {
          // Close drawer
          const closeButton = drawer.querySelector('[data-close-drawer]');
          if (closeButton) closeButton.click();
        } else {
          // Reset position
          drawer. style.transform = '';
        }
        
        isDragging = false;
        drawer.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
          drawer.style.transition = '';
        }, 300);
      });
    });
  }
  
  // ========================================
  // LAZY LOAD MOBILE IMAGES
  // ========================================
  
  function lazyLoadMobileImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Add loading class
            img.classList.add('loading-shimmer');
            
            // Load image
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            
            img.addEventListener('load', () => {
              img.classList.remove('loading-shimmer');
              img.style.opacity = '1';
            });
            
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }
  
  // ========================================
  // VIEWPORT RESIZE HANDLER
  // ========================================
  
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reinit on orientation change
      const isMobile = window.matchMedia('(max-width: 749px)').matches;
      
      if (isMobile) {
        // Adjust for mobile viewport changes
        document.body.style.minHeight = `${window.innerHeight}px`;
      }
    }, 250);
  });
  
  // ========================================
  // NETWORK-AWARE LOADING
  // ========================================
  
  function optimizeForConnection() {
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      if (connection) {
        const effectiveType = connection.effectiveType;
        
        // Disable heavy animations on slow connections
        if (effectiveType === '2g' || effectiveType === 'slow-2g') {
          document.body.classList.add('reduced-animations');
          
          // Add CSS for reduced animations
          const style = document.createElement('style');
          style.textContent = `
            .reduced-animations * {
              animation-duration: 0.01ms !important;
              transition-duration: 0.01ms !important;
            }
            .reduced-animations .particle,
            .reduced-animations .animated-mesh {
              display: none !important;
            }
          `;
          document.head.appendChild(style);
        }
      }
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      optimizeForConnection();
    });
  } else {
    init();
    optimizeForConnection();
  }

  // Reinitialize on Shopify section load (theme editor)
  document.addEventListener('shopify:section:load', () => {
    setTimeout(init, 100);
  });
  
  // Handle orientation change
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      // Recalculate viewport
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 100);
  });
  
  // Set viewport height on load
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

})();
