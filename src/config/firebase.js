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
  apiKey: "AIzaSyAg77t9Dj5OY5StIR8-2m7Syyy5Cz5UFXs",
  authDomain: "basecoin-33efc.firebaseapp.com",
  projectId: "basecoin-33efc",
  storageBucket: "basecoin-33efc.appspot.com",
  messagingSenderId: "600917255338",
  appId: "1:600917255338:web:713e5c0425dd63de8e9cd3",
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
