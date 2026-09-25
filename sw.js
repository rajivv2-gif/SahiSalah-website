// Sahi Salah Service Worker - PWA Resource Caching and Offline Support
const CACHE_NAME = 'sahisalah-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './common.js',
    './components.js',
    './colleges-data.js',
    './registry-data.js',
    './career-counseling.html',
    './free-career-counseling.html',
    './career-guidance.html',
    './mba-admission.html',
    './pgdm-admission.html',
    './online-mba.html',
    './working-professionals.html',
    './student-support.html',
    './admissions-open.html',
    './assessments.html',
    './reviews.html',
    './blog.html',
    './contact.html',
    './apply.html',
    './mascot.png'
];

// Install event: cache core assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching offline shell assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event: clean up outdated cache storage
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting obsolete cache', key);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event: Network-first falling back to cache
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // If response is valid, update it in cache
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Fallback to cache if network request fails (offline)
                return caches.match(event.request);
            })
    );
});
