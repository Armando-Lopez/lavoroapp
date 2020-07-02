import React, { useState, useEffect } from "react";
import db from "../../../services/firebase/dbconfig";
import M from "materialize-css";
import Loader from "../../../components/loader/Loader";

const BasicInfo = ({ uid, worker, IsOwner }) => {
  //

  return (
    <>
      <div>
        {IsOwner && (
          <>
            <button
              data-target="modal-form-info"
              className="btn-floating blue accent-4 darken-4 modal-trigger right btn-edit-inf"
            >
              <i className="material-icons">edit</i>
            </button>
            <ModalEditInfo uid={uid} worker={worker} />
          </>
        )}
        <h4 className="name">{worker.first_name + " " + worker.last_name}</h4>

        <p className="flow-text">
          {worker.services.map((service, index) => (
            <span
              key={index}
              className="chip blue accent-1 lighten-5 black-text"
            >
              {service}
            </span>
          ))}
        </p>

        <p className="flow-text">
          {worker.description ? worker.description : "Sin descripción"}
        </p>
      </div>

      <div className="divider"></div>
    </>
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
              <h6>Aún no puedes editar tu nombre</h6>
              <input
                disabled
                defaultValue={worker.first_name + " " + worker.last_name}
                id="disabled"
                type="text"
                className="validate"
              />
            </div>

            <div className="input-field col s12 left-align">
              <h6>
                ¿cuáles son tus habilidades? <br /> Agregalas separando cada una
                por comas (,)
              </h6>
              <textarea
                name="services"
                id="services"
                className="materialize-textarea"
                defaultValue={services.map((service) => `${service}`)}
                onChange={handleInputServices}
              ></textarea>

              <p className="serices-preview">
                {services.map((service, index) => (
                  <span
                    key={index}
                    className="service-item chip blue accent-1 lighten-5 black-text"
                  >{`${service} `}</span>
                ))}
              </p>
            </div>

            <div className="input-field col s12 left-align">
              <h6>
                Añade una breve descripción de ti y los servicios que ofreces
              </h6>
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
