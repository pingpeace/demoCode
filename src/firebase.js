// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB-RW5nF1BkXmZmm4trgjotkTaxPg4OJs8",
    authDomain: "redso-demo.firebaseapp.com",
    projectId: "redso-demo",
    storageBucket: "redso-demo.appspot.com",
    messagingSenderId: "220549187792",
    appId: "1:220549187792:web:6131defb141fccf08c76d5",
    measurementId: "G-24QP6RGF8Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };