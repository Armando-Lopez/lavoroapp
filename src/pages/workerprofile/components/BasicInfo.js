import React, { useState, useEffect } from "react";
import db from "../../../services/firebase/dbconfig";
import M from "materialize-css";
import Loader from "../../../components/loader/Loader";

const BasicInfo = ({ uid, worker, IsOwner }) => {
  //

  return (
    <div className="col s12 basic-info">
      <div>
        <h4 className="name">{worker.first_name + " " + worker.last_name}</h4>

        <p className="serices-preview">
          {worker.services.map((service, index) => (
            <span key={index} className="chips">{`${service} `}</span>
          ))}
        </p>

        {/* <br /> */}

        <p className="description">
          {worker.description ? worker.description : "Sin descripción"}
        </p>
      </div>

      {IsOwner && (
        <>
          <button
            data-target="modal-form-info"
            className="btn-floating blue modal-trigger btn-edit-info"
          >
            <i className="material-icons">edit</i>
          </button>

          <ModalEditInfo uid={uid} worker={worker} />
        </>
      )}

      <div className="divider"></div>
    </div>
  );
};

//editart
const ModalEditInfo = ({ uid, worker }) => {
  //
  const [services, setServices] = useState(worker.services);
  const [description, setDescription] = useState(worker.description);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const elem = document.querySelector("#modal-form-info");
    M.Modal.init(elem, {
      dismissible: false,
      preventScrolling: true,
      inDuration: 100,
      outDuration: 100,
    });
  }, []);

  const handleInputServices = (ev) => {
    const servicesList = ev.target.value //obtiene las habilidades del formulario
      .trim() //recorta espacios
      .split(",") //convierte el texto en un array, separa al encontar comas
      .filter((service) => service.trim() !== ""); //no evita los espacio en blanco
    setServices(servicesList); //añade el array al estado
  };

  const handleInputDescription = (e) => setDescription(e.target.value.trim());

  const save = async () => {
    setLoading(true);
    try {
      const washingtonRef = db.collection("workers").doc(uid);
      await washingtonRef.update({
        services: services,
        description: description,
      });
      M.toast({ html: "Datos actualizados" });
      // window.location.reload();
    } catch (error) {
      console.log(error);
      M.toast({ html: "Hubo un error al actulizar" });
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <div id="modal-form-info" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5>Edita tu información básica</h5>
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
                defaultValue={services.map((service) => `${service}`)}
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
            className="btn modal-close green waves-effect waves-light white-text"
            onClick={save}
          >
            Guardar
          </button>
          <button className="btn modal-close red waves-effect waves-light white-text">
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
