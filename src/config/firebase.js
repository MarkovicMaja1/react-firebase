import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAROx35vmtBVVJnqi6dbP6KLgpHThqmjeA",
  authDomain: "reactproject-4e877.firebaseapp.com",
  projectId: "reactproject-4e877",
  storageBucket: "reactproject-4e877.appspot.com",
  messagingSenderId: "417302652257",
  appId: "1:417302652257:web:7bd184cb0f7bdda0a49120",
  measurementId: "G-KCE501S88B"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
