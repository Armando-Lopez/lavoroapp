import React, { useState, useEffect } from "react";
import firebase from "firebase";
import db from "../../services/firebase/dbconfig";
import patterbg from "./patterbg.jpg";
import photo_default from "../../photo_default.png";
import closeSession from "./closeSession";

const Sidenav = () => {
    const [uid, setUid] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setEmail(user.email);
                setUid(user.uid);

                db.collection("workers")
                    .doc(user.uid)
                    .get()
                    .then(function (doc) {
                        if (doc.exists) {
                            setUser(doc.data());
                        } else {
                        }
                    })
                    .catch(function (error) {
                        console.log("Error getting user", error);
                    });
            }
        });
    }, []);

    return (
        <>
            <ul className="sidenav" id="sidenav">
                <li>
                    <div className="user-view">
                        <div className="background">
                            <img
                                src={patterbg}
                                className="responsive-img"
                                alt="patternbg"
                            />
                        </div>
                        {user && (
                            <>
                                <img
                                    className="circle"
                                    src={
                                        user && user.photo
                                            ? user.photo
                                            : photo_default
                                    }
                                />
                                <span className="white-text name">
                                    {user && user.first_name}
                                </span>
                                <span className="white-text email">
                                    {email && email}
                                </span>
                            </>
                        )}
                    </div>
                </li>

                <li>
                    <a href="/">
                        <i className="material-icons">home</i>
                        Inicio
                    </a>
                </li>

                {user ? (
                    <>
                        <li>
                            <a href={`/workerprofile/${uid}`}>
                                <i className="material-icons">account_circle</i>
                                Perfil
                            </a>
                        </li>

                        <li>
                            <a href={`/hirings/${uid}`}>
                                <i className="material-icons">fact_check</i>
                                Contrataciones
                            </a>
                        </li>

                        <li>
                            <a onClick={closeSession}>
                                <i className="material-icons">
                                    power_settings_new
                                </i>
                                Cerrar sesión
                            </a>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <a href="/login">
                                <i className="material-icons">login</i>
                                Iniciar sesión
                            </a>
                        </li>
                    </>
                )}
                <div className="divider"></div>

                <li className="hide">
                    <a href="#!">
                        <i className="material-icons">bug_report</i>
                        Reportar un problema
                    </a>
                </li>
            </ul>
        </>
    );
};

export default Sidenav;
