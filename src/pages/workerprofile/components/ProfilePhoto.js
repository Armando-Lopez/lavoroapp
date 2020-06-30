import React, { useState } from "react";
import firebase from "firebase";
import db from "../../../services/firebase/dbconfig";
import default_photo from "../../../photo_default.png";
import M from "materialize-css";
import Loader from "../../../components/loader/Loader";

const ProfilePhoto = ({ uid, photo, IsOwner }) => {
  //
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlefileChange = (e) => setFile(e.target.files[0]);

  //sube la foto
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        setLoading(true);
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);

        //guarda la direccio del url de la foto
        const fileURL = await fileRef.getDownloadURL();

        if (fileURL) {
          updatePhoto(fileURL);
        }
      } catch (error) {
        console.log(error);
        M.toast({ html: "Ha ocurrido un error" });
      }
    }
  };

  //actualiza fato del trabajador
  const updatePhoto = async (fileURL) => {
    const washingtonRef = db.collection("workers").doc(uid);
    try {
      await washingtonRef.update({ photo: fileURL });
      M.toast({ html: "Foto actualizada" });
      setLoading(false);
      document.getElementById("photo").src = fileURL;
    } catch (error) {
      M.toast({ html: "Ocurrió un error" });
      console.error("Error updating document: ", error);
    }
  };

  const cancel = () => document.querySelector(".form-photo").reset();

  return (
    <>
      {loading && <Loader />}
      <div className="row section">
        <div className="photo-container col s12 center-align">
          <img
            id="photo"
            src={photo ? photo : default_photo}
            className="responsive-img circle"
            alt="userphoto"
          />
          {IsOwner && (
            <>
              <button
                data-target="modal-change-photo"
                className="btn-floating modal-trigger left-align blue btn-cambiar-foto"
              >
                <i className="material-icons">camera_alt</i>
              </button>

              <ModalChangePhoto
                handlefileChange={handlefileChange}
                handleSubmit={handleSubmit}
                cancel={cancel}
              />
            </>
          )}
        </div>

        <div className="divider"></div>
      </div>
    </>
  );
};

const ModalChangePhoto = ({ handlefileChange, handleSubmit, cancel }) => {
  React.useEffect(() => {
    const elem = document.querySelector("#modal-change-photo");
    M.Modal.init(elem, { dismissible: false });
  }, []);

  return (
    <>
      <div id="modal-change-photo" className="modal modal-photo">
        <div className="modal-content">
          <p>Selecciona tu nueva Foto</p>

          <form className="form-photo" onSubmit={handleSubmit} method="post">
            <div className="file-field input-field">
              <div className="btn blue">
                <i className="material-icons">upload_file</i>
                <input type="file" onChange={handlefileChange} />
              </div>

              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
            <button className="col s6 btn green modal-close waves-effect waves-light">
              <i className="material-icons">check</i>
            </button>

            <button
              type="button"
              className="col s6 btn red modal-close waves-effect waves-light"
              onClick={cancel}
            >
              <i className="material-icons">cancel</i>
            </button>
          </form>
        </div>
        <div className="modal-footer"></div>
      </div>
    </>
  );
};

export default ProfilePhoto;
