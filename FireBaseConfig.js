import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, collection,addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz8glSXmmQ5UUIDFzr7BEzN04AZv89zNI",
  authDomain: "online-shop-86ddf.firebaseapp.com",
  projectId: "online-shop-86ddf",
  storageBucket: "online-shop-86ddf.appspot.com",
  messagingSenderId: "130469056663",
  appId: "1:130469056663:web:7b7ce0145542a558a4d9d2",
  measurementId: "G-9WT87GTPPF"
};

// Initialize Firebase
export const Firebase_App = initializeApp(firebaseConfig);
export const FIREBASE_auth = getAuth(Firebase_App);
export const FIREBASE_db = getFirestore(Firebase_App)
