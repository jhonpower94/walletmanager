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
  apiKey: "AIzaSyB9M3bJzpHwnytSfXWxaY5YCPysYVX5H7E",
  authDomain: "kryptovault-7b9ac.firebaseapp.com",
  projectId: "kryptovault-7b9ac",
  storageBucket: "kryptovault-7b9ac.appspot.com",
  messagingSenderId: "240254423500",
  appId: "1:240254423500:web:59a9c91a931a49239bcd69"
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
