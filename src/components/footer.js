import { assetUrl } from '../data/api.js';

export function renderFooter() {
  const footer = document.getElementById('footer-root');
  if (!footer) return;

  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="${assetUrl.avif('TutedudeLogo')}" alt="TuteDude" class="footer-logo" loading="lazy">
        <p class="footer-desc">
          TuteDude is a revolutionary e-learning platform where you can upskill yourself 
          with expert mentorship and hands-on courses. Enjoy lifetime access and a 100% refund guarantee.
        </p>
        <div class="footer-social">
          <a href="https://www.linkedin.com/company/tutedude/" target="_blank" rel="noreferrer" aria-label="LinkedIn" class="social-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
          </a>
          <a href="https://www.youtube.com/@TuteDude" target="_blank" rel="noreferrer" aria-label="YouTube" class="social-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
          </a>
          <a href="https://www.instagram.com/tutedude/" target="_blank" rel="noreferrer" aria-label="Instagram" class="social-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
          </a>
          <a href="https://www.facebook.com/tutedude/" target="_blank" rel="noreferrer" aria-label="Facebook" class="social-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04z"/></svg>
          </a>
        </div>
      </div>

      <div class="footer-col">
        <h4 class="footer-links-title">Design & Video</h4>
        <a href="#/course/uiux" class="footer-link">UI/UX Design</a>
        <a href="#/course/photoshop" class="footer-link">Adobe Photoshop</a>
        <a href="#/course/illustrator" class="footer-link">Adobe Illustrator</a>
        <a href="#/course/premierepro" class="footer-link">Premiere Pro</a>
        <a href="#/course/aftereffects" class="footer-link">After Effects</a>
        <a href="#/course/graphicdesign" class="footer-link">Graphic Design</a>
      </div>

      <div class="footer-col">
        <h4 class="footer-links-title">Development</h4>
        <a href="#/course/python" class="footer-link">Python</a>
        <a href="#/course/mernstack" class="footer-link">MERN Stack</a>
        <a href="#/course/reactjs" class="footer-link">React JS</a>
        <a href="#/course/java" class="footer-link">Java</a>
        <a href="#/course/flutter" class="footer-link">Flutter</a>
        <a href="#/course/devops" class="footer-link">DevOps</a>
      </div>

      <div class="footer-col">
        <h4 class="footer-links-title">Data & Business</h4>
        <a href="#/course/datascience" class="footer-link">Data Science</a>
        <a href="#/course/machinelearning" class="footer-link">Machine Learning</a>
        <a href="#/course/dataanalytics" class="footer-link">Data Analytics</a>
        <a href="#/course/powerbi" class="footer-link">Power BI</a>
        <a href="#/course/tableau" class="footer-link">Tableau</a>
        <a href="#/course/digitalmarketing" class="footer-link">Digital Marketing</a>

        <h4 class="footer-links-title" style="margin-top: 24px;">Contact Us</h4>
        <a href="mailto:support@tutedude.com" class="footer-link">support@tutedude.com</a>
        <a href="tel:+918570818694" class="footer-link">+91 8570818694</a>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} TuteDude Clone. Educational purposes only.</p>
      <div class="footer-bottom-links">
        <a href="#/terms" class="footer-link">Terms & Conditions</a>
        <a href="#/privacy" class="footer-link">Privacy Policy</a>
        <a href="#/refund" class="footer-link">Refund Policy</a>
      </div>
    </div>
  `;
}
