import React from "react";
import logo from "../../logo.png";

//css
import "./css/loader.css";

const Loader = () => (
  <div className="loader-container transparent">
    <img src={logo} alt="cargando..." />
  </div>
);

export default Loader;
