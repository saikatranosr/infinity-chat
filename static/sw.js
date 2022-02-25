var CACHE_NAME = 'my-site-cache-v11';
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
  caches.keys().then(function(names) {
    for (let name of names)
      caches.delete(name);
  });
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

self.addEventListener('notificationclick', event =>{
  console.log('Clicked on notification');
  event.notification.close()
  if (event.action == 'mark-as-read') {
    self.clients.matchAll().then(all => all.forEach(client => {
      client.postMessage("mark-as-read");
    }));
  }
})

self.addEventListener('notificationclose', function(e) {
  // Send notification data
  console.log('Closed notification:');
});
//New new