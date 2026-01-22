self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("yogafit-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "app.js",
        "yoga-data.js"
      ]);
    })
  );
});
