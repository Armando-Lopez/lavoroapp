import firebase from "firebase";

const closeSession = () => {
  firebase
    .auth()
    .signOut()
    .then((res) => {
      console.log(res);
      window.location.href = "/login";
    })
    .catch((error) => {
      console.log(error);
    });
};

export default closeSession;
