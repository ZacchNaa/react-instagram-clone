import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC8lRtJnJW-VJIQUdrYaYZFUwJkSuLtHWk",
  authDomain: "instagram-clone-40154.firebaseapp.com",
  projectId: "instagram-clone-40154",
  storageBucket: "instagram-clone-40154.appspot.com",
  messagingSenderId: "962297824512",
  appId: "1:962297824512:web:a255ab1731bd29ccbd5fe5",
  measurementId: "G-NRQKDDKZGD",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
