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

const CACHE_NAME = 'runtime';

self.skipWaiting();

self.addEventListener('fetch', function (event) {
  // Do nothing if not from the same origin
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
```

**What It Does**

- 依 URL 缓存请求过的站内文件（「永久」）
- 发起请求时，添加╱更新缓存
- 发起请求时，先返回缓存，后发起请求[^1]

**What It Doesn’t Do**

- 预缓存未请求的文件
- 缓存站外文件
- 清理缓存

---

[^1]: 这样就会导致一个问题，即用户获取的可能不是最新内容，除非再次刷新页面。
