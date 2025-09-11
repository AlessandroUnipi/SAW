/* public/firebase-messaging-sw.js */
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
