import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../services/firebase/dbconfig";
import Loader from "../../components/loader/Loader";

//components
import ProfilePhoto from "./components/ProfilePhoto";
import BasicInfo from "./components/BasicInfo";
import Services from "./components/Services";

//css
import "./css/workerprofile.css";

const WorkerProfile = () => {
  const { uid } = useParams();

  const [worker, setWorker] = useState(undefined);
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
      <section>
        <ProfilePhoto uid={uid} photo={worker.photo} />

        <BasicInfo uid={uid} worker={worker} />

        <Services uid={uid} photos_services={worker.photos_services} />
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
