import React, { useEffect, useState } from "react";

import WorkerCard from "./WorkerCard";
import Loader from "../../../components/Loader";
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
      <ul className="collection workers-list">
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
    );
  } else {
    return (
      <section className=" section center-align">
        <Loader />
      </section>
    );
  }
};

export default WorkersSection;
