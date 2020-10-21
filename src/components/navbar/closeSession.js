import firebase from "firebase";

const closeSession = () => {
    firebase
        .auth()
        .signOut()
        .then((res) => {
            window.location.href = "/";
        })
        .catch((error) => {
            console.log(error);
        });
};

export default closeSession;
