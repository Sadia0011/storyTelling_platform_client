// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKVjJJ0hiXfRidi3XTkerunrEU0DOqW8Q",
  authDomain: "user-email-password-auth-117c5.firebaseapp.com",
  projectId: "user-email-password-auth-117c5",
  storageBucket: "user-email-password-auth-117c5.appspot.com",
  messagingSenderId: "935115863023",
  appId: "1:935115863023:web:24649abe1409c14da03c1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

export default auth;