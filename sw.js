const CACHE = 'jubilee-pos-v2';

// Ensure tesseract.min.js, worker.min.js, tesseract-core.wasm.js, and eng.traineddata.gz
// are saved in your app folder so OCR works with zero internet access.
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './tesseract.min.js',
  './worker.min.js',
  './tesseract-core-simd.wasm.js',
  './eng.traineddata.gz'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((cache) => {
        // Use individual puts so one missing optional file doesn't crash the whole install
        return Promise.allSettled(
          ASSETS.map((url) =>
            fetch(url).then((res) => {
              if (res.ok) return cache.put(url, res);
            })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  // Navigation fallback for offline launch
  if (e.request.mode === 'navigate') {
    e.respondWith(
      caches.match('./index.html').then((cached) => cached || fetch(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
