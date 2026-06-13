export function createCurriculum(topics) {
  const container = document.createElement('div');
  container.className = 'curriculum-section';

  if (!topics || topics.length === 0) {
    container.innerHTML = '<p class="curriculum-empty">Curriculum details coming soon.</p>';
    return container;
  }

  const totalLectures = topics.reduce((sum, t) => sum + (t.lectures?.length || 0), 0);

  container.innerHTML = `
    <div class="section-header">
      <span class="section-tag">📚 Curriculum</span>
      <h2 class="section-title">Course Content</h2>
      <p class="section-subtitle">${topics.length} modules • ${totalLectures} lectures</p>
    </div>
    <div class="curriculum-controls">
      <button class="btn btn-outline btn-sm" id="expand-all">Expand All</button>
      <button class="btn btn-outline btn-sm" id="collapse-all">Collapse All</button>
    </div>
    <div class="curriculum-list" id="curriculum-list"></div>
  `;

  const list = container.querySelector('#curriculum-list');

  topics.forEach((topic, index) => {
    const module = document.createElement('div');
    module.className = 'curriculum-module';

    const lectureCount = topic.lectures?.length || 0;

    module.innerHTML = `
      <div class="curriculum-header" data-index="${index}">
        <div class="curriculum-header-left">
          <span class="curriculum-number">${String(index + 1).padStart(2, '0')}</span>
          <div>
            <h4 class="curriculum-module-title">${topic.section_name}</h4>
            <span class="curriculum-meta">${lectureCount} lecture${lectureCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
        <svg class="curriculum-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
      <div class="curriculum-content">
        <ul class="curriculum-lectures">
          ${(topic.lectures || []).map((lecture, li) => `
            <li class="curriculum-lecture">
              <span class="lecture-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </span>
              <span class="lecture-number">${li + 1}.</span>
              <span class="lecture-title">${lecture}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    // Toggle accordion
    const header = module.querySelector('.curriculum-header');
    const content = module.querySelector('.curriculum-content');

    header.addEventListener('click', () => {
      const isActive = header.classList.contains('active');
      header.classList.toggle('active');
      content.classList.toggle('active');

      if (!isActive) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0';
      }
    });

    // Auto-expand first module
    if (index === 0) {
      header.classList.add('active');
      content.classList.add('active');
      requestAnimationFrame(() => {
        content.style.maxHeight = content.scrollHeight + 'px';
      });
    }

    list.appendChild(module);
  });

  // Expand/Collapse all
  container.querySelector('#expand-all')?.addEventListener('click', () => {
    container.querySelectorAll('.curriculum-module').forEach(mod => {
      const h = mod.querySelector('.curriculum-header');
      const c = mod.querySelector('.curriculum-content');
      h.classList.add('active');
      c.classList.add('active');
      c.style.maxHeight = c.scrollHeight + 'px';
    });
  });

  container.querySelector('#collapse-all')?.addEventListener('click', () => {
    container.querySelectorAll('.curriculum-module').forEach(mod => {
      const h = mod.querySelector('.curriculum-header');
      const c = mod.querySelector('.curriculum-content');
      h.classList.remove('active');
      c.classList.remove('active');
      c.style.maxHeight = '0';
    });
  });

  return container;
}
