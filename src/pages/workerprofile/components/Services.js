import React, { useState, useEffect } from "react";
import firebase from "firebase";
import db from "../../../services/firebase/dbconfig";
import M from "materialize-css";

const Services = (props) => {
  const [photos_services, setPhotos_services] = useState(props.photos_services);

  const [IsOwner, setOwner] = useState(false);
  //verifica si el visitante es el dueño
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.uid === props.uid) {
          setOwner(true);
        }
      }
    });
  }, []);

  return (
    <div className="row">
      <h3 className="center-align">Servicios</h3>
      {IsOwner && (
        <>
          <div className="col s12">
            <button
              data-target="modal-upload-photo-service"
              className="btn-floating modal-trigger blue accent-2"
            >
              <i className="material-icons">add</i>
            </button>
          </div>
          <ModalUploadPhotoService uid={props.uid} />
        </>
      )}

      <div className="col s12 photos-services">
        <ServicesCarousel photos_services={photos_services} />
      </div>
    </div>
  );
};

const ModalUploadPhotoService = ({ uid }) => {
  const [file, setFile] = useState(null);

  React.useEffect(() => {
    const elem = document.querySelector("#modal-upload-photo-service");
    M.Modal.init(elem, {
      dismissible: false,
      preventScrolling: true,
      inDuration: 100,
      outDuration: 100,
    });
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const fileUrl = await fileRef.getDownloadURL();

        if (fileUrl) {
          const washingtonRef = db.collection("workers").doc(uid);

          washingtonRef.update({
            photos_services: firebase.firestore.FieldValue.arrayUnion(fileUrl),
          });
          M.toast({ html: "Foto añadida con exito!" });
        }
      } catch (error) {
        console.log(error);
        M.toast({ html: "Hubo un error al subir la foto" });
      }
    }
  };

  const cancel = () =>
    document.querySelector("#modal-upload-photo-service form").reset();

  return (
    <div id="modal-upload-photo-service" className="modal modal-upload-service">
      <div className="modal-content center-align">
        <h6>¡Muestranos lo que haces!</h6>

        <p>Añade una foto de tus servicios</p>

        <form onSubmit={handleSubmit}>
          <div className="file-field input-field">
            <div className="btn blue accent-3">
              <i className="material-icons">upload_file</i>
              <input type="file" onChange={handleFileChange} />
            </div>

            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>

          <div className="row">
            <button className="btn green col s6">
              <i className="material-icons">check</i>
            </button>

            <button
              type="button"
              className="btn red col s6 modal-close"
              onClick={cancel}
            >
              <i className="material-icons right-align">cancel</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ServicesCarousel = ({ photos_services }) => {
  useEffect(() => {
    const elems = document.querySelectorAll(".slider");
    M.Slider.init(elems, {
      height: 200,
      interval: 3000,
    });
  }, []);
  return (
    <div className="slider">
      <ul className="slides">
        {photos_services.map((item, index) => {
          return (
            <li key={index}>
              <img
                className="responsive-img materialboxed"
                src={item}
                alt="servicio"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Services;
