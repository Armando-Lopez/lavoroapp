import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../services/firebase/dbconfig";
import Loader from "../../components/Loader";
import M from "materialize-css";

const WorkerProfile = () => {
  const { uid } = useParams();
  const [worker, setWorker] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [found, setFound] = useState(true);

  useEffect(() => {
    getWorker();
  }, []);

  const getWorker = () => {
    db.collection("workers")
      .doc(uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setLoaded(true);
          setWorker(doc.data());
        } else {
          setFound(false);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  if (worker && loaded && found) {
    return (
      <section className="row">
        <div className="col s12 center-align">
          <div className="photo">
            <img
              src="https://source.unsplash.com/random"
              className="responsive-img"
              alt="userphoto"
            />
          </div>

          <div className="row info">
            <div className="col s1">
              <EditInfo worker={worker} id={uid} />
            </div>
            <div className="col s11">
              <h3 className="name">
                {worker.first_name + " " + worker.last_name}
              </h3>

              <p className="services">
                {worker.services
                  ? worker.services.map((service) => service + ". ")
                  : ""}
              </p>

              <p className="description">{worker.description}</p>
            </div>
          </div>

          <div className="services-info"></div>
        </div>
      </section>
    );
  } else if (!loaded && found) {
    return <Loader />;
  } else if (!found) {
    return <h1>not found</h1>;
  }
};

//editart
const EditInfo = ({ id, worker }) => {
  const [data, setData] = useState({ services: "", description: "" });

  useEffect(() => {
    var elems = document.querySelectorAll(".modalinfo");
    M.Modal.init(elems);
  }, []);

  const handleInputChange = (ev) => {
    setData({
      ...data,
      [ev.target.name]: ev.target.value.trim(),
    });
  };

  const edit = async () => {
    console.log("editing");

    const washingtonRef = db.collection("workers").doc(id);

    // Set the "capital" field of the city 'DC'
    data.services = data.services.split(",");

    try {
      await washingtonRef.update(data);
      M.toast({ html: "Datos actualizados" });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      console.log("Document successfully updated!");
    } catch (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    }
  };

  return (
    <>
      <a className="btn-floating red modal-trigger" href="#modalinfo">
        <i className="material-icons">mode_edit</i>
      </a>

      <div id="modalinfo" className="modal modalinfo">
        <div className="modal-content">
          <div className="row">
            <h6>Edita tu información básica</h6>
            <div className="input-field col s12 left-align">
              <span>No puedes editar tu nombre</span>
              <input
                disabled
                value={worker.first_name + " " + worker.last_name}
                id="disabled"
                type="text"
                className="validate"
                onChange={handleInputChange}
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
                defaultValue={
                  worker.services
                    ? worker.services.map((service) => service)
                    : ""
                }
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="input-field col s12 left-align">
              <span>Añade una breve descripción de ti, y tus servicios</span>
              <textarea
                name="description"
                id="description"
                className="materialize-textarea"
                defaultValue={worker.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <button
            className="btn blue waves-effect waves-green white-text"
            onClick={edit}
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  );
};

export default WorkerProfile;
