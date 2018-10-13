var cacheName = "cache-v1";
var urlCacheFiles = [
  "./",
  "./restaurant.html",
  "./css/styles.css",
  "./data/restaurant.json",
  "./img/1.jpg",
  "./img/2.jpg",
  "./img/3.jpg",
  "./img/4.jpg",
  "./img/5.jpg",
  "./img/6.jpg",
  "./img/7.jpg",
  "./img/8.jpg",
  "./img/9.jpg",
  "./img/10.jpg",
  "./js/main.js",
  "./js/dbhelper.js",
  "./js/restaurant_info.js",
];


self.addEventListener("install", function(event){
  console.log("[serviceWorker] installed")

  event.waitUntil(
    caches.open(cacheName).then(function(cache){
      console.log("[ServiceWorker] is in the first stage - caching ");

      return cache.addAll(urlCacheFiles);

    }).catch(function(){
      console.log("Something went wrong during creating cache")
    })
  );
});

self.addEventListener("activate", function(event){
  console.log("[serviceWorker] activeted");

  event.waitUntil(
     caches.keys().then(function(cacheNames){
        return Promise.all(cacheNames.filter(function(newCache){
            return newCache.startsWith("restaurant-") &&
              newCache !== cacheName;
                console.log("UPsss");
      }).map(function(newCache){
          return caches.delete(newCache);
        })
        );
      }));

  });

self.addEventListener("fetch", function(event){
  event.respondWith(
    caches.open(cacheName).then(function(cache){
      return caches.match(event.request).then(function(resposne){
        if(response){
          return resposne;
          // when it doesn't find then it fetch from network
        } else {
          return fetch(event.request).then(function(response){
            cache.put(event.request,response.clone());
            return response;
          });
        }
      });
    })
  )
});
