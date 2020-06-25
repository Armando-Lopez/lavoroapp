import React from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";

export const sessionObserver = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      return <Redirect to="/" />;
    } else {
      return <Redirect to="/login" />;
    }
  });
};
