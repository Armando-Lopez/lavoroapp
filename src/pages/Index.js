import React from "react";
import Navbar from "../components/index/Navbar";
import SideMenu from "../components/index/SideMenu";
import WorkersSection from "../components/index/WorkersSection";
import Session from "../services/localStorageService";

import { Redirect } from "react-router-dom";

const Index = () => {
  if (!Session.getCurrent()) {
    return <Redirect to="/login" />;
  }
  return (
    <section className="">
      <Navbar />
      <SideMenu />
      <WorkersSection />
    </section>
  );
};

export default Index;
