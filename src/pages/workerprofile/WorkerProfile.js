import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import db from "../../services/firebase/dbconfig";
import Loader from "../../components/loader/Loader";
import Navbar from "../../components/navbar/Navbar";
import ProfilePhoto from "./components/ProfilePhoto";
import BasicInfo from "./components/basic-info/BasicInfo";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Rating from "./components/Ratings";
import ShowRatings from "./components/evaluation-servis/ShowRatings";
import PageNotFound from "../notfound/PageNotFound";
import "./css/workerprofile.css";

const WorkerProfile = () => {
    const { uid } = useParams();

    const [worker, setWorker] = useState(undefined);
    const [loaded, setLoaded] = useState(false);
    const [found, setFound] = useState(true);
    const [isOwner, setOwner] = useState(false);
    const [tab, setTab] = useState("services");

    useEffect(() => {
        const workerRef = db.collection("workers").doc(uid);

        workerRef
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

        workerRef.onSnapshot((snap) => {
            if (snap.data()) {
                setWorker(snap.data());
            }
        });
    }, [uid]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if (user.uid === uid) {
                    setOwner(true);
                }
            }
        });
    }, [uid]);

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
                                    isOwner={isOwner}
                                />
                            </div>

                            <div className="col s12 l7 basic-info">
                                <BasicInfo
                                    uid={uid}
                                    worker={worker}
                                    isOwner={isOwner}
                                />
                            </div>

                            <div
                                className="col s12 m10 offset-m1 section"
                                style={{ marginTop: "2em" }}
                            >
                                <ul id="tabs-swipe-demo" className="tabs">
                                    <li
                                        className={`tab col s6 blue blue-grey-text  ${
                                            tab === "services"
                                                ? "lighten-3"
                                                : "lighten-5"
                                        } `}
                                    >
                                        <a
                                            className="blue-grey-text text-darken-3"
                                            href="#!"
                                            onClick={() => {
                                                setTab("services");
                                            }}
                                        >
                                            Servicios
                                        </a>
                                    </li>
                                    <li
                                        className={`tab col s6 blue blue-grey-text  ${
                                            tab === "ratings"
                                                ? "lighten-3"
                                                : "lighten-5"
                                        } `}
                                    >
                                        <a
                                            className="blue-grey-text text-darken-3"
                                            href="#!"
                                            onClick={() => {
                                                setTab("ratings");
                                            }}
                                        >
                                            Calificaciones
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col s12">
                                {tab === "services" ? (
                                    <Services
                                        uid={uid}
                                        photos_services={worker.photos_services}
                                        first_name={worker.first_name}
                                        isOwner={isOwner}
                                    />
                                ) : (
                                    <>
                                        {!isOwner && (
                                            <Rating
                                                uid={uid}
                                                first_name={worker.first_name}
                                            />
                                        )}
                                        <ShowRatings uid={uid} />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {!isOwner && <Contact uid={uid} />}
            </section>
        );
    } else if (!worker && found) {
        return <Loader />;
    } else if (!found) {
        return <PageNotFound />;
    } else {
        return null;
    }
};

export default WorkerProfile;
