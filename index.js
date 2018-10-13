/**
 * Add Service Worker
 */
 // we check if the browser supports Service Worker
if ("serviceWorker" in navigator){
// if it does then we register Service Wroker
  navigator.serviceWorker.register("./js/sw.js")
  .then(function(reg){
    console.log("It worked", reg)
 // if not then registration fails
  }).catch(function(error){
    console.log("Service Worker failed", error);
  });
}
