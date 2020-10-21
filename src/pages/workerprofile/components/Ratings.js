import React, { useEffect, useState } from "react";
import firebase from "firebase";
import db from "../../../services/firebase/dbconfig";
import M from "materialize-css";

//components
import StarRating from "./evaluation-servis/StartRating";
import RatingForm from "./evaluation-servis/RatingForm";

const Rating = ({ uid, first_name }) => {
    const [stars, setStar] = useState(null);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        const elem = document.querySelectorAll(".collapsible-rating");
        M.Collapsible.init(elem, {
            accordion: false,
            inDuration: 700,
            outDuration: 700,
            onOpenEnd() {
                setOpen(true);
            },
            onCloseEnd() {
                setOpen(false);
            },
        });
    });

    const onStarRating = (ratingValue) => {
        setStar(ratingValue);
    };

    const onComment = (data) => {
        if (stars && data) {
            if (data.comment.trim() !== "") {
                db.collection("ratings")
                    .add({
                        to: uid,
                        stars: stars,
                        comment: data,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    .then(() => {
                        M.toast({ html: "Comentario agregado." });
                    })
                    .catch((error) => {
                        console.log(error);
                        M.toast({
                            html:
                                "No se pudo agregar el comentario. Intentalo más tarde",
                        });
                    });
            }
        }
    };

    return (
        <div className="row section">
            <div className="col s12 m10 offset-m1 l5">
                <ul className="collapsible collapsible-rating">
                    <li>
                        <div className="collapsible-header">
                            <button
                                className={`btn center-align
                ${isOpen ? "red btn-small" : "blue"}
                accent-3`}
                            >
                                {isOpen ? (
                                    <i className="material-icons center-align">
                                        close
                                    </i>
                                ) : (
                                    `Calificar a ${first_name}`
                                )}
                            </button>
                        </div>
                        <div className="collapsible-body">
                            <StarRating onStarRating={onStarRating} />
                            <RatingForm onComment={onComment} />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Rating;
