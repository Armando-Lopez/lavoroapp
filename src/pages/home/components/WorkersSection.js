import React, { useEffect, useState } from "react";

import WorkerCard from "./WorkerCard";
import Loader from "../../../components/loader/Loader";
import db from "../../../services/firebase/dbconfig";

import SearchWorker from "./SearchWorker";

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
      });
      setWorkers(worker);
      setLoaded(true);
    });
  };

  useEffect(() => {
    GetWorkers();
  }, []);

  const onChange = (e) => {
    const value = e.target.value.trim().toLowerCase();
    if (value !== "") {
      let found = [];
      workers.forEach((worker) => {
        worker.services.find((item) => {
          let service = item.toLowerCase().trim();
          let wasFound = service.includes(value);
          if (wasFound && !found.includes(worker)) {
            found.push(worker);
          }
        });
      });
      setWorkers(found);
    } else {
      GetWorkers();
    }
  };

  if (workers && loaded) {
    return (
      <>
        <div
          className="row light-blue lighten-5"
          style={{ minHeight: "100vh", margin: "0" }}
        >
          <SearchWorker onChange={onChange} />
          <div className="col s12 m10 offset-m1 l10 offset-l1">
            <ul className="collection">
              {workers.map((worker, index) => {
                return (
                  <React.Fragment key={index}>
                    <WorkerCard
                      id={worker.id}
                      first_name={worker.first_name}
                      last_name={worker.last_name}
                      photo={worker.photo}
                      services={worker.services}
                    />
                    <div className="divider"></div>
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        </div>
      </>
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
