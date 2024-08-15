import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Set up Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDqiu3RCeRDyQtoHHIeCvo2cfTDoRXlWbs",
  authDomain: "bitfinex-8a8f0.firebaseapp.com",
  projectId: "bitfinex-8a8f0",
  storageBucket: "bitfinex-8a8f0.appspot.com",
  messagingSenderId: "369866227936",
  appId: "1:369866227936:web:2dc342f95dfbdd3493d085"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);

const storage = getStorage(app);

// Listen only for logged in state

export {
  app,
  auth,
  db,
  storage,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
};
