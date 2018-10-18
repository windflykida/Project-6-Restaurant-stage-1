/**
 * Add Service Worker
 */
 // we check if the browser supports Service Worker
if ("serviceWorker" in navigator){
// if it does then we register Service Wroker
  navigator.serviceWorker.register("./sw.js")
  .then(function(registration){
    console.log("It worked with scope: "+ registration.scope);
 // if not then registration fails
  }).catch(function(error){
    console.log("Service Worker failed", error);
  });
};
