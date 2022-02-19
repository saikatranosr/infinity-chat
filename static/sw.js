var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/css/style.css',
  '/js/main.js',
  '/js/connection.js',
  '/js/myfoos.js',
  '/media/logo.svg',
  '/media/logo.png',
  '/media/logo-w.png',
  'socket.io/socket.io.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];
this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('notificationclick', e =>{
  console.log('Clicked on notification');
  e.notification.close()
  self.clients.matchAll().then(all => all.forEach(client => {
        client.postMessage("response from SW");
    }));
})

self.addEventListener('notificationclose', function(e) {
  console.log('Closed notification:');
});

//New 