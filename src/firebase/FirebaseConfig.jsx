import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBEs5YifUBKYHmabj21rtxpTWwSzCyteyI",
    authDomain: "e-commerce-65379.firebaseapp.com",
    projectId: "e-commerce-65379",
    storageBucket: "e-commerce-65379.appspot.com",
    messagingSenderId: "430497445893",
    appId: "1:430497445893:web:0ec7c86d8949056775046c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app);
const auth = getAuth(app)
export { fireDb, auth }