const CACHE_NAME = 'ALBUM_CACHE';
const NETWORK_STATE = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
}
const networkState = {
  state: NETWORK_STATE.ONLINE
}
const CACHE_FILE_1 = [
];
const CACHE_FILE_2 = [
  '/',
  '/index.html',
  '/vite.svg',
  '/manifest.json',
  "/react_icon_1024.png",
  "/react_icon_512.png",
  "/react_icon_256.png",
  "/react_icon_64.png",
  "/react_icon_32.png",
  "/react_icon_24.png",
  "/react_icon_16.png",

]
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([...CACHE_FILE_1, ...CACHE_FILE_2]);
    })
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetchNetworkFirst(event));
});

// 网络优先策略  
function fetchNetworkFirst(event) {
  const request = event.request;
  return fetch(request).then(response => {
    // 克隆响应，response只能被被消费一次
    const tempResponse = response.clone();
    // 缓存响应
    caches.open(CACHE_NAME).then(cache => {
      if (request.method === 'GET') {
        cache.put(request, tempResponse);
      }
    });
    return response;
  }).catch(() => {
    // 网络请求失败，从缓存中获取
    return caches.match(request);
  });
}