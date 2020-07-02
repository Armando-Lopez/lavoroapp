import React from "react";

//components
import Intro from "./components/Intro";
import SignupForm from "./components/SignupForm";

//css
import "./css/signup.css";

const WorkerSignupSection = () => {
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
