import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import Dropdown from "./Dropdown";
import closeSession from "./closeSession";
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
        <nav className="blue accent-3">
          <div className="nav-wrapper">
            <ul id="nav-mobile" className="right">
              <li>
                <Link to={`/workerprofile/${user.uid}`}>
                  <span>Perfil</span>
                </Link>
              </li>

              <li>
                <Dropdown uid={user.iud} />
              </li>

              <li>
                <a onClick={closeSession}>Cerrar sesión</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="navbar-fixed">
        <nav className="blue">
          <div className="nav-wrapper">
            <ul id="nav-mobile" className="right">
              <li>
                <a href="/login">Inicia sesión</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};

export default Navbar;
