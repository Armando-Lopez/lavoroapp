import React from "react";
import { Link } from "react-router-dom";
import Session from "../../services/localStorageService";

const userToken = Session.getCurrent();
console.log(userToken);

const SideMenu = () => {
  return (
    <ul className="sidenav" id="side-menu">
      <li>
        <div className="user-view">
          <div className="background">
            <img
              src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/tnc_16935516.jpg?crop=0,432,7360,4048&wid=4000&hei=2200&scl=1.84"
              alt="backgroundimg"
            />
          </div>
          <img
            src="https://i.insider.com/59c387d3ba785e34910e27b4?width=1100&format=jpeg&auto=webp"
            className="circle"
            alt="profilephoto"
          />
          <span className="name white-text">Obama</span>
          <span className="email white-text">Obama@gmail.com</span>
        </div>
      </li>
      <li>
        <a href={`/profile/${userToken}`}>
          <i className="material-icons">person</i>
          Perfil
        </a>
      </li>
      <li>
        <a href="collapsible.html">Javascript</a>
      </li>
      <li>
        <a href="mobile.html">Mobile</a>
      </li>
    </ul>
  );
};

export default SideMenu;
