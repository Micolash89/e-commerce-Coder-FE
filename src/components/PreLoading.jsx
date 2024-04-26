import { useEffect, useState } from "react";
import "../css/preLoading.css";
import axios from "axios";
import { END_POINTS } from "./endPoints";
import Error from "./Error";
function PreLoading() {
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(0);
  const [string, setString] = useState(".");

  const fetchRetry = async () => {
    setDisplay(false);

    axios
      .get(`${END_POINTS.URL()}/api/products`)
      .then((response) => {
        console.log("response del loading", response.data);
        setDisplay(true);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  useEffect(() => {
    fetchRetry();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (loading < 100 && !display) {
        setLoading(loading + 1);
        setString(string.length < 3 ? string + "." : ".");
      }
    }, 600);
  }, [loading]);

  return (
    <>
      <div
        className={`containerPreLoader ${display ? "ocultar" : ""} `}
        id="preloader"
      >
        <div className="text">
          <span>Cargando{string}</span>
        </div>
        <div className="loading">
          <div className="line-box">
            <div className="line"></div>
          </div>
        </div>
        <div className="numb">{loading} %</div>
        {error && <Error />}
      </div>
    </>
  );
}

export default PreLoading;
