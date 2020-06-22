import React, { useState } from "react";
import logo from "../logo.png";
import Worker from "../services/workerServices";
import M from "materialize-css";

const Signup = () => {
  const [worker, fillWorker] = useState({
    role: "worker",
    first_name: "",
    last_name: "",
    birthday: "",
    email: "",
    password: "",
  });
  const [passwords, setPasswords] = useState({ password1: "", password2: "" });
  const [page, changePage] = useState(1);

  const _handleChange = (e) => {
    if (e.target.id === "password1" || e.target.id === "password2") {
      setPasswords({
        ...passwords,
        [e.target.id]: e.target.value.trim(),
      });
    } else {
      fillWorker({
        ...worker,
        [e.target.id]: e.target.value.trim(),
      });
    }
  };

  const _handleNextPage = (e) => {
    e.preventDefault();
    const { first_name, last_name, birthday } = worker;
    let minlength = 3;
    if (
      first_name.length <= minlength ||
      last_name.length <= minlength ||
      birthday === ""
    ) {
      M.toast({ html: "Hay datos no validos" });
    } else {
      changePage(2);
    }
  };

  const _handleSubmit = (e) => {
    e.preventDefault();
    const { password1, password2 } = passwords;
    if (worker.email === "") {
      M.toast({ html: "Email vacio" });
    } else if (password1 !== password2) {
      M.toast({ html: "Las contraseñas no coinciden" });
    } else {
      fillWorker({
        ...worker,
        password: password1,
      });

      if (worker.password !== "") {
        Worker.create(worker);
      }
    }
  };

  return (
    <section className="section signup-section">
      <div className="bg"></div>
      <div className="row container content">
        <div className="col s12 center-align">
          <div className="text">
            <img src={logo} className="responsive-img logo" alt="logo" />
            <p className="light-blue-text text-accent-4 flow-text">
              Crear una cuenta. Empieza a dar a conocer tus Habilidades y ofrece
              tus servicios.
            </p>
            <p className="flow-text">
              ¿Ya tienes cuenta? <a href="#login">Inicia sesión</a>
            </p>
          </div>
          <div className="row">
            <form className="col s12">
              <div className="card-panel">
                {page === 1 ? (
                  <FormPart1
                    handleChange={_handleChange}
                    handleNextPage={_handleNextPage}
                  />
                ) : (
                  <FormPart2
                    handleChange={_handleChange}
                    handleSubmit={_handleSubmit}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const FormPart1 = ({ handleChange, handleNextPage }) => (
  <>
    <div className="input-field">
      <input
        id="first_name"
        type="text"
        className="validate"
        placeholder="Nombres"
        required
        onKeyUp={handleChange}
        autoComplete="off"
      />
      <label htmlFor="first_name">¿Cuál es tu nombre?</label>
    </div>

    <div className="input-field">
      <input
        id="last_name"
        type="text"
        className="validate"
        placeholder="Apellidos"
        required
        onKeyUp={handleChange}
        autoComplete="off"
      />
      <label htmlFor="last_name">¿Cuál es tu apellido?</label>
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
