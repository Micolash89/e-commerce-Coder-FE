import React from "react";
import "../notification/notificacion.css";

function Notification({ msj }) {
  return (
    <>
      <div className="notification">
        <div className="notification__body">
          {/* <img
            src="assets/check-circle.svg"
            alt="Success"
            className="notification__icon"
          /> */}
          {/* Your account has been created! &#128640; */}
          {msj}
        </div>
        <div className="notification__progress"></div>
      </div>
    </>
  );
}

export default Notification;
