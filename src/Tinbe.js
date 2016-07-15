/**
 * Electron based desktop application for setting geotags for images
 *
 * Licensed under the MIT license
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 */

var Tinbe = window.Tinbe = {
  images: []
};
/*
self.addEventListener('fetch', function(event) {
  console.log(event.request);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(new Response("Hello world!"));
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/my-app/sw.js', {
    scope: '/my-app/'
  }).then(function(reg) {
    console.log('Yey!', reg);
  }).catch(function(err) {
    console.log('Boo!', err);
  });
}
*/
