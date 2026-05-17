// Service Worker — Hokkaido 2026 PWA
const CACHE_NAME = 'hokkaido-2026-v102';
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/vendor/sortable.min.js',
  './js/data.js',
  './js/state.js',
  './js/impact.js',
  './js/app.js',
  './manifest.json',
  // Itinerary images
  './images/itinerary/garaku.jpg',
  './images/itinerary/goryokaku.jpg',
  './images/itinerary/hachimanzaka.jpg',
  './images/itinerary/hakodate-mt.jpg',
  './images/itinerary/kitaichi.jpg',
  './images/itinerary/letao.jpg',
  './images/itinerary/lucky-pierrot.jpg',
  './images/itinerary/moiwa.jpg',
  './images/itinerary/noboribetsu.jpg',
  './images/itinerary/orugoru.jpg',
  './images/itinerary/otaru-canal.jpg',
  './images/itinerary/shiroi-koibito.jpg',
  './images/itinerary/toya-nonokaze.jpg',
  // Coupon images
  './images/coupons/札幌藥妝優惠折價券.jpg',
  './images/coupons/Bic camera折價券2026.png',
  './images/coupons/與7%券共用_Salonia優惠券.jpg',
  './images/coupons/2026鶴羽藥妝折價券.jpg',
  './images/coupons/松本清優惠券2026.jpg',
  // Souvenir images
  './images/souvenirs/calbee.jpg',
  './images/souvenirs/kitaichi-glass.jpg',
  './images/souvenirs/kitakaro-baum.jpg',
  './images/souvenirs/letao-biscuit.jpg',
  './images/souvenirs/letao-cake.jpg',
  './images/souvenirs/rokkatei-marusei.jpg',
  './images/souvenirs/rokkatei-sake.jpg',
  './images/souvenirs/royce.jpg',
  './images/souvenirs/shiroi-koibito.jpg',
  './images/souvenirs/snaffles.jpg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // External APIs — network first, no cache
  if (url.hostname === 'wttr.in' || url.hostname === 'router.project-osrm.org') {
    event.respondWith(
      fetch(event.request).catch(() => new Response('{}', { headers: { 'Content-Type': 'application/json' } }))
    );
    return;
  }

  // Everything else — cache first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok && event.request.method === 'GET') {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
        }
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
