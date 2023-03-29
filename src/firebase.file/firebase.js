// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getDatabase} from "firebase/database"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCq3FmD1MaVjhAeAf5KddrNRePd7SSiQ44",
  authDomain: "emoa-5f7b3.firebaseapp.com",
  databaseURL: "https://emoa-5f7b3-default-rtdb.firebaseio.com",
  projectId: "emoa-5f7b3",
  storageBucket: "emoa-5f7b3.appspot.com",
  messagingSenderId: "384902435772",
  appId: "1:384902435772:web:4fb9493dc709e835d811b9",
  measurementId: "G-BEKTY8VCJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app);
const r_db = getDatabase(app)

export {db,auth,r_db}