import React from "react";
import logo from "../../logo.png";

//css
import "./css/loader.css";

const Loader = () => (
  <div className="loader-container blue accent-1 lighten-1">
    <img src={logo} alt="cargando..." />
  </div>
);

export default Loader;
