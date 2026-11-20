const STORAGE_KEY = 'shubhams-hogwarts-visitor-journey';

export function readVisitorJourney() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

export function updateVisitorJourney(patch) {
  const next = { ...readVisitorJourney(), ...patch };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // The site still works when browser storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent('hogwarts:journey-updated', { detail: next }));
  return next;
}

export function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}
