import React from "react";

import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";
import WorkersSection from "./components/WorkersSection";

const Index = () => {
  return (
    <section>
      <Navbar />
      <SideMenu />
      <WorkersSection />
    </section>
  );
};

export default Index;
