import CardProduct from "../CardProduct";
import "../home/section2.css";
import { useContext, useEffect, useState } from "react";
import Loader from "../loaders/Loader";
import Error from "../Error";
import { END_POINTS } from "../endPoints";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import Categories from "./Categories";
import Banner from "./Banner";

function Section2() {
  const getViewPortWidth = (viewPort) => {
    if (viewPort >= 1300) return 5;
    if (viewPort >= 1038) return 4;
    if (viewPort >= 775) return 3;
    if (viewPort >= 410) return 2;
    return 1;
  };

  const [productos, setProductos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { theme } = useContext(ThemeContext);

  const limit = getViewPortWidth(window.innerWidth);

  const session = useSelector((state) => state.user.session);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    setError(false);

    axios
      .get(`${END_POINTS.URL()}/api/products?limit=${limit}`)
      .then((response) => {
        setProductos(response.data.payload);
        console.log(response);
        console.log("session", session, "usuario", user);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePageSlice = (endpoint) => {
    if (endpoint == "next" && productos.hasNextPage) {
      getPage(productos.nextLink);
    } else {
      if (productos.hasPrevPage) {
        getPage(productos.prevLink);
      }
    }
  };

  const getPage = (url) => {
    axios
      .get(`${END_POINTS.URL()}${url}&&limit=${limit}`)
      .then((response) => {
        console.log("axios", response);
        setProductos(response.data.payload);
        console.log("productos", productos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Banner />

      {productos && (
        <section className={`main__section2 flexcolum  ${theme}`}>
          <h3 className="main__section2--h3">
            Consigue la mejor oferta en cualquier <strong>Producto</strong>
          </h3>
          {error && <Error />}
          {loading && <Loader />}

          <div
            className={`main__section2--cards ms2Cards  ${
              productos.docs.length < limit ? " " : "main__section2--home"
            }`}
          >
            <button
              className={` previewUrl ${
                productos.hasPrevPage ? "" : "haspage"
              }`}
              onClick={() => {
                handlePageSlice("preview");
              }}
              disabled={productos.prevLink == ""}
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            {productos &&
              productos.docs.map((e, i) => {
                return (
                  <CardProduct key={`${i} ${e.title}`} data={e} url="details" />
                );
              })}

            <button
              className={`nextUrl ${productos.hasNextPage ? "" : "haspage"}`}
              onClick={() => {
                handlePageSlice("next");
              }}
              disabled={productos.nextLink == ""}
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </section>
      )}
      <Categories />
    </>
  );
}

export default Section2;
