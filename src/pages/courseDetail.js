import { fetchCourse, assetUrl } from '../data/api.js';
import { getCourseData } from '../data/courses.js';
import { createVideoPlayer } from '../components/videoPlayer.js';
import { createCurriculum } from '../components/curriculum.js';

export async function renderCourseDetail(container, slug) {
  container.innerHTML = `
    <div class="course-loading">
      <div class="loader-spinner"></div>
      <p>Loading course...</p>
    </div>
  `;

  // Fetch from API + get hardcoded data
  const [apiData, localData] = await Promise.all([
    fetchCourse(slug),
    Promise.resolve(getCourseData(slug))
  ]);

  if (!apiData && !localData) {
    container.innerHTML = `
      <div class="course-not-found">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <h2>Course Not Found</h2>
        <p>The course you're looking for doesn't exist.</p>
        <a href="#/courses" class="btn btn-primary">Browse All Courses</a>
      </div>
    `;
    return;
  }

  const course = {
    title: apiData?.title || localData?.name || slug,
    slug: slug,
    price: apiData?.price || '699.00',
    ...(localData || {})
  };

  const rating = course.details?.ratings || course.introStats?.ratings || '4.8';
  const duration = course.introStats?.duration || course.details?.duration || '20+ Hrs';
  const lectures = course.details?.lectures || course.topics?.reduce((s, t) => s + (t.lectures?.length || 0), 0) || '50+';
  const enrolled = course.details?.enrolled || course.introStats?.learners || '10,000+';

  container.innerHTML = '';

  // Course Hero
  const hero = document.createElement('section');
  hero.className = 'course-hero';
  hero.innerHTML = `
    <div class="container">
      <div class="course-hero-grid">
        <div class="course-info">
          <nav class="breadcrumb">
            <a href="#/">Home</a>
            <span>›</span>
            <a href="#/courses">Courses</a>
            <span>›</span>
            <span class="breadcrumb-current">${course.title}</span>
          </nav>
          <h1 class="course-detail-title">${course.title || course.infoName || slug}</h1>
          <p class="course-detail-desc">${course.description || course.paymentInfo || `Master ${course.title} with hands-on projects, expert mentorship, and lifetime access.`}</p>
          
          <div class="course-detail-stats">
            <div class="course-stat-item">
              <span class="star filled">★</span>
              <strong>${rating}</strong>
              <span class="text-muted">Rating</span>
            </div>
            <div class="course-stat-divider"></div>
            <div class="course-stat-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <strong>${duration}</strong>
              <span class="text-muted">Duration</span>
            </div>
            <div class="course-stat-divider"></div>
            <div class="course-stat-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              <strong>${lectures}</strong>
              <span class="text-muted">Lectures</span>
            </div>
            <div class="course-stat-divider"></div>
            <div class="course-stat-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              <strong>${enrolled}</strong>
              <span class="text-muted">Enrolled</span>
            </div>
          </div>

          <div class="course-detail-price-block">
            <div class="course-detail-price">
              <span class="price-current-lg">₹${course.price}</span>
              <span class="price-original-lg">₹1,999</span>
              <span class="price-badge-lg">65% OFF</span>
            </div>
            <p class="refund-note">🛡️ 100% Refund on course completion</p>
          </div>

          <div class="course-detail-actions">
            <button class="btn btn-primary btn-lg enroll-btn" onclick="window.open('https://www.asmultiverse.com/course/${slug}', '_blank')">
              Enroll Now — ₹${course.price}
            </button>
            <a href="https://wa.me/918570818694?text=Hi! I'm interested in the ${encodeURIComponent(course.title)} course" target="_blank" rel="noreferrer" class="btn btn-outline btn-lg">
              Talk to Mentor
            </a>
          </div>
        </div>
        
        <div class="course-video-col" id="course-video-col"></div>
      </div>
    </div>
  `;
  container.appendChild(hero);

  // Insert video player
  const videoCol = hero.querySelector('#course-video-col');
  if (course.video) {
    videoCol.appendChild(createVideoPlayer(course.video));
  } else {
    videoCol.innerHTML = `
      <div class="video-container">
        <div class="video-placeholder">
          <img src="${assetUrl.avif(course.icon || slug)}" alt="${course.title}" style="max-width:200px; opacity:0.7;" onerror="this.style.display='none'">
          <p style="margin-top:16px; color: var(--text-muted);">Preview video coming soon</p>
        </div>
      </div>
    `;
  }

  // Course Features
  const featuresSection = document.createElement('section');
  featuresSection.className = 'course-features-section';
  featuresSection.innerHTML = `
    <div class="container">
      <div class="course-features-grid">
        <div class="course-feature-item">
          <div class="course-feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </div>
          <div>
            <h4>Personal Mentorship</h4>
            <p>1-on-1 doubt solving with expert mentors</p>
          </div>
        </div>
        <div class="course-feature-item">
          <div class="course-feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div>
            <h4>100% Refund Policy</h4>
            <p>Complete the course and get full refund</p>
          </div>
        </div>
        <div class="course-feature-item">
          <div class="course-feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <div>
            <h4>Certificate of Completion</h4>
            <p>Industry-recognized certificate on completion</p>
          </div>
        </div>
        <div class="course-feature-item">
          <div class="course-feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <div>
            <h4>Lifetime Access</h4>
            <p>Learn at your own pace, access forever</p>
          </div>
        </div>
        <div class="course-feature-item">
          <div class="course-feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div>
            <h4>Hands-on Projects</h4>
            <p>Build real-world portfolio projects</p>
          </div>
        </div>
        <div class="course-feature-item">
          <div class="course-feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
          </div>
          <div>
            <h4>Resume Building</h4>
            <p>Professional resume assistance included</p>
          </div>
        </div>
      </div>
    </div>
  `;
  container.appendChild(featuresSection);

  // Curriculum
  if (course.topics && course.topics.length > 0) {
    const currSection = document.createElement('section');
    currSection.className = 'course-curriculum-wrap';
    currSection.innerHTML = '<div class="container" id="curriculum-container"></div>';
    container.appendChild(currSection);

    const currContainer = currSection.querySelector('#curriculum-container');
    currContainer.appendChild(createCurriculum(course.topics));
  }

  // Reviews
  if (course.reviews && course.reviews.length > 0) {
    const reviewsSection = document.createElement('section');
    reviewsSection.className = 'course-reviews-section';
    reviewsSection.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">⭐ Reviews</span>
          <h2 class="section-title">What Students Say</h2>
        </div>
        <div class="reviews-grid">
          ${course.reviews.map(r => `
            <div class="review-card">
              <div class="review-stars">${'★'.repeat(5)}</div>
              <p class="review-text">"${r.review}"</p>
              <div class="review-author">
                ${r.img ? `<img src="${r.img}" alt="${r.name}" class="review-img" loading="lazy" onerror="this.style.display='none'">` : ''}
                <strong class="review-name">${r.name}</strong>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    container.appendChild(reviewsSection);
  }

  // Sticky CTA (mobile)
  const stickyCta = document.createElement('div');
  stickyCta.className = 'sticky-cta';
  stickyCta.innerHTML = `
    <div class="sticky-cta-inner">
      <div class="sticky-cta-price">
        <span class="price-current-lg">₹${course.price}</span>
        <span class="price-original-lg" style="font-size:14px;">₹1,999</span>
      </div>
      <button class="btn btn-primary enroll-btn-sticky" onclick="window.open('https://www.asmultiverse.com/course/${slug}', '_blank')">
        Enroll Now
      </button>
    </div>
  `;
  container.appendChild(stickyCta);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });
}
