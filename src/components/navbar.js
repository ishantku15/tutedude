import { assetUrl } from '../data/api.js';

export function renderNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  navbar.className = 'navbar';
  navbar.innerHTML = `
    <div class="navbar-inner">
      <a href="#/" class="navbar-logo" aria-label="Home">
        <img src="${assetUrl.avif('TutedudeLogo')}" alt="TuteDude Logo" width="160" height="40" loading="eager">
      </a>

      <div class="nav-links" id="nav-links">
        <a href="#/" class="nav-link" data-route="/">Home</a>
        <a href="#/courses" class="nav-link" data-route="/courses">Courses</a>
        <a href="#/courses" class="nav-link" data-route="/combos">Combo Packs</a>
        <a href="https://wa.me/918570818694" target="_blank" rel="noreferrer" class="nav-link">Support</a>
        <a href="#/courses" class="btn btn-primary nav-cta">Explore Courses</a>
      </div>

      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  `;

  // Hamburger toggle
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle?.addEventListener('click', () => {
    const isOpen = links.classList.toggle('active');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on link click
  links?.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('active');
      toggle?.classList.remove('active');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link highlighting
  highlightActiveLink();
  window.addEventListener('hashchange', highlightActiveLink);

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    navbar.classList.toggle('scrolled', currentScroll > 50);
    navbar.classList.toggle('hidden-nav', currentScroll > lastScroll && currentScroll > 200);
    lastScroll = currentScroll;
  }, { passive: true });
}

function highlightActiveLink() {
  const hash = window.location.hash || '#/';
  const route = hash.replace('#', '') || '/';
  document.querySelectorAll('.nav-link[data-route]').forEach(link => {
    const linkRoute = link.dataset.route;
    link.classList.toggle('active', route === linkRoute || (linkRoute !== '/' && route.startsWith(linkRoute)));
  });
}
