import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkerCard from "./WorkerCard";
import Loader from "../Loader";

const WorkersSection = () => {
  const [WorkersList, FillWorkersList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const GetWorkers = async () => {
    try {
      const response = await axios.get("./utils/MOCK_WORKERS_LIST.json");
      FillWorkersList(response.data);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
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
