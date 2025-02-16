const VERSION = 'v1.3.0';
const CACHE_NAME = `footypredict-${VERSION}`;
const PRECACHE_ASSETS = [];

// Install event: cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(PRECACHE_ASSETS);
            await self.skipWaiting();
        })(),
    );
});

// Activate event: clean up old caches and claim clients
self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            // Delete old caches
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                }),
            );

            // Claim clients
            await self.clients.claim();
        })(),
    );
});

// Fetch event: serve cached assets and handle network failures
self.addEventListener('fetch', (event) => {
    // Bypass navigation requests (e.g., visiting the main page)
    if (event.request.mode === 'navigate') {
        event.respondWith(fetch(event.request));
        return;
    }

    event.respondWith(
        (async () => {
            try {
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) {
                    return cachedResponse;
                }
                return await fetch(event.request);
            } catch (error) {
                console.error('Fetch failed:', event.request.url, error);
                // You might want to return a custom offline page here
                return new Response(
                    '<h1>Offline Mode</h1><p>It looks like you are offline.</p>',
                    {
                        headers: { 'Content-Type': 'text/html' },
                    },
                );
            }
        })(),
    );
});
