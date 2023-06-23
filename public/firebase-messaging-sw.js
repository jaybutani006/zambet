// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyA6DAIkeofTjm_uqWxk6sVm071pGsSj7wY",
  authDomain: "zambet-web-notification.firebaseapp.com",
  projectId: "zambet-web-notification",
  storageBucket: "zambet-web-notification.appspot.com",
  messagingSenderId: "225480844315",
  appId: "1:225480844315:web:75e54ad9da72325af244be",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  //   // TODO
  //   icon: payload.notification?.icon,
  // };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
