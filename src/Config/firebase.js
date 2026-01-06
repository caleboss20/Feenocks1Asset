


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDejpvFx5RQOj1qtzQbKOoBCWhtLgnFP-w",
  authDomain: "greatapp-8af50.firebaseapp.com",
  projectId: "greatapp-8af50",
  storageBucket: "greatapp-8af50.firebasestorage.app",
  messagingSenderId: "359483155414",
  appId: "1:359483155414:web:a529385b21026f0c4c3a77",
  measurementId: "G-GMSQNHMZNV"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;