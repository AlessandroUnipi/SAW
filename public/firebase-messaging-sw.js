importScripts('https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCLcvLHmV_7etltYH17qOx0wGqIqIzHsCg",
  authDomain: "saw2025-bde46.firebaseapp.com",
  projectId: "saw2025-bde46",
  storageBucket: "saw2025-bde46.firebasestorage.app",
  messagingSenderId: "921166745406",
  appId: "1:921166745406:web:afc07bfb62f1a56669666f",
  measurementId: "G-17MN2ZMX1X"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const n = payload.notification || {};
  const tag = payload?.data?.tag;
  self.registration.showNotification(n.title || "Notifica", {
    body: n.body || "",
    icon: n.icon || "/icons/icon-192.png",
    data: payload.fcmOptions || {},
    tag, 
    renotify: tag || undefined,
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.link) || '/';
  event.waitUntil(clients.openWindow(url));
});


/* CACHE */

const CACHE_NAME = "saw-cache";
const urlsToCache = [
  "/",                      // homepage
  "/index.html",
  "/manifest.webmanifest",
  "/icons/favicon.ico",
  "/icons/icon-192.png",
  "/icons/icon-320.png",
  "/icons/icon-512.png",
  "/icons/logo-padded.png"
];

self.addEventListener("install", (event) => {
  console.log("[SW] Installing new service worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Precaching app shell");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // attiva subito il nuovo SW
});

/* Pulisco la cache veccia */

self.addEventListener("activate", (event) => {
  console.log("[SW] Activating new service worker...");
  const keepList = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) => {
          if (!keepList.includes(name)) {
            console.log("[SW] Removing old cache:", name);
            return caches.delete(name);
          }
        })
      )
    )
  );
  self.clients.claim(); // controlla subito le pagine aperte
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return; // ignora POST/PUT

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(req);
      const fetchPromise = fetch(req)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(req, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => cached); // in caso di offline usa cache
      return cached || fetchPromise;
    })
  );
});