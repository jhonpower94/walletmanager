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
  apiKey: "AIzaSyDsW0J1Jar7-RyYPBuXEupwwQh5RXfZ2aA",
  authDomain: "satocoin-46f61.firebaseapp.com",
  projectId: "satocoin-46f61",
  storageBucket: "satocoin-46f61.appspot.com",
  messagingSenderId: "443358402674",
  appId: "1:443358402674:web:d0bec8128d4448663f0aeb"
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
