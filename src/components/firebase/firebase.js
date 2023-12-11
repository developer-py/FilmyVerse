// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnTbPtB2hXvT3iuFgrByHyK_1mihm5c_M",
  authDomain: "filmyverse-3a930.firebaseapp.com",
  projectId: "filmyverse-3a930",
  storageBucket: "filmyverse-3a930.appspot.com",
  messagingSenderId: "575399026102",
  appId: "1:575399026102:web:da879cc9c792663472f517"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef=collection(db,"movies");
export const reviewsRef=collection(db,"reviews");
export const usersRef=collection(db,"users");
export default app;