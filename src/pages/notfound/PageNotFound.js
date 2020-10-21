import React from "react";
import logo from "../../logo.png";
import "./css/pagenotfound.css";

const PageNotFound = () => {
    return (
        <section className="center-align page-not-found-content light-blue lighten-5">
            <h1>¡oops!</h1>
            <div className="four-cero-four">
                <h1 className="blue-text text-darken-4 four">4</h1>
                <img className="logo-nf" src={logo} alt="logo" />
                <h1 className="blue-text text-darken-4 four">4</h1>
            </div>
            <p className="text-nf">No encontramos lo que buscas</p>
            <p className="text-nf">¿Te perdiste?</p>
            <a href="/" className="btn blue accent-4 z-depth-4 back">
                Vuelve al inicio
            </a>
        </section>
    );
};

export default PageNotFound;
