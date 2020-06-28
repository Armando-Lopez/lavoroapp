import React from "react";
import logo from "../../logo.png";

const Hire = () => {
  return (
    <div className="container section center-align">
      <img src={logo} alt="logo" />
      <h6 className="black-text center-align">
        Diligencie este formulario y pronto me pondre en contacto.
      </h6>
      <div className="row">
        <form className=" col s12">
          <div className="row">
            <div className="input-field col s6">
              <i class="material-icons prefix">account_circle</i>
              <input
                placeholder="Nombre"
                id="Nombre"
                type="text"
                className="validate"
              />
              <label for="first_name"></label>
            </div>
            <div className="input-field col s6">
              <input
                id="last_name"
                placeholder="Apellido"
                type="text"
                className="validate"
              />
              <label for="last_name"></label>
            </div>
          </div>
          <div className="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">phone</i>
              <input id="icon_telephone" type="tel" class="validate" />
              <label for="icon_telephone">Ingrese su Telefono</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i class="material-icons prefix">email</i>
              <input id="email" type="email" className="validate" />
              <label for="email">Ingrese su correo electronico</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                id="icon_prefix2"
                className="materialize-textarea"
              ></textarea>
              <label for="icon_prefix2">Cuentame sobre el proyecto</label>
            </div>
          </div>
          <button
            class="btn blue waves-effect waves-light"
            type="submit"
            name="action"
          >
            CONTRATAR
            <i class="material-icons right">thumbs_up_down</i>
          </button>
        </form>
      </div>
    </div>
  );
};
export default Hire;
