// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp8vqkg0HlLybCOV5B3AnCyBgZK6j9EG4",
  authDomain: "raichurhardware-ab91c.firebaseapp.com",
  projectId: "raichurhardware-ab91c",
  storageBucket: "raichurhardware-ab91c.appspot.com",
  messagingSenderId: "552920340792",
  appId: "1:552920340792:web:ae989b5865f85060b7c9cd",
  measurementId: "G-BY678Q30D8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
