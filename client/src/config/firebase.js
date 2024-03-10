import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBu3TXbXP7ZJZF4WisMg5tCvd2yj1ShckU",
  authDomain: "bitcraft-40688.firebaseapp.com",
  projectId: "bitcraft-40688",
  storageBucket: "bitcraft-40688.appspot.com",
  messagingSenderId: "584857016161",
  appId: "1:584857016161:web:dbeeccc9c91c6456415720"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();