import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import db from "../../services/firebase/dbconfig";
import Loader from "../../components/loader/Loader";

//components
import ProfilePhoto from "./components/ProfilePhoto";
import BasicInfo from "./components/BasicInfo";
import Services from "./components/Services";
import Contact from "./components/Contact";

//css
import "./css/workerprofile.css";
import Navbar from "../../components/navbar/Navbar";

const WorkerProfile = () => {
  const { uid } = useParams();

  const [worker, setWorker] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [found, setFound] = useState(true);
  const [IsOwner, setOwner] = useState(false);

  useEffect(() => {
    getWorker();

    //verifica si el visitante es el dueño del perfil
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.uid === uid) {
          setOwner(true);
        }
      }
    });
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
      <section>
        <Navbar />

        <ProfilePhoto uid={uid} photo={worker.photo} IsOwner={IsOwner} />

        <BasicInfo uid={uid} worker={worker} IsOwner={IsOwner} />

        <Services
          uid={uid}
          photos_services={worker.photos_services}
          IsOwner={IsOwner}
        />

        {!IsOwner && <Contact uid={uid} />}
      </section>
    );
  } else if (!worker && found) {
    return <Loader />;
  } else if (!found) {
    return (
      <h1>
        Ups! <br /> Usuario no encontrado
      </h1>
    );
  }
};

export default WorkerProfile;
