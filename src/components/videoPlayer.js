export function createVideoPlayer(videoUrl, posterUrl) {
  const container = document.createElement('div');
  container.className = 'video-container';

  if (!videoUrl) {
    container.innerHTML = `
      <div class="video-placeholder">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
        <p>Video preview not available</p>
      </div>
    `;
    return container;
  }

  // YouTube embed
  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    const embedUrl = videoUrl.includes('embed') 
      ? videoUrl 
      : `https://www.youtube.com/embed/${extractYouTubeId(videoUrl)}`;
    
    // Lazy load: show poster first, load iframe on click
    container.innerHTML = `
      <div class="video-overlay" id="video-overlay">
        <div class="video-play-btn">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div class="video-overlay-text">Watch Preview</div>
      </div>
      <iframe 
        class="video-iframe" 
        data-src="${embedUrl}?autoplay=1&rel=0&modestbranding=1" 
        title="Course Preview Video"
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        loading="lazy"
        style="display:none;"
      ></iframe>
    `;

    const overlay = container.querySelector('.video-overlay');
    const iframe = container.querySelector('.video-iframe');

    overlay?.addEventListener('click', () => {
      iframe.src = iframe.dataset.src;
      iframe.style.display = 'block';
      overlay.style.display = 'none';
    });

    return container;
  }

  // Direct MP4 video
  container.innerHTML = `
    <video 
      class="video-player" 
      controls 
      preload="metadata"
      ${posterUrl ? `poster="${posterUrl}"` : ''}
      playsinline
    >
      <source src="${videoUrl}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `;

  return container;
}

function extractYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/);
  return match ? match[1] : '';
}

export function createVideoSection(videoUrl, title) {
  const section = document.createElement('div');
  section.className = 'video-section';
  
  if (title) {
    const heading = document.createElement('h3');
    heading.className = 'video-section-title';
    heading.textContent = title;
    section.appendChild(heading);
  }

  section.appendChild(createVideoPlayer(videoUrl));
  return section;
}
