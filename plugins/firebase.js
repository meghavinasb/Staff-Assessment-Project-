import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgc_bczZOTZzKh5un_bW-j_GeKqxGhUlE",
  authDomain: "previous-sem.firebaseapp.com",
  projectId: "previous-sem",
  storageBucket: "previous-sem.appspot.com",
  messagingSenderId: "556117803151",
  appId: "1:556117803151:web:efc1e3880d0a1581a770fa",
  measurementId: "G-HQ5FDHQHJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

// Nuxt plugin setup
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("auth", auth);
  nuxtApp.provide("db", db);
});
