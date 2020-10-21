import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBfO2Qvd3ncyJPdPY4nxT3vwwdkUQS4KUY",
    authDomain: "lavoro-app.firebaseapp.com",
    databaseURL: "https://lavoro-app.firebaseio.com",
    projectId: "lavoro-app",
    storageBucket: "lavoro-app.appspot.com",
    messagingSenderId: "66836806828",
    appId: "1:66836806828:web:92c781be63a3d157337309",
    measurementId: "G-18G5B78DJB",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
export default db;
