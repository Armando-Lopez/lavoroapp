import React, { useState, useEffect } from "react";
import firebase from "firebase";
import db from "../../../services/firebase/dbconfig";
import M from "materialize-css";
import Loader from "../../../components/loader/Loader";

const Services = ({ uid, photos_services, isOwner }) => {
  return (
    <div className="row">
      {isOwner && (
        <>
          <div className="col s12">
            <button
              data-target="modal-upload-photo-service"
              className="btn-floating modal-trigger blue accent-2"
            >
              <i className="material-icons">add</i>
            </button>
          </div>
          <ModalUploadPhotoService uid={uid} />
        </>
      )}

      <div className="col s12 photos-services">
        <ServicesPhotos photos_services={photos_services} IsOwner={isOwner} />
      </div>
    </div>
  );
};

const ModalUploadPhotoService = ({ uid }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
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
          setLoading(false);
          window.location.reload();
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        M.toast({ html: "Hubo un error al subir la foto" });
      }
    }
  };

  const cancel = () =>
    document.querySelector("#modal-upload-photo-service form").reset();

  return (
    <>
      {loading && <Loader />}
      <div
        id="modal-upload-photo-service"
        className="modal modal-upload-service"
      >
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
              <button className="btn green col s6 modal-close">
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
    </>
  );
};

const ServicesPhotos = ({ photos_services, isOwner }) => {
  const message = isOwner
    ? "No has subido ninguna foto. Presiona el botón de agregar y muestranos lo que haces."
    : "Este usuario no ha subido fotos de sus servicios";

  useEffect(() => {
    const elem = document.querySelectorAll(".materialboxed");
    M.Materialbox.init(elem);
  }, []);

  return (
    <>
      <h4 className="center-align">
        {photos_services.length > 0 ? "Servicios" : message}
      </h4>
      <div className="services-cnt">
        {photos_services.map((item, index) => {
          return (
            <div className="card center-align z-depth-2 service" key={index}>
              <img
                src={item}
                className="responsive-img center materialboxed"
                alt="servicio"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Services;
