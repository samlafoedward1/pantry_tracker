// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtzR4zED7PdPJ_9smTMFrP6zLNeCodZ0k",
  authDomain: "pantry-trakcer.firebaseapp.com",
  projectId: "pantry-trakcer",
  storageBucket: "pantry-trakcer.appspot.com",
  messagingSenderId: "851871742831",
  appId: "1:851871742831:web:681e4b61ce5b2d79a4069a",
  measurementId: "G-3KZB9ERS52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firestore = getFirestore(app);
