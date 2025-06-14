// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyAVCO68km4dVKDkSSP4V5QyBknbtoBgPWE",
    authDomain: "letcode-c0bf0.firebaseapp.com",
    projectId: "letcode-c0bf0",
    storageBucket: "letcode-c0bf0.firebasestorage.app",
    messagingSenderId: "523512842358",
    appId: "1:523512842358:web:c0bce7ff3e163ea9953757",
    measurementId: "G-DTRDE7Y7NX"
  };



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db, app };