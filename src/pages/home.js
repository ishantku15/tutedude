import { getCourses, assetUrl } from '../data/api.js';
import { getCourseData, comboPacksData } from '../data/courses.js';
import { renderCourseGrid } from '../components/courseCard.js';
import { createTestimonials } from '../components/testimonials.js';
import { createFAQ } from '../components/faq.js';

export async function renderHome(container) {
  container.innerHTML = '';

  // Hero Section
  const hero = document.createElement('section');
  hero.className = 'hero-section';
  hero.innerHTML = `
    <div class="hero-bg-shapes">
      <div class="hero-shape hero-shape-1"></div>
      <div class="hero-shape hero-shape-2"></div>
      <div class="hero-shape hero-shape-3"></div>
    </div>
    <div class="container hero-content">
      <span class="hero-badge animate-fadeInUp">🎓 100% Refund Guarantee on Course Completion</span>
      <h1 class="hero-title animate-fadeInUp">
        Upskill Yourself with
        <span class="text-gradient"> Expert-Led </span>
        Online Courses
      </h1>
      <p class="hero-subtitle animate-fadeInUp">
        Master coding, data science, design, marketing & more with hands-on projects, 
        personal mentorship, and lifetime access. Join 90,000+ learners today.
      </p>
      <div class="hero-stats animate-fadeInUp">
        <div class="hero-stat">
          <span class="hero-stat-value">90,000+</span>
          <span class="hero-stat-label">Happy Learners</span>
        </div>
        <div class="hero-stat-divider"></div>
        <div class="hero-stat">
          <span class="hero-stat-value">65+</span>
          <span class="hero-stat-label">Expert Courses</span>
        </div>
        <div class="hero-stat-divider"></div>
        <div class="hero-stat">
          <span class="hero-stat-value">4.8★</span>
          <span class="hero-stat-label">Average Rating</span>
        </div>
        <div class="hero-stat-divider"></div>
        <div class="hero-stat">
          <span class="hero-stat-value">100%</span>
          <span class="hero-stat-label">Refund Policy</span>
        </div>
      </div>
      <div class="hero-cta animate-fadeInUp">
        <a href="#/courses" class="btn btn-primary btn-lg hero-cta-btn">
          Explore All Courses
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <a href="https://wa.me/918570818694" target="_blank" rel="noreferrer" class="btn btn-outline btn-lg">
          Talk to Mentor
        </a>
      </div>
    </div>
  `;
  container.appendChild(hero);

  // How It Works / Enrollment Steps
  const steps = document.createElement('section');
  steps.className = 'steps-section';
  steps.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-tag">🚀 How It Works</span>
        <h2 class="section-title">Learn for Free — Yes, Really!</h2>
        <p class="section-subtitle">Complete the course, get 100% of your money back</p>
      </div>
      <div class="steps-grid">
        <div class="step-card animate-fadeInUp">
          <div class="step-number">1</div>
          <div class="step-video-wrap">
            <video src="${assetUrl.video('LearnFreeIcons_EnrollVideo')}" poster="${assetUrl.videoPoster('LearnFreeIcons_EnrollVideo')}" muted loop playsinline preload="metadata" class="step-video"></video>
          </div>
          <h3 class="step-title">Enroll in a Course</h3>
          <p class="step-desc">Choose from 65+ expert-curated courses and enroll with our affordable pricing.</p>
        </div>
        <div class="step-connector">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
        <div class="step-card animate-fadeInUp" style="animation-delay: 0.15s">
          <div class="step-number">2</div>
          <div class="step-video-wrap">
            <video src="${assetUrl.video('LearnFreeIcons_CompleteCoursesVideo')}" poster="${assetUrl.videoPoster('LearnFreeIcons_CompleteCoursesVideo')}" muted loop playsinline preload="metadata" class="step-video"></video>
          </div>
          <h3 class="step-title">Complete & Submit</h3>
          <p class="step-desc">Learn at your own pace, complete assignments, and submit your projects.</p>
        </div>
        <div class="step-connector">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
        <div class="step-card animate-fadeInUp" style="animation-delay: 0.3s">
          <div class="step-number">3</div>
          <div class="step-video-wrap">
            <video src="${assetUrl.video('LearnFreeIcons_RefundVideo')}" poster="${assetUrl.videoPoster('LearnFreeIcons_RefundVideo')}" muted loop playsinline preload="metadata" class="step-video"></video>
          </div>
          <h3 class="step-title">Get 100% Refund</h3>
          <p class="step-desc">Once verified, receive a complete refund. You literally learn for free!</p>
        </div>
      </div>
    </div>
  `;
  container.appendChild(steps);

  // Hover play for step videos
  steps.querySelectorAll('.step-card').forEach(card => {
    const video = card.querySelector('.step-video');
    if (video) {
      card.addEventListener('mouseenter', () => video.play().catch(() => {}));
      card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
    }
  });

  // Course Grid Section
  const coursesSection = document.createElement('section');
  coursesSection.className = 'courses-section';
  coursesSection.id = 'courses';
  coursesSection.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-tag">📚 Popular Courses</span>
        <h2 class="section-title">Explore Our Top Courses</h2>
        <p class="section-subtitle">Start your journey with industry-relevant skills</p>
      </div>
      <div class="course-grid" id="home-course-grid"></div>
      <div class="text-center" style="margin-top: 40px;">
        <a href="#/courses" class="btn btn-primary btn-lg">
          View All Courses
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </div>
  `;
  container.appendChild(coursesSection);

  // Load courses from API
  try {
    const courses = await getCourses();
    const grid = document.getElementById('home-course-grid');
    // Show top 9 courses (ones with hardcoded data first)
    const featured = ['python', 'mernstack', 'machinelearning', 'uiux', 'datascience', 'reactjs', 'java', 'ethicalhacking', 'digitalmarketing'];
    const sorted = [
      ...courses.filter(c => featured.includes(c.slug)),
      ...courses.filter(c => !featured.includes(c.slug))
    ];
    renderCourseGrid(sorted, grid, 9);
  } catch (err) {
    console.error('Failed to load courses:', err);
  }

  // Features Section
  const features = document.createElement('section');
  features.className = 'features-section';
  features.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-tag">✨ Why As Multiverse</span>
        <h2 class="section-title">Why 90,000+ Learners Choose Us</h2>
      </div>
      <div class="features-grid">
        <div class="feature-card animate-fadeInUp">
          <div class="feature-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <h3 class="feature-title">Expert-Led Courses</h3>
          <p class="feature-desc">Learn from IIT alumni and industry professionals with real-world experience.</p>
        </div>
        <div class="feature-card animate-fadeInUp" style="animation-delay:0.1s">
          <div class="feature-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3 class="feature-title">100% Refund Guarantee</h3>
          <p class="feature-desc">Complete the course and get your entire fee back. Learn completely free!</p>
        </div>
        <div class="feature-card animate-fadeInUp" style="animation-delay:0.2s">
          <div class="feature-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3 class="feature-title">Lifetime Access</h3>
          <p class="feature-desc">No time limits. Access all course content forever, learn at your own pace.</p>
        </div>
        <div class="feature-card animate-fadeInUp" style="animation-delay:0.3s">
          <div class="feature-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h3 class="feature-title">1:1 Doubt Solving</h3>
          <p class="feature-desc">Get instant help from personal mentors whenever you're stuck.</p>
        </div>
        <div class="feature-card animate-fadeInUp" style="animation-delay:0.4s">
          <div class="feature-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <h3 class="feature-title">Hands-on Projects</h3>
          <p class="feature-desc">Build real portfolio projects with guided assignments and code reviews.</p>
        </div>
        <div class="feature-card animate-fadeInUp" style="animation-delay:0.5s">
          <div class="feature-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <h3 class="feature-title">Certificate & Resume</h3>
          <p class="feature-desc">Earn industry-recognized certificates and get professional resume building support.</p>
        </div>
      </div>
    </div>
  `;
  container.appendChild(features);

  // Companies Marquee
  const companies = document.createElement('section');
  companies.className = 'companies-section';
  companies.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 class="section-title" style="font-size:1.5rem;">Our Learners Work At</h2>
      </div>
      <div class="marquee-container">
        <div class="marquee-track">
          ${['accenture','amazon','flipkart','google','ibm','intuit','microsoft','myntra','ola','virtusa'].map(c => `
            <div class="marquee-item">
              <img src="${assetUrl.avif(`TrackHiringCompaniesIcons_${c}`)}" alt="${c}" loading="lazy" onerror="this.parentElement.style.display='none'">
            </div>
          `).join('')}
          ${['accenture','amazon','flipkart','google','ibm','intuit','microsoft','myntra','ola','virtusa'].map(c => `
            <div class="marquee-item">
              <img src="${assetUrl.avif(`TrackHiringCompaniesIcons_${c}`)}" alt="${c}" loading="lazy" onerror="this.parentElement.style.display='none'">
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  container.appendChild(companies);

  // Testimonials
  container.appendChild(createTestimonials());

  // Stats Bar
  const statsBar = document.createElement('section');
  statsBar.className = 'stats-bar-section';
  statsBar.innerHTML = `
    <div class="container">
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-value" data-count="90000">0</span>
          <span class="stat-label">Students Enrolled</span>
        </div>
        <div class="stat-item">
          <span class="stat-value" data-count="65">0</span>
          <span class="stat-label">Courses Available</span>
        </div>
        <div class="stat-item">
          <span class="stat-value" data-count="500">0</span>
          <span class="stat-label">Hours of Content</span>
        </div>
        <div class="stat-item">
          <span class="stat-value" data-count="4">0</span>
          <span class="stat-label">Avg Rating (4.8★)</span>
        </div>
      </div>
    </div>
  `;
  container.appendChild(statsBar);

  // Animate stat counters on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(el => {
          animateCounter(el, parseInt(el.dataset.count));
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(statsBar);

  // FAQ
  container.appendChild(createFAQ());

  // Back to top button
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>';
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  container.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
}

function animateCounter(el, target) {
  const duration = 2000;
  const start = performance.now();
  const format = target >= 1000 ? (n) => n.toLocaleString() + '+' : (n) => n.toFixed(target < 10 ? 1 : 0) + (target < 10 ? '★' : '+');

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = format(Math.round(current));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
