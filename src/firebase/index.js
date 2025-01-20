import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyD4DW-qAn53NjWeGtQmqRkyIqgHdhOeGsI",
    authDomain: "summative-e787e.firebaseapp.com",
    projectId: "summative-e787e",
    storageBucket: "summative-e787e.firebasestorage.app",
    messagingSenderId: "9944568923",
    appId: "1:9944568923:web:3c9ee19f54bea8622adb7e"
  };
  


const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };