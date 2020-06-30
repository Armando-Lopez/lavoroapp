import React from "react";
import logo from "../../../logo.png";
import { Link } from "react-router-dom";

const Intro = () => (
  <div className="text">
    <img src={logo} className="responsive-img logo" alt="logo" />
    <p className="light-blue-text text-accent-4 flow-text">
      Crea una cuenta. Empieza a dar a conocer tus Habilidades y ofrece tus
      servicios.
    </p>
    <p className="flow-text">
      ¿Ya tienes cuenta?
      <Link to="/login">Inicia sesión</Link>
    </p>
  </div>
);

export default Intro;
