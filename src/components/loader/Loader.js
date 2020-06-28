import React from "react";
import logo from "../../logo.png";

//css
import "./css/loader.css";

const Loader = () => (
  <div className="loader-container">
    <img src={logo} alt="cargando..." />
  </div>
  // <div className="preloader-wrapper big active" style={{ marginTop: "10%" }}>
  //   <div className="spinner-layer spinner-blue-only">
  //     <div className="circle-clipper left">
  //       <div className="circle"></div>
  //     </div>
  //     <div className="gap-patch">
  //       <div className="circle"></div>
  //     </div>
  //     <div className="circle-clipper right">
  //       <div className="circle"></div>
  //     </div>
  //   </div>
  // </div>
);

export default Loader;
