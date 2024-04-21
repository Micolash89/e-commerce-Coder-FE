import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "../notification/notificacion.css";
import { useSelector } from "react-redux";
import { messageNull } from "../../redux/features/NotificationSlice";

function Notification() {
  const [change, setChange] = useState(false);

  const notificationMessage = useSelector(
    (state) => state.notification.message
  );
  const notificationStatus = useSelector((state) => state.notification.state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notificationStatus != null) {
      setChange(true);

      setTimeout(() => {
        setChange(false);
        dispatch(messageNull());
      }, 3000);
    }
  }, [notificationStatus]);

  return (
    <>
      {change && (
        <div className="notification">
          <div className="notification__body">
            {/* <img
            src="assets/check-circle.svg"
            alt="Success"
            className="notification__icon"
          /> */}
            <i
              className={`${
                notificationStatus ? "ri-check-line" : "ri-close-line"
              }`}
            ></i>
            {notificationMessage}
          </div>
          <div className="notification__progress"></div>
        </div>
      )}
    </>
  );
}

export default Notification;
