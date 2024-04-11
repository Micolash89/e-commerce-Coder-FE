import CardProduct from "./CardProduct";
import "../css/section2.css";
import { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import Error from "./Error";
import { END_POINTS } from "./endPoints";
import { ThemeContext } from "./context/ThemeContext";
import Cookies from "js-cookie";

function Section2() {
  const [productos, setProductos] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setError(false);
    fetch(`${END_POINTS.URL()}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        setProductos(data.payload.docs);
        console.log(data);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className={`main__section2 flexcolum  ${theme}`}>
        <h3 className="main__section2--h3">
          Grab the best deal on <strong>Smartphones</strong>
        </h3>
        {error && <Error />}
        {loading && <Loader />}
        <div className="main__section2--cards ms2Cards">
          {productos &&
            productos.map((e, i) => {
              return (
                <CardProduct key={`${i} ${e.title}`} data={e} url="details" />
              );
            })}
        </div>
      </section>
    </>
  );
}

export default Section2;
