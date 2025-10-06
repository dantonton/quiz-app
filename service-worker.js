const CACHE_NAME = 'institucional-cache-v1';
const ASSETS_TO_CACHE = [
  '/quiz-app/',
  '/quiz-app/index.html',
  '/quiz-app/manifest.json',
  '/quiz-app/assets/misturacapixaba/02.png',
  '/quiz-app/assets/misturacapixaba/03.png',
  '/quiz-app/assets/misturacapixaba/05.png',
  '/quiz-app/assets/misturacapixaba/04.png',
  '/quiz-app/assets/misturacapixaba/cards/Prancheta 1.png',
  '/quiz-app/assets/misturacapixaba/cards/Prancheta 2.png',
  '/quiz-app/assets/misturacapixaba/cards/Prancheta 3.png',
  '/quiz-app/assets/misturacapixaba/cards/Prancheta 4.png',
  '/quiz-app/assets/misturacapixaba/cards/Prancheta 5.png',
  '/quiz-app/assets/misturacapixaba/cards/Prancheta 6.png',
  '/quiz-app/assets/misturacapixaba/cards/Prancheta 7.png',
  '/quiz-app/assets/misturacapixaba/cards/Prancheta 8.png',
];

// Instala e salva no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Ativa e remove caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
});

// Intercepta requisições e responde do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
