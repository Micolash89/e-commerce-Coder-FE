import { useEffect, useState } from "react";
import "../css/preLoading.css";
import axios from "axios";
import { END_POINTS } from "./endPoints";
import Error from "./Error";

function PreLoading() {
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState(false);

  const fetchRetry = async () => {
    try {
      const response = await axios.get(`${END_POINTS.URL()}/api/products`);
      console.log("response del loading", response.data);
      setDisplay(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchRetry();
  }, []);

  return (
    <>
      <div
        className={`containerPreLoader ${display ? "ocultar" : ""} `}
        // className={`containerPreLoader `}
        id="preloader"
      >
        <div className="text">
          <span>Cargando...</span>
        </div>
        <div className="loading">
          <div className="line-box">
            <div className="line"></div>
          </div>
        </div>
        {/* <div className="numb">{loading}%</div> */}
        {error && <Error />}
      </div>
    </>
  );
}

export default PreLoading;
