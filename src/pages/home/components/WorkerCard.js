import React from "react";
import { Link } from "react-router-dom";
import photo_default from "../../../photo_default.png";

const WorkerCard = ({ id, first_name, last_name, photo, services }) => {
  return (
    <Link to={`workerprofile/${id}`}>
      <li
        className="collection-item avatar z-depth-2 card-panel hoverable"
        style={{ margin: "7px 0" }}
      >
        <img
          src={photo ? photo : photo_default}
          alt={first_name}
          className="circle"
          style={{ width: "70px", height: "70px" }}
        />

        <div style={{ marginLeft: "25px" }}>
          <p className="title black-text">{first_name + " " + last_name}</p>

          <p>
            {services.map((service, index) => {
              return (
                <span
                  key={index}
                  className="chip blue accent-1 lighten-5 black-text"
                >
                  {service}
                </span>
              );
            })}
          </p>
        </div>
      </li>
    </Link>
  );
};

export default WorkerCard;
