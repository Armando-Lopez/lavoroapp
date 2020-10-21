import React from "react";
import M from "materialize-css";

const ModalNotification = ({ notification, onClose }) => {
    const [Modalinstance, setModalInstance] = React.useState(null);

    React.useEffect(() => {
        const modalNotification = document.querySelector("#modalNotification");
        M.Modal.init(modalNotification, {
            preventScrolling: true,
            dismissible: false,
        });
        setModalInstance(M.Modal.getInstance(modalNotification));
    }, []);
    if (Modalinstance) {
        Modalinstance.open();
    }
    const close = () => {
        Modalinstance.close();
        onClose();
    };
    const {
        first_name,
        last_name,
        telephone,
        email,
        description,
    } = notification.body;
    return (
        <>
            <div id="modalNotification" className="modal">
                <div className="row">
                    <div className="col s12">
                        <div className="modal-content black-text">
                            <h5>¡Felicidades!</h5>
                            <p>{description}</p>
                            <div className="divider"></div>
                            <h6>
                                Puedes comunicarte con{" "}
                                {first_name + " " + last_name}
                            </h6>
                            <p>
                                Correo: {email} <br />
                                Telefono: {telephone}
                            </p>
                        </div>
                        <br />
                        <a
                            href="#!"
                            className="modal-close btn blue waves-effect waves-light z-depth-3"
                            style={{ position: "fixed", top: "0", right: "0" }}
                            onClick={close}
                        >
                            <i className="material-icons">close</i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalNotification;
