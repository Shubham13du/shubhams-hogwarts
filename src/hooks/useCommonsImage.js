import { useEffect, useState } from 'react';

// Free Wikimedia Commons API. No key needed. `origin=*` allows browser requests.
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';

// Remember results so retaking the quiz does not fetch the same image again.
const cache = new Map();

function stripHtml(html = '') {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent || '').trim();
}

async function fetchCommonsImage(fileTitle, signal) {
  const params = new URLSearchParams({
    action: 'query',
    titles: fileTitle,
    prop: 'imageinfo',
    iiprop: 'url|extmetadata',
    iiurlwidth: '520',
    format: 'json',
    formatversion: '2',
    origin: '*',
  });

  const response = await fetch(`${COMMONS_API}?${params}`, { signal });
  if (!response.ok) throw new Error(`Commons request failed (${response.status})`);

  const data = await response.json();
  const page = data?.query?.pages?.[0];
  const info = page?.imageinfo?.[0];
  if (!page || page.missing || !info?.thumburl) throw new Error('Commons file not found');

  const meta = info.extmetadata || {};
  return {
    src: info.thumburl,
    pageUrl: info.descriptionurl,
    author: stripHtml(meta.Artist?.value) || 'Unknown author',
    license: meta.LicenseShortName?.value || 'See file page',
    licenseUrl: meta.LicenseUrl?.value || null,
  };
}

/**
 * Looks up an image on Wikimedia Commons by file title (e.g. 'File:Example.jpg').
 * Returns { status: 'idle' | 'loading' | 'ready' | 'error', image }.
 * 'idle' means no file title was given.
 */
export default function useCommonsImage(fileTitle) {
  const [state, setState] = useState({ title: null, status: 'idle', image: null });
  const cached = fileTitle ? cache.get(fileTitle) : null;

  useEffect(() => {
    if (!fileTitle || cache.has(fileTitle)) return undefined;

    const controller = new AbortController();
    fetchCommonsImage(fileTitle, controller.signal)
      .then((image) => {
        cache.set(fileTitle, image);
        setState({ title: fileTitle, status: 'ready', image });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ title: fileTitle, status: 'error', image: null });
        }
      });

    return () => controller.abort();
  }, [fileTitle]);

  if (!fileTitle) return { status: 'idle', image: null };
  if (cached) return { status: 'ready', image: cached };
  if (state.title === fileTitle) return { status: state.status, image: state.image };
  return { status: 'loading', image: null };
}