const CACHE = "carnivore-v20-20260907-repeating-food-plan";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=20",
  "./app.js?v=20",
  "./manifest.webmanifest",
  "./apple-touch-icon.png",
  "./apple-touch-icon-180x180.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then(cache => cache.put(e.request, copy)).catch(()=>{});
      return res;
    }).catch(() => cached))
  );
});
