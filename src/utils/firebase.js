// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "netflixgpt-db44f.firebaseapp.com",
  projectId: "netflixgpt-db44f",
  storageBucket: "netflixgpt-db44f.firebasestorage.app",
  messagingSenderId: "60526060023",
  appId: "1:60526060023:web:2b8f24ec22a2c7c2efcef2",
  measurementId: "G-WPP1DYFHBK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
