+++
title = "一个简单的 Service Worker"
date = "2020-08-19T23:29:45+08:00"
tags = ["web", "pwa"]
slug = "a-simple-service-worker"
description = "一个采用 Stale-while-revalidate 策略的简单 Service Worker"
dropCap = false
gitinfo = true
+++

```html
<!-- HTML -->

<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js');
        });
    }
</script>
```

```js
// sw.js

/**
  References:

  1. https://developers.google.com/web/fundamentals/primers/service-workers
  2. https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook
  3. https://googlechrome.github.io/samples/service-worker/
  4. https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
  5. https://serviceworke.rs/
*/

const RUNTIME = 'runtime';

self.skipWaiting();

self.addEventListener('fetch', (event) => {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            (async () => {
                const cache = await caches.open(RUNTIME);
                const cachedResponse = await cache.match(event.request);
                const networkResponsePromise = fetch(event.request);

                event.waitUntil(
                    (async () => {
                        const networkResponse = await networkResponsePromise;
                        await cache.put(event.request, networkResponse.clone());
                    })()
                );

                // Returned the cached response if we have one, otherwise return the network response.
                return cachedResponse || networkResponsePromise;
            })()
        );
    }
});
```

**What It Does**

- 依 URL 缓存请求过的站内文件（永久）
- 发起请求时，添加╱更新缓存
- 发起请求时，先返回缓存，后发起请求[^1]

**What It Doesn’t Do**

- 预缓存未请求的文件
- 缓存站外文件
- 清理缓存

---

[^1]: 这样就会导致一个问题，即用户获取的可能不是最新内容，除非再次刷新页面。
