import { faqData } from '../data/courses.js';

export function createFAQ() {
  const section = document.createElement('section');
  section.className = 'faq-section';
  section.id = 'faq';

  const items = faqData || [];

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-tag">❓ FAQ</span>
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-subtitle">Everything you need to know about our courses</p>
      </div>
      <div class="faq-list" id="faq-list">
        ${items.map((item, i) => `
          <div class="faq-item" data-index="${i}">
            <button class="faq-question" aria-expanded="false">
              <span>${item.question}</span>
              <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div class="faq-answer">
              <p>${item.answer}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Accordion logic
  section.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isActive = btn.classList.contains('active');

      // Close all others
      section.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) {
          other.querySelector('.faq-question').classList.remove('active');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer').classList.remove('active');
          other.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });

      btn.classList.toggle('active', !isActive);
      btn.setAttribute('aria-expanded', !isActive);
      answer.classList.toggle('active', !isActive);

      if (!isActive) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0';
      }
    });
  });

  return section;
}
