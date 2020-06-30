import React from "react";
import { Link } from "react-router-dom";
import photo_default from "../../../photo_default.png";

const WorkerCard = ({ id, first_name, last_name, photo, services }) => {
  return (
    <li className="collection-item avatar card-panel">
      <Link to={`workerprofile/${id}`}>
        <img
          src={photo ? photo : photo_default}
          alt={first_name}
          className="circle"
        />
        <span className="title">{first_name + " " + last_name}</span>
        <p>{services.map((service) => service + ". ")}</p>
      </Link>
    </li>
  );
};

export default WorkerCard;
