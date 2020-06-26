import React, { useState, useEffect } from "react";
import db from "../../../services/firebase/dbconfig";
import M from "materialize-css";

const BasicInfo = ({ uid, worker }) => {
  //

  useEffect(() => {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems);
  });

  return (
    <div className="row">
      <div className="col s12 basic-info">
        <button
          data-target="modal-form-info"
          className="btn-floating modal-trigger btn-edit-info"
        >
          <i className="material-icons">edit</i>
        </button>

        <div>
          <h4 className="name">{worker.first_name + " " + worker.last_name}</h4>

          <ul className="serices-preview">
            {worker.services.map((service, index) => (
              <li key={index} className="service-item">{`${service} `}</li>
            ))}
          </ul>

          <p className="description">
            {worker.description ? worker.description : "Sin descripción"}
          </p>
        </div>

        <ModalEditInfo uid={uid} worker={worker} />

        <div className="divider"></div>
      </div>
    </div>
  );
};

export default BasicInfo;

//editart
const ModalEditInfo = ({ uid, worker }) => {
  //
  const [services, setServices] = useState(worker.services);
  const [description, setDescription] = useState(worker.description);

  useEffect(() => {
    // const elems = document.querySelectorAll(".modal-form-info");
    // M.Modal.init(elems, { dismissible: true });
  }, []);

  const handleInputServices = (ev) => {
    const servicesList = ev.target.value
      .trim()
      .split(",")
      .filter((service) => service.trim() !== "");
    setServices(servicesList);
  };

  const handleInputDescription = (e) => {
    setDescription(e.target.value.trim());
  };

  const save = async () => {
    try {
      const washingtonRef = db.collection("workers").doc(uid);
      await washingtonRef.update({
        services: services,
        description: description,
      });
      M.toast({ html: "Datos actualizados" });
      window.location.reload();
    } catch (error) {
      console.log(error);
      M.toast({ html: "Hubo un error al actulizar" });
    }
  };

  return (
    <div id="modal-form-info" className="modal">
      <div className="modal-content">
        <div className="row">
          <h6>Edita tu información básica</h6>
          <div className="input-field col s12 left-align">
            <span>Aún no puedes editar tu nombre</span>
            <input
              disabled
              defaultValue={worker.first_name + " " + worker.last_name}
              id="disabled"
              type="text"
              className="validate"
            />
          </div>

          <div className="input-field col s12 left-align">
            <span>
              Añande los servicios que ofreces, cada uno separados por coma(,)
            </span>
            <textarea
              name="services"
              id="services"
              className="materialize-textarea"
              defaultValue={services.map((service) => `${service}, `)}
              onChange={handleInputServices}
            ></textarea>

            <ul className="serices-preview">
              {services.map((service, index) => (
                <li key={index} className="service-item">{`${service} `}</li>
              ))}
            </ul>
          </div>

          <div className="input-field col s12 left-align">
            <span>Añade una breve descripción de ti, y tus servicios</span>
            <textarea
              name="description"
              id="description"
              className="materialize-textarea"
              defaultValue={description}
              onChange={handleInputDescription}
            ></textarea>
          </div>
        </div>

        <button
          className="btn modal-close blue waves-effect waves-light white-text"
          onClick={save}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
