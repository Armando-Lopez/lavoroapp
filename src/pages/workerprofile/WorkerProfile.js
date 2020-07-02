import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import db from "../../services/firebase/dbconfig";
import Loader from "../../components/loader/Loader";

//components
import Navbar from "../../components/navbar/Navbar";
import ProfilePhoto from "./components/ProfilePhoto";
import BasicInfo from "./components/BasicInfo";
import Services from "./components/Services";
import Contact from "./components/Contact";
import PageNotFound from "../notfound/PageNotFound";

//css
import "./css/workerprofile.css";

const WorkerProfile = () => {
  const { uid } = useParams();

  const [worker, setWorker] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [found, setFound] = useState(true);
  const [IsOwner, setOwner] = useState(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    //verifica si el visitante es el dueño del perfil
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.uid === uid) {
          setOwner(true);
        }
      }
    });
  }, []);

  if (worker && loaded && found) {
    return (
      <section className="blue accent-1" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div
          className="row center-align light-blue lighten-5"
          style={{ marginBottom: "0" }}
        >
          <div
            className="col s12 m10 offset-m1 white z-depth-5"
            style={{ borderRadius: "5px", minHeight: "100vh" }}
          >
            <div className="row section">
              <div className="col s12 m6 l4 offset-m3 center-align section">
                <ProfilePhoto
                  uid={uid}
                  photo={worker.photo}
                  IsOwner={IsOwner}
                />
              </div>

              <div className="col s12 l7 basic-info">
                <BasicInfo uid={uid} worker={worker} IsOwner={IsOwner} />
              </div>

              <div className="col s12">
                <Services
                  uid={uid}
                  photos_services={worker.photos_services}
                  isOwner={IsOwner}
                />
              </div>
            </div>
          </div>
        </div>

        {!IsOwner && <Contact uid={uid} />}
      </section>
    );
  } else if (!worker && found) {
    return <Loader />;
  } else if (!found) {
    return <PageNotFound />;
  }
};

export default WorkerProfile;
