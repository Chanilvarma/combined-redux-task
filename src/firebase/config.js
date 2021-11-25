import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiAcY0ygXYDmr7gsizc8bzZEPxlj0m8VY",
  authDomain: "expenses-tracker-51741.firebaseapp.com",
  projectId: "expenses-tracker-51741",
  storageBucket: "expenses-tracker-51741.appspot.com",
  messagingSenderId: "617783908164",
  appId: "1:617783908164:web:6fa9adbc50240680d7e911",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const docRef = firebase
  .firestore()
  .collection("transactions")
  .doc("6F79bk5nRUXba7w9aXLr");
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, docRef, timestamp };
