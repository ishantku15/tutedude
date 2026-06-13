import { assetUrl } from '../data/api.js';
import { getCourseData } from '../data/courses.js';

export function createCourseCard(course) {
  const data = getCourseData(course.slug);
  const card = document.createElement('div');
  card.className = 'course-card animate-fadeInUp';
  card.setAttribute('data-slug', course.slug);

  const rating = data?.details?.ratings || 4.8;
  const learners = data?.introStats?.learners || '10,000+';
  const duration = data?.introStats?.duration || data?.details?.duration || '20+ Hrs';
  const category = data?.category || 'development';
  const iconSlug = data?.icon || course.slug;

  const stars = renderStars(rating);

  card.innerHTML = `
    <div class="course-card-img">
      <img 
        src="${assetUrl.avif(iconSlug)}" 
        alt="${course.title}" 
        loading="lazy"
        onerror="this.src='${assetUrl.avif('TutedudeLogo')}'; this.style.objectFit='contain'; this.style.padding='24px';"
      >
      <span class="course-card-badge">${category}</span>
    </div>
    <div class="course-card-body">
      <h3 class="course-card-title">${course.title}</h3>
      <div class="course-card-meta">
        <span class="course-card-rating">${stars} <strong>${rating}</strong></span>
        <span class="course-card-separator">•</span>
        <span>${duration}</span>
      </div>
      <div class="course-card-footer">
        <div class="course-card-price">
          <span class="price-current">₹${course.price || '699'}</span>
          <span class="price-original">₹1,999</span>
          <span class="price-badge">65% OFF</span>
        </div>
        <div class="course-card-learners">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>${learners}</span>
        </div>
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    window.location.hash = `#/course/${course.slug}`;
  });

  return card;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let html = '';
  for (let i = 0; i < full; i++) html += '<span class="star filled">★</span>';
  if (half) html += '<span class="star half">★</span>';
  for (let i = 0; i < empty; i++) html += '<span class="star empty">☆</span>';
  return html;
}

export function renderCourseGrid(courses, container, limit) {
  if (!container) return;
  container.innerHTML = '';
  const items = limit ? courses.slice(0, limit) : courses;
  items.forEach((course, i) => {
    const card = createCourseCard(course);
    card.style.animationDelay = `${i * 0.05}s`;
    container.appendChild(card);
  });
}
