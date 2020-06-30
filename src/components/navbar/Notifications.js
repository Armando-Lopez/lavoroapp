import React, { useState, useEffect } from "react";
import db from "../../services/firebase/dbconfig";
import M from "materialize-css";
import { logDOM } from "@testing-library/react";

const Notifications = ({ uid }) => {
  const [notifications, setNotifications] = useState([]);
  const [wasOpen, setOpen] = useState(false);
  const [Unreads, setUnreads] = useState(0);

  const hasUnread = notifications.length > 0;

  // console.log(hasUnread);

  useEffect(() => {
    const notiRef = db.collection("notifications").doc(uid);

    notiRef.onSnapshot(
      (snapshot) => {
        const data = snapshot.data();
        setOpen(data.wasOpen);
        setNotifications(data.notifications);
        setUnreads(data.notifications.filter((noti) => noti.seen === false));
      },
      (error) => {
        console.log(error);
      }
    );

    // const washingtonRef = db.collection("notifications").doc(uid);
    // washingtonRef.update({
    //   notifications: firebase.firestore.FieldValue.arrayUnion({
    //     has_been_seen: true,
    //     title: "Alguien te ha calificado",
    //   }),
    // });

    // notiRef
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       setNotifications(doc.data().notifications);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     M.toast({ html: "Ha ocurrido un error al obtener las notificaciones" });
    //   });
  }, [uid]);

  useEffect(() => {
    const elem = document.querySelector(".dropdown-trigger");
    M.Dropdown.init(elem, {
      closeOnClick: true,
      coverTrigger: false,
    });
    M.Dropdown.getInstance(elem).recalculateDimensions();
    // console.log(instances);
  }, []);
  // console.log(notifications);

  return (
    <>
      {hasUnread && (
        <span
          className="new badge"
          data-badge-caption=""
          style={{ fontWeight: "800" }}
        >
          {notifications.length}
        </span>
      )}
      <a
        href="#!"
        className={`dropdown-trigger ${!wasOpen && "shake-bell"}`}
        data-target="notifications"
      >
        <i className="material-icons">
          {hasUnread ? "notifications_active" : "notifications_none"}
        </i>
      </a>

      <ul id="notifications" className="dropdown-content">
        {notifications.length > 0 ? (
          notifications.map((noti, index) => {
            return (
              <li key={index} className="blue accent-1 white-text">
                <a href="#!" className="white-text">
                  {noti.title}
                </a>
              </li>
            );
          })
        ) : (
          <li className="blue accent-1 white-text">
            <a href="#!" className="white-text">
              No tienes notificaciones
            </a>
          </li>
        )}
      </ul>
    </>
  );
};
export default Notifications;
