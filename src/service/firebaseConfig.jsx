// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOlWRtzw3CLbbk8N2RtATVslah8lxwPk4",
  authDomain: "trip-121e1.firebaseapp.com",
  projectId: "trip-121e1",
  storageBucket: "trip-121e1.firebasestorage.app",
  messagingSenderId: "815861438562",
  appId: "1:815861438562:web:03f897924552a42dce593b",
  measurementId: "G-8D9JPKJHN7"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//export const analytics = getAnalytics(app);