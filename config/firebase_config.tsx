// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyByDFqFW6F2O2gW4g0wVdOIpR0aUSyd3S0",
  authDomain: "nxt-card-app.firebaseapp.com",
  projectId: "nxt-card-app",
  storageBucket: "nxt-card-app.firebasestorage.app",
  messagingSenderId: "587908615935",
  appId: "1:587908615935:web:c70e0ebf651812f4d5c6ca",
  measurementId: "G-XSN56RBS9D"
  };



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db, app };