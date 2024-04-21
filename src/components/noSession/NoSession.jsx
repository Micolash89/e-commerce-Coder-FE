import { useSelector } from "react-redux";
import "../noSession/noSession.css";

function NoSession() {
  const session = useSelector((state) => state.user.session);

  return (
    <>
      {!session && (
        <div className="noSession">
          <span>inicie Sessión</span>
        </div>
      )}
    </>
  );
}

export default NoSession;
