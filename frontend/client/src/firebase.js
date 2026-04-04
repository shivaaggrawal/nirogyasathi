import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCIbqq6i2eUaFL3L1JWe1vaogOfofAw08E",
    authDomain: "nirogyasathi-5c8e2.firebaseapp.com",
    projectId: "nirogyasathi-5c8e2",
    storageBucket: "nirogyasathi-5c8e2.firebasestorage.app",
    messagingSenderId: "366694683242",
    appId: "1:366694683242:web:552d0738ce5a93c290b013"
};

const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);

// Google Auth Provider for sign-in
export const provider = new GoogleAuthProvider();