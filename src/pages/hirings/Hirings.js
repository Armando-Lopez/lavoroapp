import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Hirings = () => {
  const { uid } = useParams();
  return <>{uid}</>;
};

export default Hirings;
