// Minimal service worker for PWA installability
// This doesn't cache anything - the app requires internet connection

const CACHE_NAME = 'the-hear-v1';

// Install event - just skip waiting
self.addEventListener('install', (event) => {
  console.log('Service Worker: Install');
  self.skipWaiting();
});

// Activate event - clean up old caches if any
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - just pass through to network (no caching)
self.addEventListener('fetch', (event) => {
  // Always fetch from network - no offline functionality
  event.respondWith(fetch(event.request));
}); 