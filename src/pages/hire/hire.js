import React from "react";
import logo from "../../logo.png";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import db from "../../services/firebase/dbconfig";
import firebase from "firebase";
import M from "materialize-css";
import Navbar from "../../components/navbar/Navbar";

const Hire = () => {
  const { uid } = useParams();
  const { register, errors, handleSubmit } = useForm();

  const onsubmit = (data) => {
    db.collection("hirings")
      .add({
        to: uid,
        seen: false,
        title: `Solicitud de ${data.first_name + " " + data.last_name}`,
        body: data,
      })
      .then((res) => {
        M.toast({
          html:
            "La Solicitud envida con exito. Puedes volver <button class='btn-flat toast-action' onClick='window.history.back()'>Volver</button>",
          displayLength: 1000 * 10,
        });
      })
      .catch((error) => {
        console.log(error);
        M.toast({
          html:
            "Ha ocurrido un error al enviar la solicitud. Intentalo más tarde",
        });
        M.toast({
          html: error,
        });
      });
  };
  return (
    <section className="blue accent-1 lighten-1">
      <Navbar />
      <div className="container section center-align white">
        <img src={logo} alt="logo" />
        <h5 className="black-text center-align">
          Diligencia este formulario y pronto me pondré en contacto.
        </h5>
        <div className="row">
          <form className=" col s12" onSubmit={handleSubmit(onsubmit)}>
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">account_circle</i>
                <input
                  name="first_name"
                  placeholder="Nombre"
                  id="first_name"
                  type="text"
                  className="validate"
                  ref={register({
                    required: { value: true, message: "valor requerido" },
                    minLength: {
                      value: 3,
                      message: "se requieren minimo 3 caracteres",
                    },
                    maxLength: { value: 21, message: "maximo 21 caracteres" },
                  })}
                />
                <label htmlFor="first_name"></label>
                <span className="helper-text red-text">
                  {errors?.first_name?.message}
                </span>
              </div>
              <div className="input-field col s6">
                <input
                  name="last_name"
                  id="last_name"
                  placeholder="Apellido"
                  type="text"
                  className="validate"
                  ref={register({
                    required: { value: true, message: "valor requerido" },
                    minLength: {
                      value: 3,
                      message: "se requieren minimo 3 caracteres",
                    },
                    maxLength: { value: 21, message: "maximo 21 caracteres" },
                  })}
                />
                <label htmlFor="last_name"></label>
                <span className="helper-text red-text">
                  {errors?.last_name?.message}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">phone</i>
                <input
                  name="telephone"
                  id="telephone"
                  type="number"
                  className="validate"
                  ref={register({
                    required: { value: true, message: "valor requerido" },
                    minLength: {
                      value: 7,
                      message: "se requieren minimo 7 caracteres",
                    },
                    maxLength: { value: 10, message: "maximo 10 caracteres" },
                  })}
                />
                <label htmlFor="telephone">Ingrese su Telefono</label>
                <span className="helper-text red-text">
                  {errors?.telephone?.message}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input
                  name="email"
                  id="email"
                  type="email"
                  className="validate"
                  ref={register({
                    required: { value: true, message: "valor requerido" },
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: " El email no es valido",
                    },
                  })}
                />
                <label htmlFor="email">Ingrese su correo electronico</label>
                <span className="helper-text red-text">
                  {errors?.email?.message}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">mode_edit</i>
                <textarea
                  name="description"
                  id="description"
                  className="materialize-textarea"
                  ref={register({
                    required: { value: false },
                  })}
                ></textarea>
                <label htmlFor="description">
                  Cuentame en qué puedo ayudarte
                </label>
              </div>
            </div>
            <button
              className="btn blue waves-effect waves-light"
              type="submit"
              name="action"
            >
              CONTRATAR
              <i className="material-icons right">thumbs_up_down</i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Hire;
