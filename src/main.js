import { Router } from './router.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHome } from './pages/home.js';
import { renderCourses } from './pages/courses.js';
import { renderCourseDetail } from './pages/courseDetail.js';
import { renderCoursePlayer } from './pages/coursePlayer.js';

// Initialize app
const router = new Router();
const mainContent = document.getElementById('main-content');

// Show/hide loading overlay
function showLoading() {
  document.getElementById('loading-overlay')?.classList.add('active');
}

function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => { overlay.style.display = 'none'; }, 400);
  }
}

// Route definitions
router.add('/', async () => {
  showLoading();
  await renderHome(mainContent);
  hideLoading();
});

router.add('/courses', async () => {
  showLoading();
  await renderCourses(mainContent);
  hideLoading();
});

router.add('/course/:slug', async (params) => {
  showLoading();
  await renderCourseDetail(mainContent, params.slug);
  hideLoading();
});

router.add('/play/:slug', async (params) => {
  showLoading();
  await renderCoursePlayer(mainContent, params.slug);
  hideLoading();
});

// Before each route change
router.beforeEach = () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  router.start();
});
