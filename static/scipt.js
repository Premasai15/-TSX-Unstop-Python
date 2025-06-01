document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling with easing
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetID = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
      // Close mobile menu if open
      if (document.body.classList.contains('nav-open')) {
        toggleMobileMenu();
      }
    });
  });

  // Sticky navbar on scroll with shadow
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section');
  const navItems = [...navLinks];
  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 80;
    sections.forEach((section, i) => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        navItems.forEach(link => link.classList.remove('active'));
        navItems[i].classList.add('active');
      }
    });
  });

  // Fade-in sections on scroll
  const faders = document.querySelectorAll('section');
  const appearOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    fader.classList.add('fade-section');
    appearOnScroll.observe(fader);
  });

  // Back to top button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'backToTopBtn';
  backToTopBtn.title = 'Back to top';
  backToTopBtn.innerHTML = '⬆';
  document.body.appendChild(backToTopBtn);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Mobile menu toggle
  const hamburger = document.createElement('div');
  hamburger.id = 'hamburger';
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  navbar.parentElement.insertBefore(hamburger, navbar);

  hamburger.addEventListener('click', toggleMobileMenu);

  function toggleMobileMenu() {
    document.body.classList.toggle('nav-open');
  }
});
