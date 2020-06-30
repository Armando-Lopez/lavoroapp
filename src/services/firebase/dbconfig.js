import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDUqEXFhVtjYh1vazw0d4WGg6aikOt27YA",
  authDomain: "services-project-b5302.firebaseapp.com",
  databaseURL: "https://services-project-b5302.firebaseio.com",
  projectId: "services-project-b5302",
  storageBucket: "services-project-b5302.appspot.com",
  messagingSenderId: "880871293612",
  appId: "1:880871293612:web:3170eb5cd7d6bf227f9509",
  measurementId: "G-QND9DZ4FKL",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
export default db;
