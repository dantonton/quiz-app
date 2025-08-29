const CACHE_NAME = 'institucional-cache-v1';
const ASSETS_TO_CACHE = [
  '/quiz-app/',
  '/quiz-app/index.html',
  '/quiz-app/manifest.json',
  '/quiz-app/assets/sesisaude/1.png',
  '/quiz-app/assets/sesisaude/12.png',
  '/quiz-app/assets/sesisaude/13.png',
  '/quiz-app/assets/sesisaude/quiz.png',
  // adicione todas as imagens e sons que o jogo usa
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
