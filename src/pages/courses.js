import { getCourses } from '../data/api.js';
import { getCourseData, categories } from '../data/courses.js';
import { renderCourseGrid } from '../components/courseCard.js';

export async function renderCourses(container) {
  container.innerHTML = '';

  const page = document.createElement('div');
  page.className = 'courses-page';
  page.innerHTML = `
    <section class="courses-hero">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">📚 All Courses</span>
          <h1 class="section-title">Explore Our Course Catalog</h1>
          <p class="section-subtitle">65+ expert-curated courses with lifetime access and 100% refund guarantee</p>
        </div>
        <div class="search-bar-wrap">
          <div class="search-bar">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" id="course-search" class="search-input" placeholder="Search courses..." autocomplete="off">
          </div>
        </div>
        <div class="courses-filter" id="courses-filter">
          ${categories.map(cat => `
            <button class="filter-btn ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">
              ${cat.icon ? `<span>${cat.icon}</span>` : ''} ${cat.name}
            </button>
          `).join('')}
        </div>
      </div>
    </section>
    <section class="courses-list-section">
      <div class="container">
        <div class="courses-results-info">
          <span id="results-count">Loading...</span>
        </div>
        <div class="course-grid" id="all-courses-grid"></div>
        <div class="courses-empty" id="courses-empty" style="display:none;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <h3>No courses found</h3>
          <p>Try a different search term or category</p>
        </div>
      </div>
    </section>
  `;
  container.appendChild(page);

  // Load courses
  let allCourses = [];
  let activeCategory = 'all';
  let searchQuery = '';

  try {
    allCourses = await getCourses();
    renderFiltered();
  } catch (err) {
    console.error('Failed to load courses:', err);
    document.getElementById('results-count').textContent = 'Failed to load courses';
  }

  // Filter buttons
  document.getElementById('courses-filter')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    renderFiltered();
  });

  // Search
  let searchTimeout;
  document.getElementById('course-search')?.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderFiltered();
    }, 300);
  });

  function renderFiltered() {
    let filtered = [...allCourses];

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(c => {
        const data = getCourseData(c.slug);
        return data?.category === activeCategory;
      });
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchQuery) ||
        c.slug.toLowerCase().includes(searchQuery)
      );
    }

    const grid = document.getElementById('all-courses-grid');
    const empty = document.getElementById('courses-empty');
    const count = document.getElementById('results-count');

    if (filtered.length === 0) {
      grid.style.display = 'none';
      empty.style.display = 'flex';
      count.textContent = 'No courses found';
    } else {
      grid.style.display = '';
      empty.style.display = 'none';
      count.textContent = `Showing ${filtered.length} course${filtered.length !== 1 ? 's' : ''}`;
      renderCourseGrid(filtered, grid);
    }
  }
}
