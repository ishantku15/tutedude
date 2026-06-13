import { assetUrl } from '../data/api.js';
import { testimonials as testimonialData } from '../data/courses.js';

export function createTestimonials() {
  const section = document.createElement('section');
  section.className = 'testimonials-section';
  section.id = 'testimonials';

  const items = testimonialData || [];

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-tag">💬 Student Stories</span>
        <h2 class="section-title">What Our Learners Say</h2>
        <p class="section-subtitle">Join 90,000+ students who transformed their careers with As Multiverse</p>
      </div>
      <div class="testimonial-carousel">
        <div class="testimonial-track" id="testimonial-track">
          ${items.map((t, i) => `
            <div class="testimonial-card" data-index="${i}">
              <div class="testimonial-stars">${'★'.repeat(t.rating || 5)}</div>
              <p class="testimonial-text">"${t.review}"</p>
              <div class="testimonial-author">
                <img 
                  src="${t.image}" 
                  alt="${t.name}" 
                  class="testimonial-img" 
                  loading="lazy"
                  onerror="this.style.display='none'"
                >
                <div>
                  <p class="testimonial-name">${t.name}</p>
                  <p class="testimonial-course">${t.course || 'TuteDude Student'}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="testimonial-nav" id="testimonial-nav">
        <button class="testimonial-arrow testimonial-prev" id="testimonial-prev" aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="testimonial-dots" id="testimonial-dots"></div>
        <button class="testimonial-arrow testimonial-next" id="testimonial-next" aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  `;

  // Carousel logic
  requestAnimationFrame(() => initCarousel(section, items.length));

  return section;
}

function initCarousel(section, total) {
  const track = section.querySelector('#testimonial-track');
  const dotsContainer = section.querySelector('#testimonial-dots');
  const prevBtn = section.querySelector('#testimonial-prev');
  const nextBtn = section.querySelector('#testimonial-next');

  if (!track || total === 0) return;

  let current = 0;
  let cardsPerView = getCardsPerView();

  const totalPages = Math.ceil(total / cardsPerView);

  // Create dots
  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const pages = Math.ceil(total / getCardsPerView());
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button');
      dot.className = `testimonial-dot ${i === current ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Page ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, Math.ceil(total / cardsPerView) - 1);
    current = Math.max(0, Math.min(index, maxIndex));
    
    const cardWidth = track.querySelector('.testimonial-card')?.offsetWidth || 340;
    const gap = 24;
    const offset = current * cardsPerView * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
    
    renderDots();
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  // Auto-advance
  let autoInterval = setInterval(() => {
    const maxIndex = Math.ceil(total / getCardsPerView()) - 1;
    goTo(current >= maxIndex ? 0 : current + 1);
  }, 5000);

  track.addEventListener('mouseenter', () => clearInterval(autoInterval));
  track.addEventListener('mouseleave', () => {
    autoInterval = setInterval(() => {
      const maxIndex = Math.ceil(total / getCardsPerView()) - 1;
      goTo(current >= maxIndex ? 0 : current + 1);
    }, 5000);
  });

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  window.addEventListener('resize', () => { cardsPerView = getCardsPerView(); goTo(current); });

  renderDots();
}

function getCardsPerView() {
  if (window.innerWidth < 576) return 1;
  if (window.innerWidth < 992) return 2;
  return 3;
}
