import React, { useState, useEffect } from "react";
import db from "../../services/firebase/dbconfig";
import M from "materialize-css";
import ModalNotification from "../modalnotification/ModalNotifcation";

const Notifications = ({ uid }) => {
  const [notifications, setNotifications] = useState([]);
  const [wasOpen, setOpen] = useState(true);
  const [Unreads, setUnreads] = useState(0);
  const [notificationData, setNotificationData] = useState(null);

  useEffect(() => {
    const notiRef = db.collection("notifications").doc(uid);
    notiRef.onSnapshot(
      (snapshot) => {
        const data = snapshot.data();
        if (data) {
          setOpen(data.wasOpen);

          setNotifications(data.notifications.reverse());

          setUnreads(data.notifications.filter((noti) => noti.seen === false));
        }
      },
      (error) => {
        console.log(error);
      }
    );

    setUnreads(notifications.filter((noti) => !noti.seen));
    ///

    const elem = document.querySelector(".dropdown-trigger");
    M.Dropdown.init(elem, {
      closeOnClick: true,
      coverTrigger: false,
    });
    // M.Dropdown.getInstance(elem).recalculateDimensions();
    // console.log(instances);
  }, []);

  const markBellOpen = () => {
    if (!wasOpen) {
      db.collection("notifications").doc(uid).update({
        wasOpen: true,
      });
    }
  };

  const markNotiOpen = (noti, index) => {
    if (!notifications[index].seen) {
      notifications[index].seen = true;
      db.collection("notifications")
        .doc(uid)
        .update({
          notifications: notifications,
        })
        .then(() => {
          if (noti.link) {
            window.location.href = noti.link;
          } else {
            setNotificationData(noti);
          }
        });
    }
    if (noti.link) {
      window.location.href = noti.link;
    } else {
      setNotificationData(noti);
    }
  };

  const closeModal = () => {
    setNotificationData(null);
  };

  return (
    <>
      {Unreads.length > 0 && (
        <span
          className="new badge blue darken-4 z-depth-3"
          data-badge-caption=""
          style={{ fontWeight: "800" }}
        >
          {Unreads.length}
        </span>
      )}
      <a
        href="#!"
        className={`dropdown-trigger ${!wasOpen && "shake-bell"}`}
        data-target="notifications"
        onClick={markBellOpen}
      >
        <i className="material-icons">
          {wasOpen ? "notifications_none" : "notifications_active"}
        </i>
      </a>

      <ul id="notifications" className="dropdown-content z-depth-2">
        {notifications.length > 0 ? (
          notifications.map((noti, index) => {
            return (
              <li
                key={index}
                className={noti.seen ? "" : "blue accent-1"}
                onClick={() => {
                  markNotiOpen(noti, index);
                }}
              >
                <a className={noti.seen ? "blue-text" : "white-text"}>
                  {noti.title}
                </a>
                <div className="divider"></div>
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
      {notificationData && (
        <ModalNotification
          notification={notificationData}
          onClose={closeModal}
        />
      )}
    </>
  );
};
export default Notifications;
