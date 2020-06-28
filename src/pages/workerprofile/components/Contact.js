import React from "react";
import { Link } from "react-router-dom";

const Contact = ({ uid }) => {
  return (
    <Link
      to={`/hire/${uid}`}
      className="fixed-action-btn btn-floating btn-large blue accent-4"
    >
      <i className="material-icons">construction</i>
    </Link>
  );
};

export default Contact;
