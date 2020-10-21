import React, { useState, useEffect } from "react";
import db from "../../../../services/firebase/dbconfig";
import M from "materialize-css";
import Loader from "../../../../components/loader/Loader";

const BasicInfo = ({ uid, worker, isOwner }) => {
    return (
        <>
            <div>
                {isOwner && (
                    <>
                        <button
                            data-target="modal-form-info"
                            className="btn-floating blue accent-4 darken-4 modal-trigger right btn-edit-inf"
                        >
                            <i className="material-icons">edit</i>
                        </button>
                        <ModalEditInfo uid={uid} worker={worker} />
                    </>
                )}
                <h4 className="blue-grey-text text-darken-2">
                    {worker.first_name + " " + worker.last_name}
                </h4>

                <p className="flow-text">
                    {worker.services.map((service, index) => (
                        <span
                            key={index}
                            className="chip blue lighten-5 blue-grey-text text-darken-3"
                        >
                            {service}
                        </span>
                    ))}
                </p>

                <p
                    className="flow-text blue-grey-text text-darken-3"
                    style={{ textAlign: "justify" }}
                >
                    {worker.description
                        ? worker.description
                        : "Sin descripción"}
                </p>
            </div>

            <div className="divider"></div>
        </>
    );
};

const ModalEditInfo = ({ uid, worker }) => {
    const [services, setServices] = useState(worker.services);
    const [description, setDescription] = useState(worker.description);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const elem = document.querySelector("#modal-form-info");
        M.Modal.init(elem, {
            dismissible: false,
            preventScrolling: true,
            inDuration: 100,
            outDuration: 100,
        });

        M.textareaAutoResize(document.querySelector(".materialize-textarea"));
    }, []);

    const handleInputServices = (ev) => {
        const servicesList = ev.target.value
            .trim()
            .split(",")
            .filter((service) => service.trim() !== "");
        setServices(servicesList);
    };

    const handleInputDescription = (e) => setDescription(e.target.value.trim());

    const save = async () => {
        setLoading(true);
        try {
            const washingtonRef = db.collection("workers").doc(uid);
            await washingtonRef.update({
                services: services,
                description: description,
            });
            M.toast({ html: "Datos actualizados" });
        } catch (error) {
            console.log(error);
            M.toast({ html: "Hubo un error al actulizar" });
        }
        setLoading(false);
    };

    return (
        <>
            {loading && <Loader />}
            <div id="modal-form-info" className="modal">
                <div className="modal-content">
                    <div className="row">
                        <h5 className="blue-grey-text text-darken-2">
                            Edita tu información básica
                        </h5>
                        <div className="input-field col s12 left-align">
                            <p className="blue-grey-text text-darken-2">
                                Aún no puedes editar tu nombre
                            </p>
                            <input
                                disabled
                                defaultValue={
                                    worker.first_name + " " + worker.last_name
                                }
                                id="disabled"
                                type="text"
                                className="validate"
                            />
                        </div>

                        <div className="input-field col s12 left-align">
                            <p className="blue-grey-text text-darken-2">
                                ¿cuáles son tus habilidades? <br /> Agregalas
                                separando cada una por comas (,)
                            </p>
                            <textarea
                                name="services"
                                id="services"
                                className="materialize-textarea blue-grey-text text-darken-2"
                                defaultValue={services.map(
                                    (service) => ` ${service}`
                                )}
                                onChange={handleInputServices}
                            ></textarea>

                            <p className="serices-preview">
                                {services.map((service, index) => (
                                    <span
                                        key={index}
                                        className="chip blue lighten-5 blue-grey-text text-darken-3"
                                    >{`${service} `}</span>
                                ))}
                            </p>
                        </div>

                        <div className="input-field col s12 left-align">
                            <p className="blue-grey-text text-darken-2">
                                Añade una breve descripción de ti y los
                                servicios que ofreces
                            </p>

                            <textarea
                                name="description"
                                id="description"
                                className="materialize-textarea blue-grey-text text-darken-3"
                                defaultValue={description}
                                onChange={handleInputDescription}
                            ></textarea>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="btn-floating modal-close red accent-2 waves-effect waves-light white-text left">
                            <i className="material-icons">cancel</i>
                        </button>

                        <button
                            className="btn-floating modal-close green accent-3 waves-effect waves-light blue-grey-text text-darken-4"
                            onClick={save}
                        >
                            <i className="material-icons">check</i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasicInfo;
