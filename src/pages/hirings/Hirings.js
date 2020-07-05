import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../services/firebase/dbconfig";
import Navbar from "../../components/navbar/Navbar";
import M from "materialize-css";

const Hirings = () => {
  const { uid } = useParams();
  const [seenHiringRequests, setSeen] = useState([]);
  const [unSeenHiringRequests, setUnsee] = useState([]);

  useEffect(() => {
    db.collection("hirings")
      .where("to", "==", uid)
      .onSnapshot((snap) => {
        let req = [];
        snap.forEach((doc) => {
          let d = { id: doc.id, data: doc.data() };
          req.push(d);
        });
        setSeen(req.filter((r) => r.data.seen));
        setUnsee(req.filter((r) => !r.data.seen));
      });

    const collapsibleList = document.querySelector(".collapsible");
    M.Collapsible.init(collapsibleList, {
      accordion: false,
      onCloseEnd() {
        db.collection("hirings")
          .doc(window.localStorage.getItem("requestSeen"))
          .update({
            seen: true,
          });
      },
    });
  }, []);

  const markAsSeen = (id) => {
    window.localStorage.setItem("requestSeen", id);
  };

  const deleteRequest = (did) => {
    if (window.confirm("¿seguro que desea eliminar está solicitud?")) {
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
    }
  };

  return (
    <>
      <Navbar />
      <div className="container section">
        <ul className="collapsible expandable popout blue-grey-text text-darken-3">
          {/* Muestra las solitudes no vistas primero */}
          {unSeenHiringRequests.length > 0 &&
            unSeenHiringRequests.map((request, index) => {
              return (
                <RequetsList
                  key={index}
                  request={request}
                  markAsSeen={markAsSeen}
                  onDelete={deleteRequest}
                />
              );
            })}

          {/* Muestra las solitudes vistas */}
          {seenHiringRequests.length > 0 &&
            seenHiringRequests.map((request, index) => {
              return (
                <RequetsList
                  key={index}
                  request={request}
                  markAsSeen={markAsSeen}
                  onDelete={deleteRequest}
                />
              );
            })}
          {seenHiringRequests.length === 0 &&
            unSeenHiringRequests.length === 0 && (
              <h4 className="center-align">
                Tus solicitudes de contratación aparecerán aquí.
              </h4>
            )}
        </ul>
      </div>
    </>
  );
};

const RequetsList = ({ request, markAsSeen, onDelete }) => {
  const { seen } = request.data;
  const {
    first_name,
    last_name,
    email,
    telephone,
    description,
  } = request.data.body;
  return (
    <li>
      <div
        className={`collapsible-header blue ${
          seen ? "lighten-5" : "lighten-4"
        }`}
        style={{ fontWeight: "700" }}
        onClick={() => {
          markAsSeen(request.id);
        }}
      >
        <i className="material-icons">
          {seen ? "visibility" : "visibility_off"}
        </i>
        {`${first_name} | ${email}`}
      </div>

      <div className="collapsible-body blue lighten-4">
        <ul className="collection">
          <li className="collection-item">
            <i className="material-icons">description </i>
            {description}
          </li>

          <li className="collection-item">
            <i className="material-icons">person </i>
            {` ${first_name} ${last_name}`}
          </li>

          <li className="collection-item">
            <i className="material-icons">email </i>
            {email}
          </li>

          <li className="collection-item">
            <i className="material-icons">phone </i>
            {telephone}
          </li>

          <button
            className="btn-floating red right"
            onClick={() => {
              onDelete(request.id);
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
