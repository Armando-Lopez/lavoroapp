import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Notifications from "./Notifications";
import closeSession from "./closeSession";
import logo from "../../logo.png";
//css
import "./css/navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  if (user) {
    return (
      <div className="navbar-fixed">
        <nav className="blue accent-2">
          <div className="nav-wrapper">
            <ul id="nav-mobile">
              <li className="left">
                <a href="/">
                  <img
                    src={logo}
                    className="responsive-img lef"
                    width="50"
                    alt="logo"
                  />
                </a>
              </li>

              <li className="right">
                <a href="#!" onClick={closeSession}>
                  Cerrar sesión
                </a>
              </li>

              <li className="right">
                <Notifications uid={user.uid} />
              </li>

              <li className="right">
                <a href={`/workerprofile/${user.uid}`}>
                  <span>Perfil</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="navbar-fixed">
        <nav className="blue accent-2">
          <div className="nav-wrapper">
            <ul id="nav-mobile">
              <li className="left">
                <a href="/">
                  <img
                    src={logo}
                    className="responsive-img lef"
                    width="50"
                    alt="logo"
                  />
                </a>
              </li>

              <li className="right">
                <a href="/login">
                  <span>Inicia sesión</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};

export default Navbar;
