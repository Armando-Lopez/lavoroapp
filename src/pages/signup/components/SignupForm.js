import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from "firebase";
import db from "../../../services/firebase/dbconfig";
import M from "materialize-css";
import Loader from "../../../components/loader/Loader";

const SignupForm = () => {
    const { register, errors, handleSubmit } = useForm();

    const [isLoading, setLoading] = useState(false);
    const [hasSignup, setSignup] = useState(undefined);
    const [loginError, setLoginError] = useState(false);

    const onSubmit = (data) => {
        if (data) {
            if (data.password === data.password2) {
                setLoading(true);
                registrar(data);
            } else {
                M.toast({ html: "Las contraseñas no coinciden" });
            }
        }
    };

    const registrar = (data) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then((cred) => {
                createWorkerDB(cred, data);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                if (error.code === "auth/email-already-in-use") {
                    M.toast({ html: "Correo usado por otro usuario" });
                }
                M.toast({ html: error.message });
            });
    };

    const createWorkerDB = async (cred, data) => {
        try {
            await db.collection("workers").doc(cred.user.uid).set({
                first_name: data.first_name.trim(),
                last_name: data.last_name.trim(),
                birthday: data.birthday.trim(),
                photo: "",
                description: "",
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
                services: [],
                photos_services: [],
                unseen_hiring_requests: 0,
            });
            autiLogin(data);
        } catch (error) {
            setLoading(false);
            console.log(error);
            M.toast({ html: "Hubo un error al crear la base de datos" });
            M.toast({ html: error.message });
        }
    };

    const autiLogin = (data) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then((cred) => {
                M.toast({
                    html: "Usuario creado exitosamente",
                    completeCallback: function () {
                        setSignup(cred.user.uid);
                        createFirstNotification(cred.user.uid);
                    },
                });
            })
            .catch((error) => {
                setLoading(false);
                M.toast({ html: error.code });
                M.toast({ html: error.message });
                M.toast({ html: "Hubo un error al iniciar sesión" });
                setLoginError(true);
            });
    };

    const createFirstNotification = async (uid) => {
        try {
            const notificationsRef = db.collection("notifications").doc(uid);
            const res = await notificationsRef.set({
                wasOpen: false,
                notifications: firebase.firestore.FieldValue.arrayUnion({
                    seen: false,
                    link: `/workerprofile/${uid}`,
                    title:
                        "Te damos la bienvenida a LavoroApp. Personaliza tu perfil y empieza ofrecer tus servicios.",
                }),
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    if (hasSignup) {
        return <Redirect to="/" />;
    }
    if (loginError) {
        return <Redirect to="/login" />;
    }
    return (
        <>
            {isLoading && <Loader />}
            <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
                <div className="card-panel">
                    <div className="input-field">
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            className="validate"
                            ref={register({
                                required: {
                                    value: true,
                                    message: "El nombre es requerido",
                                },
                                minLength: {
                                    value: 3,
                                    message: "Minimo 3 caracteres",
                                },
                                maxLength: {
                                    value: 25,
                                    message: "Minimo 25 caracteres",
                                },
                            })}
                            autoComplete="off"
                        />
                        <label htmlFor="first_name">¿Cuál es tu nombre?</label>
                        <span className="helper-text red-text">
                            {errors?.first_name?.message}
                        </span>
                    </div>

                    <div className="input-field">
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            className="validate"
                            ref={register({
                                required: {
                                    value: true,
                                    message: "El apellido es requerido",
                                },
                                minLength: {
                                    value: 5,
                                    message: "Minimo 5 caracteres",
                                },
                                maxLength: {
                                    value: 25,
                                    message: "Minimo 25 caracteres",
                                },
                            })}
                            autoComplete="off"
                        />
                        <label htmlFor="last_name">¿Cuál es tu apellido?</label>
                        <span className="helper-text red-text">
                            {errors?.last_name?.message}
                        </span>
                    </div>

                    <div className="input-field">
                        <input
                            name="birthday"
                            type="date"
                            className="validate"
                            ref={register({
                                required: {
                                    value: true,
                                    message: "Fecha de nacimiento requerida",
                                },
                            })}
                        />
                        <label htmlFor="last_name">¿Cuándo naciste?</label>
                        <span className="helper-text red-text">
                            {errors?.birthday?.message}
                        </span>
                    </div>
                    <div className="input-field">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="validate"
                            ref={register({
                                required: {
                                    value: true,
                                    message: "Correo requerido",
                                },
                                pattern: {
                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Correo no valido",
                                },
                            })}
                        />
                        <label htmlFor="email">Email</label>
                        <span className="helper-text red-text">
                            {errors?.email?.message}
                        </span>
                    </div>

                    <div className="input-field">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="validate"
                            ref={register({
                                required: {
                                    value: true,
                                    message: "Contraseña requerida",
                                },
                                minLength: {
                                    value: 6,
                                    message: "Minimo 6 caracteres",
                                },
                            })}
                        />
                        <label htmlFor="password">Crea una contraseña</label>
                        <span className="helper-text red-text">
                            {errors?.password?.message}
                        </span>
                    </div>

                    <div className="input-field">
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            className="validate"
                            ref={register({
                                required: {
                                    value: true,
                                    message: "Contraseña requerida",
                                },
                                minLength: {
                                    value: 6,
                                    message: "Minimo 6 caracteres",
                                },
                            })}
                        />
                        <label htmlFor="password2">
                            Confirma tu contraseña
                        </label>
                        <span className="helper-text red-text">
                            {errors?.password2?.message}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="btn light-blue darken-3 waves-effect waves-light"
                    >
                        REgistrame
                    </button>
                </div>
            </form>
        </>
    );
};

export default SignupForm;
