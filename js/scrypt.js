/*
  ╔════════════════════════════════════════════════════════════════════════════╗
  ║ EMO CLXN — INTERACTIVE SITE APP LOGIC (SCRYPT.JS)                           ║
  ║ Complete integration of all 10 premium features                            ║
  ╚════════════════════════════════════════════════════════════════════════════╝
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // --- STATE VARIABLES ---
  let systemSyncProgress = 0;
  const uniqueActions = {
    themeSwapped: false,
    cardSearched: false,
    carouselSwiped: false,
    modalOpened: false,
    lightboxOpened: false,
    inputFilled: false,
    formSubmitted: false
  };

  // Lore data for Modal Window (Feature 2)
  const factionData = {
    'heritage': {
      title: 'CAPT SQUAD',
      code: 'SYS_01_MAIN',
      description: 'Основной состав нашей капт-семьи на сервере Burton. Элитные стрелки, доминирующие в опасном районе (гетто). Требования: идеальная стрельба с револьвера и карабина, ежедневный онлайн от 3 часов, знание правил каптов на 10/10 и обязательная запись откатов (ShadowPlay) без стороннего ПО.',
      resonance: 'Aim Rate: 98%',
      material: 'Оружие: Heavy Pistol / Carabine',
      energy: 'Откаты: Обязательно (Geforce)'
    },
    'liquid-chrome': {
      title: 'RECROOTS',
      code: 'SYS_02_RECRUITS',
      description: 'Резервный состав и тренировочная база. Проходят дуэли на арене, разборы тактических карт и тренировки координации. Лучшие рекруты, показавшие выдающийся KD и знание правил, еженедельно переводятся в основной капт-состав.',
      resonance: 'Aim Rate: 85%+',
      material: 'Оружие: Heavy Pistol',
      energy: 'Арена Дуэли: Ежедневно'
    },
    'cyber-sigils': {
      title: 'BIZWAR SQUAD',
      code: 'SYS_03_BIZWAR',
      description: 'Тактический состав по захвату бизнесов на сервере Burton. Специализируются на закрытых локациях, просчете фланговых обходов, удержании высот и командной координации. Способны выиграть перестрелку в меньшинстве за счет жесткого позиционирования.',
      resonance: 'Win Rate: 95.4%',
      material: 'Оружие: Assault Rifle / Revolver',
      energy: 'Тактика: Позиционная доминанта'
    },
    'vapor-noise': {
      title: 'MEDIA TEAM',
      code: 'SYS_04_MEDIA',
      description: 'Официальные стримеры, ютуберы и мувимейкеры нашей семьи. Освещают наши победы и создают качественный гетто-контент.',
      resonance: 'Аудитория: 50K+',
      material: 'Платформа: Twitch / YouTube',
      energy: 'Контент: Fragmovies & Streams'
    }
  };


  // ==========================================
  // 8. FLOATING NOTIFICATIONS CENTRAL (Feature 8)
  // ==========================================
  const notifyCenter = document.getElementById('notificationCenter');

  function notify(message, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    
    const indicator = document.createElement('div');
    indicator.className = 'toast-indicator';
    
    const body = document.createElement('div');
    body.className = 'toast-body code-font';
    body.innerHTML = message;
    
    toast.appendChild(indicator);
    toast.appendChild(body);
    notifyCenter.appendChild(toast);
    
    // Manual click dismiss
    toast.addEventListener('click', () => {
      dismissToast(toast);
    });
    
    // Auto dismiss timer
    setTimeout(() => {
      dismissToast(toast);
    }, duration);
  }

  function dismissToast(toastElement) {
    if (!toastElement.parentNode) return;
    toastElement.classList.add('dismissing');
    setTimeout(() => {
      if (toastElement.parentNode) {
        toastElement.remove();
      }
    }, 300);
  }


  // ==========================================
  // 10. SYSTEM BOOTLOADER PROGRESS (Feature 10)
  // ==========================================
  const bootloader = document.getElementById('bootloader');
  const bootloaderProgress = document.getElementById('bootloaderProgress');
  const bootloaderPercentage = document.getElementById('bootloaderPercentage');
  const bootloaderStatus = document.getElementById('bootloaderStatus');

  const bootStatusMessages = [
    { threshold: 0, text: 'Инициализация состава EMO CLXN...' },
    { threshold: 15, text: 'Кидаем спанк для разгона пульса...' },
    { threshold: 35, text: 'Заряжаем каптерку припасами...' },
    { threshold: 55, text: 'Лоудим тяжелые ревики и карабины...' },
    { threshold: 75, text: 'Включаем запись отката ShadowPlay...' },
    { threshold: 90, text: 'Прогреваем руки на арене 100/100...' },
    { threshold: 100, text: 'КОННЕКТ УСТАНОВЛЕН! В БОЙ!' }
  ];

  let bootValue = 0;
  const bootInterval = setInterval(() => {
    bootValue += Math.floor(Math.random() * 8) + 3;
    if (bootValue >= 100) {
      bootValue = 100;
      clearInterval(bootInterval);
      
      // Update text to complete
      bootloaderProgress.style.width = '100%';
      bootloaderPercentage.textContent = '100%';
      bootloaderStatus.textContent = 'СИСТЕМА УСПЕШНО ГОТОВА!';
      
      // Fade out screen
      setTimeout(() => {
        bootloader.classList.add('hidden');
        // Trigger hero entrance orchestration
        document.body.classList.add('hero-play');
        // Apply ambient glitch loop AFTER letter drop completes
        setTimeout(() => {
          const heroTitle = document.querySelector('.hero-title');
          if (heroTitle) heroTitle.classList.add('hero-revealed');
        }, 2400);
        notify('добро пожаловать в emoclxn', 'success', 4500);
        // Start counter checks
        initCountersObserver();
      }, 700);
    } else {
      bootloaderProgress.style.width = `${bootValue}%`;
      bootloaderPercentage.textContent = `${bootValue}%`;
      
      // Update loader logs
      const msg = bootStatusMessages.find(m => bootValue >= m.threshold && bootValue < (bootStatusMessages[bootStatusMessages.indexOf(m) + 1]?.threshold || 101));
      if (msg) bootloaderStatus.textContent = msg.text;
    }
  }, 100);


  // ==========================================
  // 10. PERSISTENT STATUS TRACKER (REMOVED)
  // ==========================================
  function updateSystemSynchronization(actionKey, points) {
    // Status tracker is removed
  }


  // ==========================================
  // 5. THEME SWITCHER & LOCALSTORAGE (Feature 5, 7)
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggle');
  
  // Set initial theme state from localStorage
  const savedDarkMode = localStorage.getItem('darkMode') !== 'false';
  applyTheme(savedDarkMode);

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.remove('light-mode');
      if (themeToggleBtn) {
        themeToggleBtn.textContent = '🌙';
        themeToggleBtn.setAttribute('title', 'Активировать светлую схему');
      }
    } else {
      document.body.classList.add('light-mode');
      if (themeToggleBtn) {
        themeToggleBtn.textContent = '☀️';
        themeToggleBtn.setAttribute('title', 'Активировать темную готику');
      }
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDarkNow = !document.body.classList.contains('light-mode');
      const targetThemeDark = !isDarkNow;
      
      applyTheme(targetThemeDark);
      localStorage.setItem('darkMode', targetThemeDark);
      
      updateSystemSynchronization('themeSwapped', 15);
      
      if (targetThemeDark) {
        notify('Тёмный режим активирован. Хром отражает бездну.', 'info', 3000);
      } else {
        notify('Светлый режим активирован. Стерильный футуризм запущен.', 'info', 3000);
      }
    });
  }


  // ==========================================
  // 4. ANIMATED COUNTER (Feature 4)
  // ==========================================
  function initCountersObserver() {
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-num');
    
    if (!statsSection || statNumbers.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(statNumbers);
          observer.disconnect(); // Fire only once
        }
      });
    }, { threshold: 0.1 });

    observer.observe(statsSection);
  }

  function animateCounter(elements) {
    elements.forEach(element => {
      const target = parseInt(element.getAttribute('data-target'), 10);
      const duration = 1500; // Counter total run duration in ms
      const startTime = performance.now();

      function step(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progressFraction = Math.min(elapsedTime / duration, 1);
        
        // Easing out quadratic function
        const easedProgress = progressFraction * (2 - progressFraction);
        const currentValue = Math.floor(easedProgress * target);
        
        element.textContent = currentValue;

        if (progressFraction < 1) {
          requestAnimationFrame(step);
        } else {
          element.textContent = target;
        }
      }

      requestAnimationFrame(step);
    });
  }


  // ==========================================
  // 9. SHAPE GALLERY & LIGHTBOX (Feature 9)
  // ==========================================
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxContentWrapper = document.getElementById('lightboxContentWrapper');
  const lightboxCaption = document.getElementById('lightboxCaption');

  document.querySelectorAll('.gallery-item-card').forEach(card => {
    card.addEventListener('click', () => {
      const mediaSrc = card.getAttribute('data-src');
      const captionText = card.getAttribute('data-caption');
      
      lightboxContentWrapper.innerHTML = '';
      
      // Render regular image elements
      const img = document.createElement('img');
      img.src = mediaSrc;
      img.className = 'lightbox-img';
      img.alt = 'EMO CLXN high definition shape view';
      
      lightboxContentWrapper.appendChild(img);
      
      // Let browser render before animating scale
      setTimeout(() => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }, 50);

      lightboxCaption.textContent = captionText;
      lightboxOverlay.classList.add('active');
      
      updateSystemSynchronization('lightboxOpened', 15);
    });
  });

  // 9.2 BIZWAR ARCHIVE VIDEO PLAYER HANDLER
  const playArchiveVideoBtn = document.getElementById('playArchiveVideo');
  if (playArchiveVideoBtn) {
    playArchiveVideoBtn.addEventListener('click', () => {
      const videoId = playArchiveVideoBtn.getAttribute('data-video-id') || 'HP5_l6GB4WA';
      lightboxContentWrapper.innerHTML = '';
      
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.className = 'lightbox-video';
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', 'true');
      
      lightboxContentWrapper.appendChild(iframe);
      lightboxCaption.textContent = 'EMO CLXN // BIZWAR DOMINANCE HIGHLIGHTS [BURTON 86/86]';
      lightboxOverlay.classList.add('active');
      
      updateSystemSynchronization('lightboxOpened', 15);
    });
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    lightboxContentWrapper.innerHTML = '';
  }

  lightboxCloseBtn.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay || e.target === lightboxContentWrapper) {
      closeLightbox();
    }
  });


  // ==========================================
  // 3. CONTACT FORM REPLACED BY DIRECT DISCORD TICKET
  // ==========================================
  // Form elements removed for premium Discord ticket direct flow.

  // Brand click triggers easter egg info popups
  document.getElementById('brandHome').addEventListener('click', () => {
    notify('EMO CLXN — GTA 5 RP Capture Family. Синхронизация гетто-сектора активна.', 'info', 3500);
  });

  // Hero Logo pulses on mouse move hover
  const heroPulseLogo = document.getElementById('heroPulseLogo');
  if (heroPulseLogo) {
    heroPulseLogo.addEventListener('mousemove', (e) => {
      const rect = heroPulseLogo.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      
      // subtle 3D hover tilt
      heroPulseLogo.style.transform = `scale(1.04) rotateX(${-y / 8}deg) rotateY(${x / 8}deg)`;
    });
    
    heroPulseLogo.addEventListener('mouseleave', () => {
      heroPulseLogo.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
    });
  }

  // ==========================================
  // 11. CYBER-TARGET CUSTOM CURSOR
  // ==========================================
  const cursorDot = document.getElementById('customCursorDot');
  const cursorCircle = document.getElementById('customCursorCircle');
  
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;

  if (isTouchDevice) {
    // Mobile/Tablet Override: hide custom cursor elements completely and restore native cursor
    const mobileStyle = document.createElement('style');
    mobileStyle.innerHTML = `
      * { cursor: auto !important; }
      #customCursorDot, #customCursorCircle, .custom-cursor-dot, .custom-cursor-circle {
        display: none !important;
      }
    `;
    document.head.appendChild(mobileStyle);
  }

  if (cursorDot && cursorCircle) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = mouseX;
    let circleY = mouseY;
    let cursorVisible = false;

    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isTouchDevice) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        
        // Reveal custom cursor elements smoothly on first movement to avoid 0,0 page-load freeze
        if (!cursorVisible) {
          cursorDot.classList.add('visible');
          cursorCircle.classList.add('visible');
          cursorVisible = true;
        }
      }
    });

    // Smooth spring lag for outer ring
    function updateCirclePosition() {
      if (!isTouchDevice) {
        const delay = 0.15; // spring rate
        circleX += (mouseX - circleX) * delay;
        circleY += (mouseY - circleY) * delay;

        cursorCircle.style.left = `${circleX}px`;
        cursorCircle.style.top = `${circleY}px`;
      }

      requestAnimationFrame(updateCirclePosition);
    }
    requestAnimationFrame(updateCirclePosition);

    // Dynamic hover scaling on all active interactive targets
    const hoverablesSelector = 'a, button, input, textarea, .contact-social-card, .domination-full-card, .redux-item, .redux-btn, .gallery-item-card, .nav-brand';
    
    // Delegate listeners or attach directly
    document.querySelectorAll(hoverablesSelector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!isTouchDevice) {
          document.body.classList.add('cursor-active');
        }
      });
      el.addEventListener('mouseleave', () => {
        if (!isTouchDevice) {
          document.body.classList.remove('cursor-active');
        }
      });
    });
  }

  // ==========================================
  // 12. SMART AUTO-HIDE HEADER WITH TOP EDGE REVEAL
  // ==========================================
  const mainHeader = document.querySelector('header');
  if (mainHeader) {
    let lastScrollY = window.scrollY;
    let isHidden = false;

    // Detect scroll direction to auto-hide
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 120 && currentScrollY > lastScrollY) {
        // Scrolling down - hide header smoothly
        if (!isHidden) {
          mainHeader.classList.add('nav-hidden');
          isHidden = true;
        }
      } else {
        // Scrolling up - reveal header
        if (isHidden) {
          mainHeader.classList.remove('nav-hidden');
          isHidden = false;
        }
      }
      lastScrollY = currentScrollY;
    }, { passive: true });

    // Reveal header immediately if mouse cursor moves to the top 25px edge of viewport
    window.addEventListener('mousemove', (e) => {
      if (e.clientY <= 25) {
        mainHeader.classList.remove('nav-hidden');
        isHidden = false;
      }
    });
  }

  // Cross-frame 3D tilt coordinate publisher for Sotka iframe
  const sotkaIframe = document.querySelector('.sotka-soon-iframe');
  if (sotkaIframe) {
    window.addEventListener('mousemove', (e) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Calculate mouse offset relative to parent window center (-1 to 1)
      const xVal = (e.clientX - width / 2) / (width / 2);
      const yVal = (e.clientY - height / 2) / (height / 2);
      
      sotkaIframe.contentWindow.postMessage({
        type: 'mousemove',
        relativeX: xVal,
        relativeY: yVal,
        isHovered: true // Keep tracking active across the entire website
      }, '*');
    });
  }


  // ==========================================
  // 13. SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }


  // ==========================================
  // 14. FLOATING PARTICLES BACKGROUND
  // ==========================================
  const particlesCanvas = document.getElementById('particlesCanvas');
  if (particlesCanvas) {
    const ctx = particlesCanvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resizeCanvas() {
      particlesCanvas.width = window.innerWidth;
      particlesCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += 0.02;

        if (this.x < 0 || this.x > particlesCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > particlesCanvas.height) this.speedY *= -1;
      }

      draw() {
        const currentOpacity = this.opacity * (0.6 + Math.sin(this.pulse) * 0.4);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 243, 255, ${currentOpacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 243, 255, ${currentOpacity * 0.15})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const lineOpacity = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 243, 255, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      drawLines();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }


  // ==========================================
  // 15. MOBILE BURGER MENU
  // ==========================================
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');

  // Safety: ensure body overflow is never stuck on page load
  document.body.style.overflow = '';

  if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close mobile nav and restore scroll on resize (orientation change, etc)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && mobileNav.classList.contains('active')) {
        burgerBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    }, { passive: true });

    // Safety: pressing Escape closes nav and restores scroll
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        burgerBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }


  // ==========================================
  // 16. HERO PARALLAX ON SCROLL
  // ==========================================
  const heroWrapper = document.querySelector('.hero-wrapper');
  const heroSection = document.querySelector('.hero-section');

  if (heroWrapper && heroSection) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

      if (scrollY < heroBottom) {
        const translateY = scrollY * 0.3;
        const opacity = 1 - (scrollY / heroBottom) * 0.6;
        heroWrapper.style.transform = `translateY(${translateY}px)`;
        heroWrapper.style.opacity = Math.max(opacity, 0.2);
      }
    }, { passive: true });
  }


  // ==========================================
  // 18. TEXT SPLIT REVEAL ANIMATIONS (chars / words)
  // ==========================================
  function splitTextNodes(element, mode) {
    const original = element.textContent.trim().replace(/\s+/g, ' ');
    element.textContent = '';

    if (mode === 'chars') {
      [...original].forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'text-split-char' + (char === ' ' ? ' is-space' : '');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.transitionDelay = `${i * 0.04}s`;
        element.appendChild(span);
      });
    } else if (mode === 'words') {
      original.split(' ').forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'text-split-word';
        span.textContent = word;
        span.style.transitionDelay = `${i * 0.06}s`;
        element.appendChild(span);
        element.appendChild(document.createTextNode(' '));
      });
    }
  }

  const splitElements = document.querySelectorAll('[data-animate]');
  splitElements.forEach(el => {
    const mode = el.getAttribute('data-animate');
    splitTextNodes(el, mode);
  });

  if (splitElements.length > 0) {
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');

          // Hide cursor for typewriter elements after reveal completes
          if (entry.target.classList.contains('text-typewriter')) {
            const charCount = entry.target.querySelectorAll('.text-split-char').length;
            const finishDelay = (charCount * 40) + 600 + 1500; // last char delay + transition + idle blink
            setTimeout(() => {
              entry.target.classList.add('is-finished');
            }, finishDelay);
          }

          textObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -80px 0px' });

    splitElements.forEach(el => textObserver.observe(el));
  }


  // ==========================================
  // 17. BUTTON RIPPLE EFFECT
  // ==========================================
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });


  // ==========================================
  // 19. 3D TILT CARDS + CURSOR SPOTLIGHT
  // ==========================================
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  const isWideScreen = window.innerWidth > 768;

  if (supportsHover && isWideScreen) {
    const tiltCards = document.querySelectorAll('.tilt-card');
    const MAX_TILT = 8; // degrees

    tiltCards.forEach(card => {
      let rafId = null;

      card.addEventListener('mouseenter', () => {
        card.classList.add('is-tilting');
      });

      card.addEventListener('mousemove', (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const mx = e.clientX - rect.left;
          const my = e.clientY - rect.top;

          // Spotlight position via CSS variables
          card.style.setProperty('--mx', `${mx}px`);
          card.style.setProperty('--my', `${my}px`);

          // Tilt: based on cursor offset from center, normalized to [-1, 1]
          const xRel = (mx / rect.width) * 2 - 1;
          const yRel = (my / rect.height) * 2 - 1;

          const rotateY = xRel * MAX_TILT;
          const rotateX = -yRel * MAX_TILT;

          card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;
        });
      });

      card.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.classList.remove('is-tilting');
        card.style.transform = '';
      });
    });
  }


  // ==========================================
  // 20. MAGNETIC BUTTONS
  // ==========================================
  if (supportsHover && isWideScreen) {
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    const PULL_STRENGTH = 0.25;

    magneticBtns.forEach(btn => {
      let rafId = null;

      btn.addEventListener('mouseenter', () => {
        btn.classList.add('is-pulling');
      });

      btn.addEventListener('mousemove', (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = btn.getBoundingClientRect();
          const mx = e.clientX - (rect.left + rect.width / 2);
          const my = e.clientY - (rect.top + rect.height / 2);

          btn.style.transform = `translate(${(mx * PULL_STRENGTH).toFixed(2)}px, ${(my * PULL_STRENGTH).toFixed(2)}px) scale(1.05)`;
        });
      });

      btn.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        btn.classList.remove('is-pulling');
        btn.style.transform = '';
      });
    });
  }


  // ==========================================
  // 22. SCROLL SPINE — VERTICAL CENTER PROGRESS LINE
  // ==========================================
  const scrollSpine = document.getElementById('scrollSpine');
  const scrollSpineFill = document.getElementById('scrollSpineFill');
  const scrollSpineBead = document.getElementById('scrollSpineBead');

  if (scrollSpine && scrollSpineFill && scrollSpineBead) {
    let spineRafId = null;

    function updateScrollSpine() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      const percent = progress * 100;

      // Fill grows downward
      scrollSpineFill.style.height = `${percent}%`;

      // Bead positioned at the leading edge of the fill
      scrollSpineBead.style.top = `${percent}%`;

      if (percent > 0.5) {
        scrollSpine.classList.add('is-active');
      } else {
        scrollSpine.classList.remove('is-active');
      }
    }

    window.addEventListener('scroll', () => {
      if (spineRafId) cancelAnimationFrame(spineRafId);
      spineRafId = requestAnimationFrame(updateScrollSpine);
    }, { passive: true });

    window.addEventListener('resize', updateScrollSpine, { passive: true });

    // Initial sync
    updateScrollSpine();
  }


  // ==========================================
  // 21. CARD PRESS-IN ENTRANCE
  // ==========================================
  const pressInCards = document.querySelectorAll('.card-press-in');
  if (pressInCards.length > 0) {
    const pressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          pressObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    pressInCards.forEach(card => pressObserver.observe(card));
  }


  // ==========================================
  // 23. MAXIMUM GOOGLE ANALYTICS TELEMETRY
  // ==========================================
  function trackGaEvent(eventName, category, label, value = null) {
    if (typeof gtag === 'function') {
      const payload = {
        'event_category': category,
        'event_label': label
      };
      if (value !== null) {
        payload['value'] = value;
      }
      gtag('event', eventName, payload);
    }
  }

  // Track social card clicks
  document.querySelectorAll('.contact-social-card').forEach(card => {
    card.addEventListener('click', function() {
      const handle = this.querySelector('.social-card-handle')?.textContent || 'unknown';
      const label = this.querySelector('.social-card-label')?.textContent || 'unknown';
      trackGaEvent('click_social', 'Social Media', `${label} (${handle})`);
    });
  });

  // Track "СОЗДАТЬ ТИКЕТ" Discord join button click
  const discordTicketBtn = document.querySelector('a[href*="discord.gg"]');
  if (discordTicketBtn) {
    discordTicketBtn.addEventListener('click', function() {
      trackGaEvent('click_join_ticket', 'Recruitment', 'Discord Create Ticket Clicked');
    });
  }

  // Track Redux Download clicks
  document.querySelectorAll('a[href*="drive.google.com"], a[href*="mega.nz"]').forEach(btn => {
    btn.addEventListener('click', function() {
      const url = this.getAttribute('href');
      const text = this.textContent.trim();
      trackGaEvent('download_redux', 'Redux Download', `${text} (${url})`);
    });
  });

  // Track Theme Toggle changes
  const themeToggleTelemetry = document.getElementById('themeToggle');
  if (themeToggleTelemetry) {
    themeToggleTelemetry.addEventListener('click', function() {
      const newTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      trackGaEvent('toggle_theme', 'Theme Customization', `Theme Switched to ${newTheme}`);
    });
  }

  // Track Navigation clicks
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function() {
      const target = this.getAttribute('href');
      trackGaEvent('navigation_click', 'Navigation', `Jumped to Section ${target}`);
    });
  });

  // Track mobile nav toggle
  if (burgerBtn) {
    burgerBtn.addEventListener('click', function() {
      const state = mobileNav.classList.contains('active') ? 'opened' : 'closed';
      trackGaEvent('mobile_nav_toggle', 'Navigation', `Mobile Menu ${state}`);
    });
  }

  // Track scroll milestones (25%, 50%, 75%, 100%)
  let trackedMilestones = { '25': false, '50': false, '75': false, '100': false };
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    Object.keys(trackedMilestones).forEach(milestone => {
      const limit = parseInt(milestone);
      if (scrollPercent >= limit && !trackedMilestones[milestone]) {
        trackedMilestones[milestone] = true;
        trackGaEvent('scroll_depth', 'User Engagement', `Scrolled to ${milestone}%`);
      }
    });
  }, { passive: true });

  // Animated Redux progress scales fill with staggered cascade reveal after text animation finishes
  const reduxSection = document.getElementById('redux');
  const scaleFills = document.querySelectorAll('.redux-scale-fill');
  
  if (reduxSection && scaleFills.length > 0) {
    const scaleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Wait 1500ms for the character/word text split animations to mostly finish
          setTimeout(() => {
            scaleFills.forEach((fill, index) => {
              const item = fill.closest('.redux-feature-item');
              if (item) {
                // Staggered reveal: each item fades and rises one after another
                setTimeout(() => {
                  item.style.opacity = '1';
                  item.style.transform = 'translateY(0)';
                  
                  // Fill the progress bar 250ms after the container shows up
                  setTimeout(() => {
                    const targetVal = fill.getAttribute('data-value');
                    fill.style.width = `${targetVal}%`;
                  }, 250);
                }, index * 250); // 250ms stagger step between items
              }
            });
          }, 1500);
          
          scaleObserver.disconnect(); // Trigger animation only once
        }
      });
    }, { threshold: 0.15 });
    
    scaleObserver.observe(reduxSection);
  }

  // ==========================================
  // 11. CLICK TO COPY DISCORD CONTACT (With glowing notification popup)
  // ==========================================
  document.querySelectorAll('.copy-discord').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const discordName = el.getAttribute('data-discord') || 'aferapokitaisky';
      const svgIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 13px; height: 13px; color: var(--accent-cyan); vertical-align: middle; margin-right: 8px; display: inline-block; filter: drop-shadow(0 0 3px var(--accent-cyan));"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      
      navigator.clipboard.writeText(discordName).then(() => {
        notify(`${svgIcon}Discord ${discordName} скопирован!`, 'success', 4000);
      }).catch(err => {
        console.error('Could not copy contact: ', err);
        notify(`Discord: ${discordName}`, 'info', 4000);
      });
    });
  });

});
