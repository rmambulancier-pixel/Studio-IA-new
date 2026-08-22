const C = 'studio-ia-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open(C).then(async c => {
      const cached = await c.match(e.request);
      const fresh = fetch(e.request).then(r => {
        if (r.ok) c.put(e.request, r.clone());
        return r;
      }).catch(() => cached);
      return cached || fresh;
    })
  );
});