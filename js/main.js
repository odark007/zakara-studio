/* =============================================
   ZAKARI STUDIO — main.js
   ============================================= */

/* ---- NAVBAR: scroll behaviour ---- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- NAVBAR: mobile toggle ---- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is tapped on mobile
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ---- SMOOTH SCROLL: offset for fixed navbar ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---- EXHIBITIONS: duplicate slides for infinite loop ---- */
const track = document.getElementById('slideshowTrack');

if (track) {
  // Clone all children and append so the CSS animation loops seamlessly
  const originals = Array.from(track.children);
  originals.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });
}

/* ---- COMMISSION FORM: basic validation + feedback ---- */
const submitBtn = document.getElementById('submitBtn');
const formNote  = document.getElementById('formNote');

if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formNote.textContent = 'Please fill in your name, email, and message before sending.';
      formNote.style.color = '#CE1126';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formNote.textContent = 'Please enter a valid email address.';
      formNote.style.color = '#CE1126';
      return;
    }

    // Simulated success — replace with real backend/formspree endpoint
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
      formNote.textContent = 'Your enquiry has been sent. Zakari will be in touch shortly.';
      formNote.style.color = '#006B3F';
      submitBtn.textContent = 'Send Enquiry';
      submitBtn.disabled = false;

      document.getElementById('name').value    = '';
      document.getElementById('email').value   = '';
      document.getElementById('subject').value = '';
      document.getElementById('message').value = '';
    }, 1200);
  });
}

/* ---- SCROLL REVEAL: fade-in sections on scroll ---- */
const revealTargets = document.querySelectorAll(
  '.about-container, .process-card, .commission-container'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => {
  el.classList.add('hidden-initially');
  revealObserver.observe(el);
});

/* ---- Inject reveal CSS dynamically ---- */
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .hidden-initially {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .hidden-initially.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(revealStyle);