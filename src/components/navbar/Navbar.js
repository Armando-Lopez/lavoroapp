import React, { useEffect } from "react";
import logo from "../../logo.png";
import M from "materialize-css";
import Sidenav from "./Sidenav";
//css
import "./css/navbar.css";

const Navbar = () => {
  useEffect(() => {
    const elem = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elem);
  }, []);

  return (
    <>
      <div className="navbar-fixed">
        <nav className="blue-grey lighten-5 z-depth-3 row">
          <div className="nav-wrapper col s12 m10 offset-m1">
            <a href="/" className="brand-logo center">
              <img src={logo} width="50" alt="lavoroApp logo" />
            </a>

            <a
              href="#!"
              data-target="sidenav"
              className="sidenav-trigger blue-text text-darken-3 show-on-medium-and-up"
            >
              <i className="material-icons" style={{ fontSize: "2em" }}>
                menu
              </i>
            </a>
          </div>
        </nav>
      </div>

      <Sidenav />
    </>
  );
};

export default Navbar;
