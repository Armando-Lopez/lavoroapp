import React, { useEffect } from "react";
import M from "materialize-css";

const Dropdown = () => {
  useEffect(() => {
    const elem = document.querySelector(".dropdown-trigger");
    const instances = M.Dropdown.init(elem, { closeOnClick: true });
    // console.log(instances);
  });

  return (
    <>
      <a className="dropdown-trigger" href="#" data-target="dropdown1">
        <i className="material-icons">notifications_none</i>
      </a>

      <ul id="dropdown1" className="dropdown-content">
        <li>
          <a href="#!">Cerrar</a>
        </li>
        <li>
          <a href="#!">Cerrar</a>
        </li>
      </ul>
    </>
  );
};
export default Dropdown;
