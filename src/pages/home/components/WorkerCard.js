import React from "react";
import { Link } from "react-router-dom";

const WorkerCard = ({ id, first_name, last_name, photo, services }) => {
  return (
    <li className="collection-item avatar card-panel">
      <Link to={`/profile/${id}`}>
        <img
          src="https://source.unsplash.com/random"
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
