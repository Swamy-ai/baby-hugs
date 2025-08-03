// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyT7FwosRuyp8t5eDuRQDCVsRvRCCpJDE",
  authDomain: "store-a3ba6.firebaseapp.com",
  projectId: "store-a3ba6",
  storageBucket: "store-a3ba6.firebasestorage.app",
  messagingSenderId: "196721554277",
  appId: "1:196721554277:web:41e5f2caaffb213d75278c"
};


const cloudinaryCreds = {
  API_KEY:766521848141496,
  API_SCRECT:"hjOaWzkJztXmMW-qDQ9UaCN2pXc",
  CLOUD_NAME:"lakshmiswamy"
} 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
