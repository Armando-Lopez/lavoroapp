import React from "react";
import { Link } from "react-router-dom";

const WorkerCard = ({ id, first_name, last_name, photo, services }) => {
  return (
    <li className="collection-item avatar card-panel">
      <Link to={`workerprofile/${id}`}>
        <img src={photo} alt={first_name} className="circle" />
        <span className="title">{first_name + " " + last_name}</span>
        <p>{services.map((service) => service + ". ")}</p>
      </Link>
    </li>
  );
};

export default WorkerCard;
