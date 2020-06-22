import React, { useEffect, useState } from "react";
import Worker from "../../services/workerServices";
import WorkerCard from "./WorkerCard";
import Loader from "../Loader";

const WorkersSection = () => {
  const [WorkersList, FillWorkersList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const GetWorkers = () => {
    Worker.getAll()
      .then((workers) => {
        FillWorkersList(workers);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetWorkers();
  }, []);

  if (WorkersList && loaded) {
    return (
      <ul className="collection workers-list">
        {WorkersList.map((worker, index) => {
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
