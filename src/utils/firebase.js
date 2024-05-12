
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "blog-app-91ddc.firebaseapp.com",
  projectId: "blog-app-91ddc",
  storageBucket: "blog-app-91ddc.appspot.com",
  messagingSenderId: "1054562214885",
  appId: "1:1054562214885:web:44a17b8546c8b3275e450c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);