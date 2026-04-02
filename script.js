/* =========================================
   JAKE — Snowboarder Portfolio
   Scroll animations, parallax, interactions
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- Snow Particles ---
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    for (let i = 0; i < 60; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = (Math.random() * 3 + 1) + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particleContainer.appendChild(particle);
    }
  }

  // --- Hero Entrance Animation ---
  const heroElements = document.querySelectorAll('#hero [data-scroll-reveal], #hero .title-line, #hero .hero-subtitle');
  setTimeout(() => {
    heroElements.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = 'opacity 1s ease, transform 1s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 200);
    });
  }, 300);

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  });

  // --- Hero Parallax ---
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.4;
      heroBg.style.transform = `scale(1.1) translateY(${offset}px)`;
    }
  });

  // --- Scroll Reveal Observer ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        // Animate skill bars
        const skillBars = entry.target.querySelectorAll('.skill-fill');
        skillBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 400);
        });

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('[data-scroll-reveal], .skill-card, .timeline-item').forEach(el => {
    revealObserver.observe(el);
  });

  // --- Showcase Drag Scroll ---
  const showcaseTrack = document.getElementById('showcaseTrack');
  if (showcaseTrack) {
    let isDown = false;
    let startX;
    let scrollLeft;

    showcaseTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      showcaseTrack.style.cursor = 'grabbing';
      startX = e.pageX - showcaseTrack.offsetLeft;
      scrollLeft = showcaseTrack.scrollLeft;
    });

    showcaseTrack.addEventListener('mouseleave', () => {
      isDown = false;
      showcaseTrack.style.cursor = 'grab';
    });

    showcaseTrack.addEventListener('mouseup', () => {
      isDown = false;
      showcaseTrack.style.cursor = 'grab';
    });

    showcaseTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - showcaseTrack.offsetLeft;
      const walk = (x - startX) * 2;
      showcaseTrack.scrollLeft = scrollLeft - walk;
    });
  }

  // --- Smooth scroll for nav links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Tilt effect on skill cards ---
  document.querySelectorAll('.skill-card-inner').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -5;
      const rotateY = (x - centerX) / centerX * 5;

      card.style.transform = `translateY(-5px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // --- Counter animation for GoFundMe ---
  const gfmRaised = document.querySelector('.gfm-raised');
  if (gfmRaised) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(gfmRaised, 0, 4250, 2000);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(gfmRaised);
  }

  function animateCounter(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * eased);

      element.textContent = '$' + current.toLocaleString() + ' raised';

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // --- Progress bar animation ---
  const progressFill = document.querySelector('.gfm-progress-fill');
  if (progressFill) {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressFill.style.width = '28%';
          progressObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    progressObserver.observe(progressFill);
  }

});
