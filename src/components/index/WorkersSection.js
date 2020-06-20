import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkerCard from "./WorkerCard";

const WorkersSection = () => {
  const [WorkersList, FillWorkersList] = useState([]);

  const GetWorkers = async () => {
    const response = await axios.get("./utils/MOCK_WORKERS_LIST.json");
    FillWorkersList(response.data);
  };

  useEffect(() => {
    GetWorkers();
  }, []);

  return (
    <ul className="collection workers-list">
      {WorkersList.map((worker, index) => {
        return (
          <WorkerCard
            key={worker.id}
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
};

export default WorkersSection;
