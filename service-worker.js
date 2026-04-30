// TEFA GYM - Service Worker
// Network first strategy - always get fresh content

const CACHE_NAME = "tefa-gym-v4";

self.addEventListener("install", e => {
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  // Delete ALL old caches on activate
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if(e.request.method !== "GET") return;

  // Network first - always try network, fallback to cache
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Cache the fresh response
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return response;
      })
      .catch(() => {
        // Offline fallback - serve from cache
        return caches.match(e.request);
      })
  );
});
