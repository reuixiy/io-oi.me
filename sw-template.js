const workboxVersion = '4.3.1';

importScripts(`https://cdn.jsdelivr.net/npm/workbox-cdn@${workboxVersion}/workbox/workbox-sw.js`);

workbox.setConfig({
    modulePathPrefix: `https://cdn.jsdelivr.net/npm/workbox-cdn@${workboxVersion}/workbox/`
});

workbox.core.setCacheNameDetails({
    prefix: "reuixiy"
});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([]);

workbox.precaching.cleanupOutdatedCaches();

// Images
workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);

// Videos
workbox.routing.registerRoute(
    /\.(?:mp4|webm|ogg)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "videos",
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [200]
            }),
            new workbox.rangeRequests.Plugin()
        ]
    })
);

// Fonts
workbox.routing.registerRoute(
    /\.(?:eot|ttf|woff|woff2)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "fonts",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);

// Google Fonts
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets"
    })
);
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);

// Static Libraries
workbox.routing.registerRoute(
    /^https:\/\/cdn\.jsdelivr\.net/,
    new workbox.strategies.CacheFirst({
        cacheName: "static-libs",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);

// External Images
workbox.routing.registerRoute(
    /^https:\/\/io-oi\.oss-cn-shanghai\.aliyuncs\.com\/images\/.*/,
    new workbox.strategies.CacheFirst({
        cacheName: "external-images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);

// External Videos
workbox.routing.registerRoute(
    /^https:\/\/io-oi\.oss-cn-shanghai\.aliyuncs\.com\/videos\/.*/,
    new workbox.strategies.CacheFirst({
        cacheName: "external-videos",
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [200]
            }),
            new workbox.rangeRequests.Plugin()
        ]
    })
);

workbox.googleAnalytics.initialize({});
