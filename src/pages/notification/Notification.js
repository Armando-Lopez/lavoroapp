import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Notification = () => {
  const { data } = useParams();
  console.log(JSON.parse(data));

  return <Navbar />;
};

export default Notification;
