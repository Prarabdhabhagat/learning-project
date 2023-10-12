// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6X6I-p-5HX7M21CVrbA5rDtQTnxk0-3A",
  authDomain: "new-contact-520aa.firebaseapp.com",
  projectId: "new-contact-520aa",
  storageBucket: "new-contact-520aa.appspot.com",
  messagingSenderId: "882436175123",
  appId: "1:882436175123:web:59371090b3bc75cdcc16e6",
  measurementId: "G-ZG4GEDS501",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
