// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp  } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { reactive } from "vue";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtmMJfOxiq5SrF2CQaelYkJdkxhLFmZHw",
  authDomain: "vue-exam-7a797.firebaseapp.com",
  projectId: "vue-exam-7a797",
  storageBucket: "vue-exam-7a797.firebasestorage.app",
  messagingSenderId: "844958591656",
  appId: "1:844958591656:web:5867dcf39af4e5926bb09d",
  measurementId: "G-82GKW9RS1N"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);

// Track user authentication status
const currentUser = reactive({ user: null });
onAuthStateChanged(auth, (user) => {
  currentUser.user = user;
});

export { auth, db, currentUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, serverTimestamp };