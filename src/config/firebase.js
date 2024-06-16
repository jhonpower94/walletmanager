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
  apiKey: "AIzaSyCUXwRDlcsVBH4T37rNbeuldwSn2zP1yx0",
  authDomain: "stackcoin-538b4.firebaseapp.com",
  projectId: "stackcoin-538b4",
  storageBucket: "stackcoin-538b4.appspot.com",
  messagingSenderId: "5576959555",
  appId: "1:5576959555:web:4f8e2ba46f19f8bc5196f6"
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
