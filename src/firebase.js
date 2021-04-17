import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBsjEJDIumKe8b8uO1i8-p088LMaBjXw9g",
  authDomain: "clone-84692.firebaseapp.com",
  projectId: "clone-84692",
  storageBucket: "clone-84692.appspot.com",
  messagingSenderId: "163614889986",
  appId: "1:163614889986:web:eaa35882e9e3f9469e2f1b",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
