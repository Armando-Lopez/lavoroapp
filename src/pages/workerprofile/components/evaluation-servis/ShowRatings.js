import React, { useState, useEffect } from "react";
import db from "../../../../services/firebase/dbconfig";
import { FaStar } from "react-icons/fa";

import "./show_ratings.css";

const ShowRatings = ({ uid }) => {
    const [stars, setStars] = useState(0);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        db.collection("ratings")
            .where("to", "==", uid)
            .onSnapshot((snap) => {
                let star = [];
                let comment = [];
                snap.forEach((doc) => {
                    star.push(doc.data().stars);
                    comment.push(doc.data());
                });
                setStars(star);
                setComments(comment);
            });
    }, [uid]);

    if (stars) {
        var sum = stars.reduce(
            (current, accumulator) => current + accumulator,
            0
        );
        var avg = (sum / stars.length).toFixed(1);
    }

    return (
        <div className="row">
            {stars && comments.length > 0 ? (
                <div className="col s12 m8 offset-m2 center-align card-panel">
                    <div className="star-ratings">
                        <div
                            className="fill-ratings"
                            style={{ width: (avg * 100) / 5.0 + "%" }}
                        >
                            <span>★★★★★</span>
                        </div>
                        <div className="empty-ratings">
                            <span>★★★★★</span>
                        </div>
                    </div>
                    <span className="rating-number blue-grey-text text-darken-2">
                        {avg}
                    </span>
                    <br />
                    <span className="people blue-grey-text text-accent-4">
                        {comments.length + " Personas"}
                    </span>

                    <ul className="collection left-align blue-grey-text text-darken-2">
                        <li className="collection-header center-align">
                            <h6>Calificaciones</h6>
                        </li>
                        {comments.map((item, i) => {
                            return (
                                <li key={i} className="collection-item">
                                    <span className="title">
                                        {item.comment.name}
                                    </span>
                                    <br />
                                    {[...Array(item.stars)].map((star, i) => {
                                        return (
                                            <FaStar
                                                key={i}
                                                size={15}
                                                color="#ffc107"
                                            />
                                        );
                                    })}{" "}
                                    ({item.stars})<p>{item.comment.comment}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <p>Sin Calificaciones</p>
            )}
        </div>
    );
};

export default ShowRatings;
