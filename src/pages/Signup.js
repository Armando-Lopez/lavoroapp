import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../logo.png";
import db from "../services/firebase/dbconfig";
import Session from "../services/localStorageService";
import { Redirect } from "react-router-dom";

const Intro = () => (
  <div className="text">
    <img src={logo} className="responsive-img logo" alt="logo" />
    <p className="light-blue-text text-accent-4 flow-text">
      Crear una cuenta. Empieza a dar a conocer tus Habilidades y ofrece tus
      servicios.
    </p>
    <p className="flow-text">
      ¿Ya tienes cuenta? <a href="#login">Inicia sesión</a>
    </p>
  </div>
);

const SignupForm = () => {
  const { register, errors, handleSubmit } = useForm();

  const [workerData, setData] = useState({});

  const onSubmit = (data) => {
    data.role = "worker";
    data.services = [];
    data.photo = "";

    setData({
      ...workerData,
      role: "worker",
      first_name: data.first_name,
      last_name: data.last_name,
      description: "",
      birthday: data.birthday,
      email: data.email,
      password: data.password,
      services: [],
    });

    if (data) {
      db.collection("workers")
        .add(data)
        .then(function (docRef) {
          // console.log("Document written with ID: ", docRef.id);
          Session.create(docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    }
  };

  return (
    <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
      <div className="card-panel">
        <div className="input-field">
          <input
            name="first_name"
            type="text"
            className="validate"
            placeholder="Nombres"
            ref={register({
              required: { value: true, message: "El nombre es requerido" },
              minLength: { value: 3, message: "Minimo 3 caracteres" },
              maxLength: { value: 25, message: "Minimo 25 caracteres" },
            })}
            autoComplete="off"
          />
          <label htmlFor="first_name">¿Cuál es tu nombre?</label>
          <span className="helper-text red-text">
            {errors?.first_name?.message}
          </span>
        </div>

        <div className="input-field">
          <input
            name="last_name"
            type="text"
            className="validate"
            placeholder="Apellidos"
            ref={register({
              required: { value: true, message: "El apellido es requerido" },
              minLength: { value: 5, message: "Minimo 3 caracteres" },
              maxLength: { value: 25, message: "Minimo 25 caracteres" },
            })}
            autoComplete="off"
          />
          <label htmlFor="last_name">¿Cuál es tu apellido?</label>
          <span className="helper-text red-text">
            {errors?.last_name?.message}
          </span>
        </div>

        <div className="input-field">
          <input
            name="birthday"
            type="date"
            className="validate"
            ref={register({
              required: {
                value: true,
                message: "Fecha de nacimiento requerida",
              },
            })}
          />
          <label htmlFor="last_name">¿Cuándo naciste?</label>
          <span className="helper-text red-text">
            {errors?.birthday?.message}
          </span>
        </div>

        <div className="input-field">
          <input
            type="email"
            id="email"
            name="email"
            className="validate"
            ref={register({
              required: {
                value: true,
                message: "Correo requerido",
              },
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Correo no valido",
              },
            })}
          />
          <label htmlFor="email">¿Cuál es tu correo electronico?</label>
          <span className="helper-text red-text">{errors?.email?.message}</span>
        </div>

        <div className="input-field">
          <input
            type="password"
            id="password"
            name="password"
            className="validate"
            ref={register({
              required: { value: true, message: "Contraseña requerida" },
              minLength: { value: 5, message: "Minimo 5 caracteres" },
            })}
          />
          <label htmlFor="password">Crea una contraseña</label>
        </div>

        <button
          type="submit"
          className="btn light-blue darken-3 waves-effect waves-light"
        >
          ¡A camellar!
        </button>
      </div>
    </form>
  );
};

const WorkerSignupSection = () => {
  if (Session.getCurrent()) {
    return <Redirect to="/" />;
  }
  return (
    <section className="section signup-section">
      <div className="bg"></div>
      <div className="row container content">
        <div className="col s12 center-align">
          <Intro />
          <div className="row">
            <SignupForm />
          </div>
        </div>
      </div>
    </section>
  );
};
export default WorkerSignupSection;
