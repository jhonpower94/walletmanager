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
  apiKey: "AIzaSyC46Il39qliVniywT-gyCtQ0rwj7AwhONg",
  authDomain: "bitboxwallet-d8b3d.firebaseapp.com",
  projectId: "bitboxwallet-d8b3d",
  storageBucket: "bitboxwallet-d8b3d.appspot.com",
  messagingSenderId: "239069792405",
  appId: "1:239069792405:web:5e28571b4a492c14dff39c"
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
