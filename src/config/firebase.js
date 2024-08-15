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
  apiKey: "AIzaSyAwR5CQcdMaKK7Dt9xbjd8TGha7HZJegb4",
  authDomain: "bitanzo.firebaseapp.com",
  projectId: "bitanzo",
  storageBucket: "bitanzo.appspot.com",
  messagingSenderId: "34386365225",
  appId: "1:34386365225:web:d8679836b8701dd0c10538"
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
