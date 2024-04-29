import CardProduct from "./CardProduct";
import "../../components/home/section2.css";
import { useEffect, useState } from "react";
import Loader from "../loaders/Loader";
import Error from "../error/Error";
import { END_POINTS } from "../endPoints";
import axios from "axios";
import Cookies from "js-cookie";

function MyProducts() {
  const [productos, setProductos] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);

    const tokenCookie = Cookies.get("coderCookieToken");

    axios
      .get(`${END_POINTS.URL()}/api/products/user/myproducts`, {
        withCredentials: true,
        headers: {
          Authorization: `coderCookieToken=${tokenCookie}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProductos(response.data.payload);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="main__section2 flexcolum">
        <h3 className="main__section2--h3">
          Tus <strong>Productos</strong>
        </h3>
        {error && <Error />}
        {loading && <Loader />}
        <div className="main__section2--cards ms2Cards">
          {productos &&
            productos.map((e, i) => {
              return (
                <CardProduct key={`${e.title} ${i}`} data={e} url="modify" />
              );
            })}
          {productos && productos.length == 0 && (
            <span className="ms2Cards__noItems">
              No tienes productos registrados
              <i className="ri-spam-3-line"></i>
            </span>
          )}
          {/* si da error colocar un mensaje de no autorizado o no esta loqueado depende si hago el redux de login */}
        </div>
      </section>
    </>
  );
}

export default MyProducts;
