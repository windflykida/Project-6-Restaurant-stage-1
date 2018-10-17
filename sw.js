// https://developer.mozilla.org/en-US/docs/Web/API/Cache

var mainCacheName = "1";
var currentCache = {
  font:"font-cache-v" + mainCacheName
};
var urlToCache = [
  "./",
  "./index.html",
  "./restaurant.html",
  "./css/styles.css",
  "./data/restaurants.json",
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
  "./js/restaurant_info.js",
  "./js/dbhelper.js",
];

self.addEventListener("install", function(event){
    event.waitUntil(
      caches.open(currentCache).then(function(){
        console.log("Opened cache");
          // return cache.addAll(urlToCache);
      }).catch(function(){
        console.log("Failed to create catche");
      })
    );
});

self.addEventListener("activate", function(event){
  var expextedCacheName = Object.values(currentCache);
    event.waitUntil(
      caches.keys().then(function(cacheNames){
        return Promise.all(
          cacheNames.map(function(cacheName){
            return (!expextedCacheName.includes(cacheName))
              console.log("Deleting out of date cache:", cacheName);


            return caches.delete(cacheName);
          })
        )
    })
  );
  });

  self.addEventListener("fetch", function(event){
    console.log('Handling fetch event for', event.request.url);
      event.respondWith(
        caches.open(currentCache["font"])
          .then(function(cache){
            return caches.match(event.request)
              .then(function(response){
                if (response){
                  console.log("Found response in cache:", response);
                  return response;

                }else{
                  console.log("Fetching request from the network");
                  return fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());

                    return response;
                  })

                  };
                        }).catch(function(error){
                          console.error("Error in fetch handler:", error);
                            return error;
                  });
                }));

            });
