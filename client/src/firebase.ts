import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDzi3o1_XUfOG2w7jqOUXAH4VE9QLs2NTA",
    authDomain: "lama-1285f.firebaseapp.com",
    databaseURL: "https://lama-1285f-default-rtdb.firebaseio.com",
    projectId: "lama-1285f",
    storageBucket: "lama-1285f.appspot.com",
    messagingSenderId: "737663715257",
    appId: "1:737663715257:web:7d238cdc8d7d2b101ed868",
    measurementId: "G-X4PCCL097Z"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firestore = firebase.firestore();
const auth = firebase.auth();

export { storage, firestore, auth };