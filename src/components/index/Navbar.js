import React from "react";
import M from "materialize-css";

document.addEventListener("DOMContentLoaded", function () {
  M.Sidenav.init(document.querySelectorAll(".sidenav"));
});

const Navbar = () => {
  return (
    <div className="navbar-fixed">
      <nav className="blue accent-3">
        <div className="nav-wrapper">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
          <a data-target="side-menu" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          {/* <form>
          <div class="input-field">
          <input id="search" type="search" required />
          <label class="label-icon" for="search">
          <i class="material-icons">search</i>
          </label>
          <i class="material-icons">close</i>
          </div>
        </form> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
