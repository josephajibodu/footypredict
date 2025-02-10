const VERSION = "v1.1.0";

const CACHE_NAME = `footypredict-${VERSION}`;

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
    '/',
]

// On install, cache the static resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(PRECACHE_ASSETS);
        })(),
    );
});

// delete old caches on activate
self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const names = await caches.keys();
            await Promise.all(
                names.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                }),
            );
            await clients.claim();
        })(),
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => {
                console.error('Fetch failed:', event.request.url);
            });
        })
    );
});