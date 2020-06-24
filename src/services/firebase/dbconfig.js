import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyDUqEXFhVtjYh1vazw0d4WGg6aikOt27YA",
  authDomain: "services-project-b5302.firebaseapp.com",
  projectId: "services-project-b5302",
});

const db = firebase.firestore();
export default db;

// export function createWorker(data) {
//   db.collection("workers")
//     .add(data)
//     .then(function (docRef) {
//       console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function (error) {
//       console.error("Error adding document: ", error);
//     });
// }

// export function getAll() {
//   db.collection("workers")
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
//       });
//     });
// }
