// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_y7mo-tpp1agtyNi6TcVmankp1TZTDpA",
  authDomain: "saw-alexandru-boghiu.firebaseapp.com",
  projectId: "saw-alexandru-boghiu",
  storageBucket: "saw-alexandru-boghiu.firebasestorage.app",
  messagingSenderId: "92708711721",
  appId: "1:92708711721:web:cc96f36d9410aee3515b38",
  measurementId: "G-93TTCV86W9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);