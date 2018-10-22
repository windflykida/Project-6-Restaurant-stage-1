// https://developer.mozilla.org/en-US/docs/Web/API/Cache

var mainCacheName = "my-restaurant-cache-v11";

var urlToCache = [
  "/",
  "./css/styles.css",
  "./css/responsive.css",
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
  "./index.html",
  "./restaurant.html",
];


self.addEventListener("install", function(event){
    event.waitUntil(
      caches.open(mainCacheName)
      .then(function(cache){
        console.log("Opened cache");
          return cache.addAll(urlToCache);
      }).catch(function(){
        console.log("Failed to create catche");
      })
    );
});

self.addEventListener("activate", function(event){

  const cacheList = [mainCacheName];
   event.waitUntil(
     caches.keys().then(function(cacheNames){
       return Promise.all(
         cacheNames.map(function(cacheName){
           if(cacheList.indexOf(cacheName) === -1){
             return caches.delete(cacheName);
           }
         })
       );
     })
   );
});


self.addEventListener("fetch", function(event){
    console.log("Fetch event for " , event.request);
    event.respondWith(
      caches.match(event.request)
      .then(function(response){
        if(response){
          console.log("Found ", event.request, " in cache");
          return response;
        }else{
        console.log("Network request for", event.request);
        return fetch(event.request).then(function(response){
         return caches.open(mainCacheName).then(function(cache){
           cache.put(event.request, response.clone());
             return response;
        });

      });
    };
}))

});
