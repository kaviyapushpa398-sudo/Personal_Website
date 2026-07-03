window.addEventListener('load', () => {
  const loader = document.getElementById('loadingScreen');
  if (loader) {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 400);
  }
  document.body.classList.remove('preload');
});

// Show the loading screen briefly and remove it after the page finishes loading.
window.addEventListener('load', () => {
  const loader = document.getElementById('loadingScreen');
  if (loader) {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 400);
  }
  document.body.classList.remove('preload');
});

// Reveal sections as they enter the viewport.
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 80) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Highlight the currently active navigation link.
const navLinks = document.querySelectorAll('.sidebar-link, .navbar .nav-link');
const currentPath = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === 'index.html' && href === 'index.html')) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

const sidebarToggle = document.getElementById('sidebarToggle');
if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-collapsed');
    const icon = sidebarToggle.querySelector('i');
    if (icon) {
      icon.className = document.body.classList.contains('sidebar-collapsed')
        ? 'bi bi-chevron-double-right'
        : 'bi bi-chevron-double-left';
    }
  });
}

// Add a smooth transition when moving between internal pages.
const transitionLinks = document.querySelectorAll('a[href]');
transitionLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = link.getAttribute('href');
    const isExternal = target?.startsWith('http') || target?.startsWith('mailto:') || target?.startsWith('#');

    if (!isExternal && target !== currentPath) {
      event.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = target;
      }, 220);
    }
  });
});

// Update the footer year automatically.
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Show or hide the scroll-to-top button.
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn?.classList.add('show');
  } else {
    scrollTopBtn?.classList.remove('show');
  }
});

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Validate the enquiry form before showing a success message.
const form = document.getElementById('enquiryForm');
const messageBox = document.getElementById('formMessage');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullName = document.getElementById('fullName')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10,15}$/;

    if (!fullName || !email || !phone || !subject || !message) {
      showMessage('Please fill in all fields.', 'danger');
      return;
    }

    if (!emailPattern.test(email)) {
      showMessage('Please enter a valid email address.', 'danger');
      return;
    }

    if (!phonePattern.test(phone)) {
      showMessage('Please enter a valid phone number with 10 to 15 digits.', 'danger');
      return;
    }

    showMessage('Thank you! Your enquiry has been submitted successfully.', 'success');
    form.reset();
  });
}

function showMessage(text, type) {
  if (messageBox) {
    messageBox.className = `alert alert-${type} mt-4`;
    messageBox.textContent = text;
    messageBox.classList.remove('d-none');
  }
}
