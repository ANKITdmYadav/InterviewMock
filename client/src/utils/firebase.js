import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY  ,
  authDomain: "interviewai-1.firebaseapp.com",
  projectId: "interviewai-1",
  storageBucket: "interviewai-1.firebasestorage.app",
  messagingSenderId: "931339890088",
  appId: "1:931339890088:web:f139616771a059fcff019d",
  measurementId: "G-ZBF13ZVBT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)

const provider=new GoogleAuthProvider()

export {auth, provider}