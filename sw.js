// Plakçı service worker
// ÖNEMLİ: her güncellemede CACHE_NAME'deki sürüm numarasını artır (v1 -> v2 ...)
const CACHE_NAME = 'plakci-v12';

const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './scene.webp',
  './maps.png',
  './disc.webp',
  './sheen.png',
  './arm.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  // eski sürüm önbelleklerini temizle
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // hava durumu ve dış istekler: her zaman ağdan, önbelleğe alma
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // sayfa: önce ağ (güncelleme hemen gelsin), çevrimdışıysa önbellek
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((r) => { const copy = r.clone(); caches.open(CACHE_NAME).then((c) => c.put('./index.html', copy)); return r; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  // görseller ve diğer dosyalar: önce önbellek
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
