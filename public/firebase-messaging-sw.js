import { onMessage } from 'firebase/messaging';
import { toast } from 'react-hot-toast';

// eslint-disable-next-line no-undef
importScripts(
  'https://www.gstatic.com/firebasejs/<v9+>/firebase-app-compat.js'
);
// eslint-disable-next-line no-undef
importScripts(
  'https://www.gstatic.com/firebasejs/<v9+>/firebase-messaging-compat.js'
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
      messaging
        .getToken({
          vapidKey: 'YOUR_VAPID_KEY',
          serviceWorkerRegistration: registration,
        })
        .then((currentToken) => {
          if (currentToken) {
            console.log('current token for client: ', currentToken);

            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
          } else {
            console.log(
              'No registration token available. Request permission to generate one.'
            );

            // shows on the UI that permission is required
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          // catch error while creating client token
        });
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}

const firebaseConfig = {
  apiKey: 'AIzaSyBPLiYXe7RnhZFNym0bha6dNe3NICugKO8',
  authDomain: 'social-media-app-6edaf.firebaseapp.com',
  projectId: 'social-media-app-6edaf',
  storageBucket: 'social-media-app-6edaf.appspot.com',
  messagingSenderId: '128684684634',
  appId: '1:128684684634:web:c52cf9283169a9d7116f63',
  measurementId: 'G-CRQY6XJK2L',
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();
// eslint-disable-next-line no-undef

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  toast?.success(payload?.notification?.title);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
