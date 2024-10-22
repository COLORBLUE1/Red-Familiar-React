import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Importar el módulo de Storage
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDUSy8DdTZJqIt_iv_fUvz8L-YGkvxBlQs",
  authDomain: "jc-bd-38675.firebaseapp.com",
  projectId: "jc-bd-38675",
  storageBucket: "jc-bd-38675.appspot.com",
  messagingSenderId: "856274345338",
  appId: "1:856274345338:web:a8495f94e7f6e760c58ac3",
  databaseURL: "https://jc-bd-38675-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const firestore = getFirestore();
export const storage = getStorage(); 
export default firebaseConfig;
