// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfWiIJlwvbnN8AuG0gRtYGBcLE1SMm2Eg",
  authDomain: "bookmark-manager-a034f.firebaseapp.com",
  projectId: "bookmark-manager-a034f",
  storageBucket: "bookmark-manager-a034f.firebasestorage.app",
  messagingSenderId: "1015295755067",
  appId: "1:1015295755067:web:1084af5718749419746d1e",
  measurementId: "G-C2KXCK5227"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics (SSR Safe)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, analytics };