import React from "react";

const RatingForm = () => {
  return (
    <div className="row container">
      <form className="col s12 ">
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">email</i>
            <input id="email" type="email" className="validate" />
            <label for="email"> Ingresa tu email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">mode_edit</i>
            <textarea
              id="textarea1"
              className="materialize-textarea"
            ></textarea>
            <label for="textarea1">Escribe tu comentario</label>
          </div>
        </div>
        <button className="btn blue accent-4"> Enviar</button>
      </form>
    </div>
  );
};

export default RatingForm;
