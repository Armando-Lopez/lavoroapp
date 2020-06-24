import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../services/firebase/dbconfig";
import Loader from "../components/Loader";

const WorkerProfile = () => {
  const { token } = useParams();
  const [worker, setWorker] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [found, setFound] = useState(true);

  useEffect(() => {
    getWorker();
  }, []);

  const getWorker = () => {
    // db.collection("workers")
    //   .doc(token)
    //   .get()
    //   .then(function (doc) {
    //     if (doc.exists) {
    setLoaded(true);
    //       setWorker(doc.data());
    //     } else {
    // setFound(false);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log("Error getting document:", error);
    //   });
  };

  if (worker && loaded && found) {
    return (
      <section className="row">
        <div className="col s12">
          <div className="photo">
            <img
              src="https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              className="responsive-img"
              alt="userphoto"
            />
          </div>
          <h1>hi</h1>
          prfile{token}
        </div>
      </section>
    );
  } else if (!loaded && found) {
    return <Loader />;
  } else if (!found) {
    return <h1>not found</h1>;
  }
};

export default WorkerProfile;
