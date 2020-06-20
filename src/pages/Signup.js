import React, { Component } from "react";
import logo from "../logo.png";
import M from "materialize-css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      birthday: "",
      email: "",
      password1: "",
      password2: "",
      page1: true,
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleNextPage = this._handleNextPage.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value.trim(),
    });
  }

  _handleNextPage(e) {
    e.preventDefault();
    const { firstName, lastName, birthday } = this.state;
    if (firstName === "" || lastName === "" || birthday === "") {
    } else {
      this.setState({ page1: false });
    }
    console.log(this.state);
  }

  _handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <section className="section signup-section">
        <div className="bg"></div>
        <div className="row container content">
          <div className="col s12 center-align">
            <div className="text">
              <img src={logo} className="responsive-img logo" alt="logo" />
              <p className="light-blue-text text-accent-4 flow-text">
                Crear una cuenta. Empieza a dar a conocer tus Habilidades y
                ofrece tus servicios
              </p>
              <p className="flow-text">
                ¿Ya tienes cuenta? <a href="#login">Inicia sesión</a>
              </p>
            </div>
            <div className="row">
              <form className="col s12">
                <div className="card-panel">
                  {this.state.page1 ? (
                    <FormPart1
                      handleChange={this._handleChange}
                      handleNextPage={this._handleNextPage}
                    />
                  ) : (
                    <FormPart2
                      handleChange={this._handleChange}
                      handleSubmit={this._handleSubmit}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const FormPart1 = ({ handleChange, handleNextPage }) => (
  <>
    <div className="input-field">
      <input
        id="firstName"
        type="text"
        className="validate"
        placeholder="Nombres"
        required
        onKeyUp={handleChange}
      />
      <label htmlFor="firstName">¿Cuál es tu nombre?</label>
    </div>

    <div className="input-field">
      <input
        id="lastName"
        type="text"
        className="validate"
        placeholder="Apellidos"
        required
        onKeyUp={handleChange}
      />
      <label htmlFor="lastName">¿Cuál es tu apellido?</label>
    </div>

    <div className="input-field">
      <input
        id="birthday"
        type="date"
        className="validate"
        required
        onChange={handleChange}
      />
      <label htmlFor="last_name">¿Cuándo naciste?</label>
    </div>

    <button
      type="submit"
      className="btn light-blue darken-3 waves-effect waves-light"
      onClick={handleNextPage}
    >
      Siguiente
    </button>
  </>
);

const FormPart2 = ({ handleChange, handleSubmit }) => (
  <>
    <div className="input-field">
      <input
        id="email"
        type="email"
        className="validate"
        required
        onChange={handleChange}
      />
      <label htmlFor="email">¿Cuál es tu correo electronico?</label>
    </div>

    <div className="input-field">
      <input
        id="password1"
        type="password"
        className="validate"
        required
        onChange={handleChange}
      />
      <label htmlFor="password1">Crea una contraseña</label>
    </div>

    <div className="input-field">
      <input
        id="password2"
        type="password"
        className="validate"
        required
        onChange={handleChange}
      />
      <label htmlFor="password2">Confuirmar contraseña</label>
    </div>

    <button
      type="submit"
      className="btn light-blue darken-3 waves-effect waves-light"
      onClick={handleSubmit}
    >
      ¡A camellar!
    </button>
  </>
);
export default Signup;

// componentDidMount() {
//   document.addEventListener("DOMContentLoaded", function () {
//     M.updateTextFields();
//   });
// }
