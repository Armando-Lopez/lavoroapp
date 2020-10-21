import React, { useState, useEffect } from "react";
import logo from "../../logo.png";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase";
//css
import M from "materialize-css";
import "./css/login.css";

const Login = () => {
    const [hasSignin, SetSignin] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                SetSignin(true);
            }
        });
    }, []);

    const Signin = (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                SetSignin(true);
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/invalid-email":
                        M.toast({ html: "Correo invalido" });
                        break;

                    case "auth/wrong-password":
                        M.toast({ html: "contraseña invalida" });
                        break;

                    case "auth/user-not-found":
                        M.toast({ html: "El usuario no fue encontrado" });
                        break;

                    default:
                        console.log(error);
                        M.toast({ html: "Ocurrio un error" });
                        break;
                }
            });
    };

    if (hasSignin) {
        return <Redirect to="/" />;
    }
    return (
        <section className="login-section center-align">
            <div className="bg blue"></div>
            <div
                className="content-login section"
                style={{ margin: "0", padding: "0" }}
            >
                <img src={logo} alt="logo" width="100" />
                <h2 className="blue-text text-accent-4">Lavoro App</h2>
                <div className="row container">
                    <form className="col s12 m8 l6 offset-m2 offset-l3 white container form-login">
                        <h4 className="blue-text">Inicia sesión</h4>
                        <div className="divider blue"></div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id="email"
                                    type="text"
                                    className="validate"
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    id="password"
                                    type="password"
                                    className="validate"
                                />
                                <label htmlFor="password">Contraseña</label>
                            </div>
                            <button
                                className="waves-effect waves-light btn-small blue"
                                onClick={Signin}
                            >
                                Ingresar
                            </button>
                            <p>
                                ¿No tienes cuenta?{" "}
                                <Link to="/registro">Crea una cuenta</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
