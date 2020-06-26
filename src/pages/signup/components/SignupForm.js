import React from "react";
import { useForm } from "react-hook-form";

//firebase
import firebase from "firebase";
import db from "../../../services/firebase/dbconfig";

//inicializador js para materialze
import M from "materialize-css";

const SignupForm = () => {
  //validador de formualrio
  const { register, errors, handleSubmit } = useForm();

  //validas si las contraseñas son iguales
  const onSubmit = (data) => {
    if (data) {
      if (data.password === data.password2) {
        registrar(data); // llama a la funcion para registrar
      } else {
        M.toast({ html: "Las contraseñas no coinciden" });
      }
    }
  };

  //registra al usuario en firebase
  const registrar = (data) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((cred) => {
        createWorkerDB(cred, data);
      })
      .catch((error) => {
        //errores al registrar al usuario
        M.toast({ html: error.code });
        M.toast({ html: error.message });
      });
  };

  const createWorkerDB = async (cred, data) => {
    try {
      //despues del registro crea una colleccion para los datos basicos del usuario
      await db.collection("workers").doc(cred.user.uid).set({
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
        birthday: data.birthday.trim(),
        photo: "",
        description: "",
        services: [],
      });
      autilogin(data); //llama a la funcion de autologgear al usuario
    } catch (error) {
      //errorers al crear la coleccion de datos
      console.log(error);

      M.toast({ html: error.code });
      M.toast({ html: error.message });
    }
  };

  //autologgeado
  const autilogin = (data) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((cred) => {
        //mensaje de exito
        M.toast({
          html: "Usuario creado exitosamente",
          completeCallback: function () {
            //redirecciona al usuario a su perfil para continuar con la configuracion de su perfil
            window.location.href = `/workerprofile/${cred.user.uid}`;
            localStorage.setItem("new_worker", cred.user.uid);
          },
        });
      })
      .catch((error) => {
        //errores al autologgear
        M.toast({ html: error.code });
        M.toast({ html: error.message });
      });
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
