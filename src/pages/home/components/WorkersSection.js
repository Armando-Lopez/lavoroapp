import React, { useEffect, useState } from "react";

import WorkerCard from "./WorkerCard";
import Loader from "../../../components/loader/Loader";
import db from "../../../services/firebase/dbconfig";

const WorkersSection = () => {
  const [workers, setWorkers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const GetWorkers = () => {
    const worker = [];
    db.collection("workers").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        worker.push({
          id: doc.id,
          first_name: data.first_name,
          last_name: data.last_name,
          photo: data.photo,
          services: data.services,
        });
        setWorkers(worker);
      });
      setLoaded(true);
    });
  };

  useEffect(() => {
    GetWorkers();
  }, []);

  if (workers && loaded) {
    return (
      <div
        className="row blue accent-1 lighten-5"
        style={{ minHeight: "100vh", margin: "0" }}
      >
        <div className="col s12 m10 offset-m1 l10 offset-l1">
          <ul className="collection" style={{ border: "none" }}>
            {workers.map((worker, index) => {
              return (
                <WorkerCard
                  key={index}
                  id={worker.id}
                  first_name={worker.first_name}
                  last_name={worker.last_name}
                  photo={worker.photo}
                  services={worker.services}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <section className="section center-align">
        <Loader />
      </section>
    );
  }
};

export default WorkersSection;
