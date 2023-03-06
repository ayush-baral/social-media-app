// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyBPLiYXe7RnhZFNym0bha6dNe3NICugKO8',
  authDomain: 'social-media-app-6edaf.firebaseapp.com',
  projectId: 'social-media-app-6edaf',
  storageBucket: 'social-media-app-6edaf.appspot.com',
  messagingSenderId: '128684684634',
  appId: '1:128684684634:web:c52cf9283169a9d7116f63',
  measurementId: 'G-CRQY6XJK2L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export const auth = getAuth(app);

export const requestForToken = async (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      'BN-5C-ETQ_4XgEVKvHPks6HGy3cRRbE4mLsO4rZKzh-4V6vczUeVlQ87ap0dCcLpzQP4ynwV6jar6oLlJW3UazM',
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        setTokenFound(false);
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('payload', payload);
      resolve(payload);
    });
  });

// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message: ', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = { body: payload.notification.body };

//   // eslint-disable-next-line no-restricted-globals
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

export default app;
