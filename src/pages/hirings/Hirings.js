import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../services/firebase/dbconfig";
import Navbar from "../../components/navbar/Navbar";
import M from "materialize-css";

const Hirings = () => {
  const { uid } = useParams();
  const [hiringRequests, setReq] = useState([]);

  useEffect(() => {
    db.collection("hirings")
      .where("to", "==", uid)
      .onSnapshot((snap) => {
        let req = [];
        snap.forEach((doc) => {
          let d = { did: doc.id, data: doc.data() };
          req.push(d);
        });
        setReq(req);
      });
  }, []);

  const deleteRequest = (did) => {
    db.collection("hirings")
      .doc(did)
      .delete()
      .then(() => {
        M.toast({ html: "Solicitud Eliminada" });
      })
      .catch((error) => {
        console.log(error);
        M.toast({ html: "Oop! intentalo más tarde" });
      });
  };

  console.log(hiringRequests);

  return (
    <>
      <Navbar />
      <div className="row section container">
        {hiringRequests.length > 0 &&
          hiringRequests.map((request, index) => {
            return (
              <CardRequest
                key={index}
                request={request}
                onDelete={deleteRequest}
              />
            );
          })}
      </div>
    </>
  );
};

const CardRequest = ({ request, onDelete }) => {
  console.log(request);

  const {
    first_name,
    last_name,
    email,
    telephone,
    description,
  } = request.data.body;

  return (
    <div className="col s12 m6 l4">
      <div className="card blue-grey">
        <div className="card-content white-text">
          <span className="card-title">{request.title}</span>
          <p>{description}</p>
        </div>
        <div className="card-action">
          <button
            className="btn-floating right"
            onClick={() => {
              onDelete(request.did);
            }}
          >
            <i className="material-icons">delete</i>
          </button>
          {/* sjhsdkjdhsjdhjkds */}
        </div>
      </div>
    </div>
  );
};

export default Hirings;
