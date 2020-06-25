import React from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

//firebase
import firebase from "firebase";
import db from "../../../services/firebase/dbconfig";

import M from "materialize-css";

const SignupForm = () => {
  const { register, errors, handleSubmit } = useForm();

  const initialUserData = {
    first_name: "",
    last_name: "",
    birthday: "",
    description: "",
    services: [],
  };

  const onSubmit = (data) => {
    if (data) {
      if (data.password === data.password2) {
        registrar(data);
      } else {
        M.toast({ html: "Las contraseñas no coinciden" });
      }
    }
  };

  const registrar = (data) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async (cred) => {
        await db.collection("workers").doc(cred.user.uid).set(initialUserData);
        autilogin(data);
      })
      .catch((error) => {
        M.toast({ html: error.code });
        M.toast({ html: error.message });
      });
  };

  const autilogin = (data) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((cred) => {
        console.log(cred);
        M.toast({
          html: "Usuario creado exitosamente",
          completeCallback: function () {
            window.location.href = `/profile/${cred.user.uid}`;
          },
        });
      })
      .catch((error) => {
        M.toast({ html: error.code });
        M.toast({ html: error.message });
      });
  };

  return (
    <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
      <div className="card-panel">
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
          <span className="helper-text red-text">
            {errors?.password?.message}
          </span>
        </div>

        <div className="input-field">
          <input
            type="password"
            id="password2"
            name="password2"
            className="validate"
            ref={register({
              required: { value: true, message: "Contraseña requerida" },
              minLength: { value: 5, message: "Minimo 5 caracteres" },
            })}
          />
          <label htmlFor="password2">Confirma tu contraseña</label>
          <span className="helper-text red-text">
            {errors?.password2?.message}
          </span>
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

export default SignupForm;
