// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export const auth = getAuth(app);

const analytics = getAnalytics(app);

export default app;
