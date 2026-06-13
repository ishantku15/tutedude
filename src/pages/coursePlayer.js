import { fetchCourse } from '../data/api.js';
import { getCourseData } from '../data/courses.js';

export async function renderCoursePlayer(container, slug) {
  container.innerHTML = `
    <div class="course-loading" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-dark);">
      <div class="loader-spinner"></div>
    </div>
  `;

  // Fetch course metadata
  const [apiData, localData] = await Promise.all([
    fetchCourse(slug),
    Promise.resolve(getCourseData(slug))
  ]);

  if (!apiData && !localData) {
    container.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-dark); color: white;">
        <h2>Course Not Found</h2>
      </div>
    `;
    return;
  }

  const course = {
    title: apiData?.title || localData?.name || slug,
    slug: slug,
    ...(localData || {})
  };

  // Extract all lectures into a flat list for easier navigation
  const allLectures = [];
  if (course.topics) {
    course.topics.forEach((topic, tIndex) => {
      if (topic.lectures) {
        topic.lectures.forEach((lec, lIndex) => {
          allLectures.push({
            id: `${tIndex}-${lIndex}`,
            title: lec,
            module: topic.section_name,
            // Assuming the paid content is hosted on their domain. We use a placeholder video.
            // Replace this with dynamic fetch from `https://tutedude.modgalaxy.in/api/play/...` if needed
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' 
          });
        });
      }
    });
  }

  if (allLectures.length === 0) {
    allLectures.push({
      id: '0-0', title: 'Introduction', module: 'Getting Started', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    });
  }

  container.innerHTML = `
    <div class="player-layout">
      <!-- Top Navigation -->
      <header class="player-header">
        <a href="#/course/${slug}" class="back-link">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Course
        </a>
        <h1 class="player-course-title">${course.title}</h1>
      </header>

      <div class="player-main">
        <!-- Video Area -->
        <div class="player-video-section">
          <div class="video-wrapper">
            <iframe 
              id="main-video-player" 
              src="https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(course.title + ' ' + allLectures[0].title + ' tutorial')}" 
              width="100%" 
              height="100%" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              style="border: none; background: #000; border-radius: 8px;">
            </iframe>
          </div>
          <div class="player-controls">
            <h2 id="current-lecture-title" style="margin-top: 16px; font-size: 1.5rem;">${allLectures[0].title}</h2>
            <p id="current-module-title" style="color: var(--text-muted);">${allLectures[0].module}</p>
          </div>
        </div>

        <!-- Sidebar / Curriculum -->
        <div class="player-sidebar">
          <div class="sidebar-header">
            <h3>Course Content</h3>
          </div>
          <div class="sidebar-curriculum">
            ${course.topics ? course.topics.map((topic, tIndex) => `
              <div class="sidebar-module">
                <div class="sidebar-module-header">
                  <h4>${topic.section_name}</h4>
                  <span>${topic.lectures ? topic.lectures.length : 0} lectures</span>
                </div>
                <div class="sidebar-module-lectures">
                  ${topic.lectures ? topic.lectures.map((lec, lIndex) => `
                    <button class="sidebar-lecture-btn ${tIndex === 0 && lIndex === 0 ? 'active' : ''}" 
                            data-id="${tIndex}-${lIndex}" 
                            data-query="${encodeURIComponent(course.title + ' ' + lec + ' tutorial')}" 
                            data-title="${lec}" 
                            data-module="${topic.section_name}">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      <span>${lIndex + 1}. ${lec}</span>
                    </button>
                  `).join('') : ''}
                </div>
              </div>
            `).join('') : '<p style="padding: 20px;">No curriculum available</p>'}
          </div>
        </div>
      </div>
    </div>
  `;

  // Hide the main navbar and footer for this page to create a focused player view
  const navbar = document.getElementById('navbar');
  const footer = document.getElementById('footer-root');
  if (navbar) navbar.style.display = 'none';
  if (footer) footer.style.display = 'none';

  // Make sure to restore them when leaving
  const originalHashChange = window.onhashchange;
  window.addEventListener('hashchange', function restoreLayout() {
    if (!window.location.hash.includes('/play/')) {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      window.removeEventListener('hashchange', restoreLayout);
    }
  });

  // Handle Video Switching
  const player = container.querySelector('#main-video-player');
  const titleEl = container.querySelector('#current-lecture-title');
  const moduleEl = container.querySelector('#current-module-title');
  const lectureBtns = container.querySelectorAll('.sidebar-lecture-btn');

  lectureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class
      lectureBtns.forEach(b => b.classList.remove('active'));
      // Add active class
      btn.classList.add('active');

      // Update player
      const query = btn.dataset.query;
      const title = btn.dataset.title;
      const mod = btn.dataset.module;

      player.src = `https://www.youtube.com/embed?listType=search&list=${query}`;

      titleEl.textContent = title;
      moduleEl.textContent = mod;
    });
  });

  window.scrollTo(0, 0);
}
