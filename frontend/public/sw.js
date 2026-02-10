// Enhanced Service Worker with Advanced Caching Strategies
const CACHE_VERSION = '2.0.0';
const STATIC_CACHE = `portfolio-static-v${CACHE_VERSION}`;
const RUNTIME_CACHE = `portfolio-runtime-v${CACHE_VERSION}`;
const IMAGE_CACHE = `portfolio-images-v${CACHE_VERSION}`;
const PAGE_CACHE = `portfolio-pages-v${CACHE_VERSION}`;

// Cache expiration times (in milliseconds)
const MAX_AGE = {
  IMAGES: 30 * 24 * 60 * 60 * 1000,  // 30 days
  PAGES: 7 * 24 * 60 * 60 * 1000,    // 7 days
  API: 5 * 60 * 1000,                 // 5 minutes
};

// Static assets to precache
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-icon.png',
  '/offline.html', // Fallback offline page
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Precaching static assets');
        return cache.addAll(PRECACHE_URLS.map(url => new Request(url, { cache: 'reload' })));
      })
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.error('[SW] Precaching failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating new service worker...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE &&
                cacheName !== RUNTIME_CACHE &&
                cacheName !== IMAGE_CACHE &&
                cacheName !== PAGE_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Helper: Check if cache entry is expired
function isCacheExpired(response, maxAge) {
  if (!response) return true;

  const cachedTime = response.headers.get('sw-cached-time');
  if (!cachedTime) return true;

  const age = Date.now() - parseInt(cachedTime, 10);
  return age > maxAge;
}

// Helper: Add timestamp to response headers
function addTimestampToResponse(response) {
  const clonedResponse = response.clone();
  const headers = new Headers(clonedResponse.headers);
  headers.set('sw-cached-time', Date.now().toString());

  return clonedResponse.blob().then((body) => {
    return new Response(body, {
      status: clonedResponse.status,
      statusText: clonedResponse.statusText,
      headers: headers,
    });
  });
}

// Strategy 1: Cache First (for static assets)
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse && !isCacheExpired(cachedResponse, MAX_AGE.IMAGES)) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const responseToCache = await addTimestampToResponse(networkResponse);
      cache.put(request, responseToCache.clone());
      return networkResponse;
    }
    return networkResponse;
  } catch (error) {
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Strategy 2: Network First (for API calls)
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const responseToCache = await addTimestampToResponse(networkResponse);
      cache.put(request, responseToCache.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse && !isCacheExpired(cachedResponse, MAX_AGE.API)) {
      return cachedResponse;
    }
    return new Response(JSON.stringify({ error: 'Network unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Strategy 3: Stale While Revalidate (for pages)
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse && networkResponse.status === 200) {
      const responseToCache = await addTimestampToResponse(networkResponse);
      cache.put(request, responseToCache.clone());
    }
    return networkResponse;
  });

  return cachedResponse || fetchPromise;
}

// Fetch event - route to appropriate caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // API requests - Network First
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, RUNTIME_CACHE));
    return;
  }

  // Images - Cache First
  if (request.destination === 'image' || /\.(jpg|jpeg|png|gif|svg|webp|ico)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Fonts and static assets - Cache First
  if (request.destination === 'font' ||
      request.destination === 'style' ||
      request.destination === 'script' ||
      /\.(css|js|woff|woff2|ttf|eot)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // HTML pages - Stale While Revalidate
  if (request.destination === 'document' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      staleWhileRevalidate(request, PAGE_CACHE)
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // Default - Network First
  event.respondWith(networkFirst(request, RUNTIME_CACHE));
});

// Background Sync - for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'sync-messages') {
    event.waitUntil(syncOfflineMessages());
  }
});

async function syncOfflineMessages() {
  // Implement offline message queue sync here
  // This would sync any messages/forms submitted while offline
  console.log('[SW] Syncing offline messages...');
}

// Push Notification support (optional)
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  const options = {
    body: data.body || 'New notification',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: data.primaryKey || 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Portfolio Update', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Periodic cache cleanup (runs on activate and periodically)
async function cleanupOldCaches() {
  const caches_to_check = [IMAGE_CACHE, PAGE_CACHE, RUNTIME_CACHE];

  for (const cacheName of caches_to_check) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      const maxAge = cacheName === IMAGE_CACHE ? MAX_AGE.IMAGES : MAX_AGE.PAGES;

      if (isCacheExpired(response, maxAge)) {
        await cache.delete(request);
        console.log('[SW] Deleted expired cache:', request.url);
      }
    }
  }
}

// Message handler for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEANUP_CACHES') {
    event.waitUntil(cleanupOldCaches());
  }
});

console.log('[SW] Service Worker loaded successfully');
