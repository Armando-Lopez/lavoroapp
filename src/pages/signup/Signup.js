import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import Intro from "./components/Intro";
import SignupForm from "./components/SignupForm";
import "./css/signup.css";

const WorkerSignupSection = () => {
    const [hasSignin, SetSignin] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                SetSignin(true);
            }
        });
    }, []);
    if (hasSignin) {
        return <Redirect to="/" />;
    }
    return (
        <section className="section signup-section">
            <div className="bg"></div>
            <div className="row container content">
                <div className="col s12 m8 offset-m2 center-align">
                    <Intro />
                    <div className="row">
                        <SignupForm />
                    </div>
                </div>
            </div>
        </section>
    );
};
export default WorkerSignupSection;
