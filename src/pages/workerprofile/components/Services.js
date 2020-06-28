import React, { useState, useEffect } from "react";
import firebase from "firebase";
import db from "../../../services/firebase/dbconfig";
import M from "materialize-css";
import Loader from "../../../components/loader/Loader";

const Services = (props) => {
  const [photos_services, setPhotos_services] = useState(props.photos_services);

  return (
    <div className="row">
      <h3 className="center-align">Servicios</h3>
      {props.IsOwner && (
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

const ServicesCarousel = ({ photos_services }) => {
  useEffect(() => {
    const elem = document.querySelector(".carousel-services");
    M.Carousel.init(elem, {
      indicators: true,
      dist: -150,
      numVisible: 3,
    });

    const carroselinterval = setInterval(() => {
      M.Carousel.getInstance(elem).next(1);
    }, 5000);

    return () => {
      clearInterval(carroselinterval);
    };
  }, []);
  return (
    <ul className="carousel carousel-slider carousel-services">
      {photos_services.map((item, index) => {
        return (
          <a key={index}>
            <img
              className="responsive-img carousel-item"
              src={item}
              alt="servicio"
            />
          </a>
        );
      })}
    </ul>
  );
};

export default Services;
