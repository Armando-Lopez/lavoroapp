import React from "react";
import { useForm } from "react-hook-form";

const RatingForm = ({ onComment }) => {
    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data) => onComment(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="input-field col s12 m6">
                    <i className="material-icons prefix">person</i>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="validate"
                        ref={register({
                            required: {
                                value: true,
                                message: "Dinos tu nombre.",
                            },
                            minLength: {
                                value: 3,
                                message: "Minimo tres caracteres",
                            },
                        })}
                    />

                    <label htmlFor="name">Nombre</label>

                    <span className="red-text">{errors?.name?.message}</span>
                </div>

                <div className="input-field col s12 m6">
                    <i className="material-icons prefix">email</i>

                    <input
                        id="email"
                        name="email"
                        type="email"
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

                    <span className="red-text">{errors?.email?.message}</span>
                </div>
            </div>

            <div className="row">
                <div className="input-field col s12">
                    <i className="material-icons prefix">mode_edit</i>

                    <textarea
                        id="comment"
                        name="comment"
                        className="materialize-textarea"
                        ref={register({
                            required: {
                                value: true,
                                message: "Comentario requerido",
                            },
                            minLength: {
                                value: 10,
                                message: "Minimo 10 caracteres",
                            },
                        })}
                    ></textarea>

                    <label htmlFor="comment">Escribe tu comentario</label>

                    <span className="red-text">{errors?.comment?.message}</span>
                </div>
            </div>
            <button className="btn blue accent-4"> Enviar</button>
        </form>
    );
};

export default RatingForm;
