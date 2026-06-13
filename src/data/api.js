// API Base - uses Vite proxy in dev, Vercel rewrites in prod
const API_BASE = '/api';
const TUTEDUDE_BASE = 'https://www.tutedude.com';
const ASSETS_BASE = `${TUTEDUDE_BASE}/assets`;

// Asset URL helpers
export const assetUrl = {
  avif: (name) => `${ASSETS_BASE}/avif/${name}.avif`,
  svg: (name) => `${ASSETS_BASE}/svg/${name}.svg`,
  png: (name) => `${ASSETS_BASE}/png/${name}.png`,
  jpg: (name) => `${ASSETS_BASE}/jpg/${name}.jpg`,
  video: (name) => `${ASSETS_BASE}/video/${name}.mp4`,
  videoPoster: (name) => `${ASSETS_BASE}/video/posters/${name}.jpg`,
};

// Fetch all courses
export async function fetchCourses() {
  try {
    const res = await fetch(`${API_BASE}/courses`);
    const data = await res.json();
    if (data.success) return data.data.courses;
    throw new Error(data.message || 'Failed to fetch courses');
  } catch (err) {
    console.error('fetchCourses error:', err);
    return [];
  }
}

// Fetch single course by slug
export async function fetchCourse(slug) {
  try {
    const res = await fetch(`${API_BASE}/courses/${slug}`);
    const data = await res.json();
    if (data.success) return data.data.course;
    throw new Error(data.message || 'Course not found');
  } catch (err) {
    console.error('fetchCourse error:', err);
    return null;
  }
}

// Cache for courses
let coursesCache = null;
export async function getCourses() {
  if (coursesCache) return coursesCache;
  coursesCache = await fetchCourses();
  return coursesCache;
}

export function clearCache() {
  coursesCache = null;
}
