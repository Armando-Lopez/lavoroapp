import React from "react";
import logo from "../../logo.png";
import { Link } from "react-router-dom";
//css
import "./css/login.css";

const Login = () => {
  return (
    <section className="login-section center-align">
      <div className="bg blue"></div>
      <div className="content">
        <img src={logo} alt="logo" />
        <h1 className="white-text">Services</h1>
        <div className="row container">
          <form className="col s12 white container form-login">
            <h2 className="blue-text">Iniciar sesion</h2>
            <div className="divider blue"></div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder="usuario@gmail.com"
                  id="email"
                  type="text"
                  className="validate"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input id="password" type="text" className="validate" />
                <label htmlFor="password">Contraseña</label>
              </div>
              <button className="waves-effect waves-light btn-small blue">
                Ingresar
              </button>
              <p>
                ¿No tienes cuenta? <Link to="/registro">Crea una cuenta</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
