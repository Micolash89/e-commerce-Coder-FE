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
import { setSession } from "../../redux/features/UserSlice";

function Section2() {
  const [productos, setProductos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("");
  const [error, setError] = useState(false);
  const { theme } = useContext(ThemeContext);
  const tokenCookie = Cookies.get("coderCookieToken");

  const session = useSelector((state) => state.user.session);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    setError(false);
    axios
      .get(`${END_POINTS.URL()}/api/products`)
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

    axios
      .get(`${END_POINTS.URL()}/api/sessions/current`, {
        withCredentials: true,
        headers: {
          Authorization: `coderCookieToken=${tokenCookie}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(setSession(response.data.payload.user));
      })
      .catch((error) => {
        console.log("usuario no logueado", error);
      });
  }, []);

  useEffect(() => {
    if (!productos) return;

    const url = page == "preview" ? productos.prevLink : productos.nextLink;
    console.log("url", url);
    console.log("url", typeof url);

    axios
      .get(`${END_POINTS.URL()}${url}`)
      .then((response) => {
        console.log("axios", response);
        setProductos(response.data.payload);
        console.log("productos", productos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  return (
    <>
      {productos && (
        <section className={`main__section2 flexcolum  ${theme}`}>
          <h3 className="main__section2--h3">
            Grab the best deal on <strong>Smartphones</strong>
          </h3>
          {error && <Error />}
          {loading && <Loader />}

          <div className="main__section2--cards ms2Cards">
            <button
              className={` previewUrl ${
                productos.hasPrevPage ? "" : "haspage"
              }`}
              onClick={() => {
                setPage("preview");
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
                setPage("next");
              }}
              disabled={productos.nextLink == ""}
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default Section2;
