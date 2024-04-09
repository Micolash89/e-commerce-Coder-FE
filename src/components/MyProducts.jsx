import CardProduct from "./CardProduct";
import "../css/section2.css";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Error from "./Error";
import { END_POINTS } from "./endPoints";
import { Link } from "react-router-dom";
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
      .get(
        `${END_POINTS.URL()}/api/products/user/myproducts`,

        {
          withCredentials: true,
          headers: {
            Authorization: `coderCookieToken=${tokenCookie}`,
          },
        }
      )
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

    // fetch(`${END_POINTS.URL()}/api/products`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setProductos(data.payload.docs);
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     setError(true);
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
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
                <>
                  <CardProduct
                    key={`${i} ${e.title}`}
                    data={e}
                    url="modificar"
                  />
                  ;
                </>
              );
            })}
        </div>
      </section>
    </>
  );
}

export default MyProducts;
