import React from "react";
import { Link } from "react-router-dom";
import photo_default from "../../../photo_default.png";

const WorkerCard = ({ id, first_name, last_name, photo, services }) => {
  return (
    <Link to={`workerprofile/${id}`}>
      <li className="collection-item avatar">
        <img
          src={photo ? photo : photo_default}
          alt={first_name}
          className="circle"
        />
        <span className="title blue-grey-text text-accent-4">
          {first_name + " " + last_name}
        </span>
        <p>
          {services.map((service, index) => {
            return (
              <span className="grey-text text-accent-4" key={index}>
                {service + ". "}
              </span>
            );
          })}
        </p>
      </li>
    </Link>
  );
};

export default WorkerCard;
