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

    const collapsibleList = document.querySelector(".collapsible");
    // console.log(collapsible);

    M.Collapsible.init(collapsibleList, {
      accordion: false,
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
  return (
    <>
      <Navbar />
      <div className="container section">
        <ul className="collapsible expandable popout blue-grey-text text-darken-4">
          {hiringRequests.length > 0 &&
            hiringRequests.map((request, index) => {
              return (
                <RequestsList
                  key={index}
                  request={request}
                  onDelete={deleteRequest}
                />
              );
            })}
        </ul>
      </div>
    </>
  );
};

const RequestsList = ({ request, onDelete }) => {
  // console.log(request);

  const {
    first_name,
    last_name,
    email,
    telephone,
    description,
  } = request.data.body;

  return (
    // <div className="col s12 m6 l4">
    //   <div className="card blue-grey">
    //     <div className="card-content white-text">
    //       <span className="card-title">{request.title}</span>
    //       <p>{description}</p>
    //     </div>
    //     <div className="card-action">
    //       <button
    //         className="btn-floating right"
    //         onClick={() => {
    //           onDelete(request.did);
    //         }}
    //       >
    //         <i className="material-icons">delete</i>
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <li>
      <div
        className="collapsible-header blue accent-1"
        style={{ fontWeight: "700" }}
      >
        <i className="material-icons">description</i>
        {`${first_name} | ${email}`}
      </div>

      <div className="collapsible-body blue lighten-4">
        <ul className="collection">
          <li className="collection-item">{description}</li>

          <li className="collection-item">
            <i className="material-icons">person </i>
            {` ${first_name} ${last_name}`}
          </li>

          <li className="collection-item">
            <i className="material-icons">email </i>
            {telephone}
          </li>

          <li className="collection-item">
            <i className="material-icons">phone </i>
            {email}
          </li>

          <button
            className="btn-floating red right"
            onClick={() => {
              onDelete(request.did);
            }}
          >
            <i className="material-icons">delete</i>
          </button>
        </ul>
      </div>
    </li>
  );
};

export default Hirings;
