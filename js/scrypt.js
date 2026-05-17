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
    body.textContent = message;
    
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

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
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

  if (cursorDot && cursorCircle) {
    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth spring lag for outer ring
    function updateCirclePosition() {
      const delay = 0.15; // spring rate
      circleX += (mouseX - circleX) * delay;
      circleY += (mouseY - circleY) * delay;

      cursorCircle.style.left = `${circleX}px`;
      cursorCircle.style.top = `${circleY}px`;

      requestAnimationFrame(updateCirclePosition);
    }
    requestAnimationFrame(updateCirclePosition);

    // Dynamic hover scaling on all active interactive targets
    const hoverablesSelector = 'a, button, input, textarea, .contact-social-card, .domination-full-card, .redux-item, .redux-btn, .gallery-item-card, .nav-brand';
    
    // Delegate listeners or attach directly
    document.querySelectorAll(hoverablesSelector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-active');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-active');
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
});
