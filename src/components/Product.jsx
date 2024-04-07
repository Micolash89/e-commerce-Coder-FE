import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { END_POINTS } from "./endPoints";
import axios from "axios";
import "../css/product.css";
import Cookies from "js-cookie";
import Loader from "./Loader";
import Loading2H from "./Loading2H";

function Product() {
  const [producto, setProduct] = useState({});
  //const [producto, setProduct] = useState({});
  const [cant, setCant] = useState(1);
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // const {id}  = useSearchParams();
  const { pathname } = useLocation();

  const getProductById = async () => {
    try {
      const response = await axios.get(
        `${END_POINTS.URL()}/api/products/${id}`
      );
      console.log("response: ", response.data);
      setProduct(response.data.payload);
      console.log("user: ", producto);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    const TokenCookie = Cookies.get("coderCookieToken");
    setLoading(true);
    setError(false);
    try {
      const response = await axios.post(
        `${END_POINTS.URL()}/api/carts/products/${id}`,
        { quantity: cant },
        {
          withCredentials: true,
          headers: {
            Authorization: `coderCookieToken=${TokenCookie}`,
          },
        }
      );
      console.log("response: ", response.data);
      // setUser(response.data.payload.user);
      // console.log("user: ", user);
      setCant(1);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  //w115
  //h47rfce
  useEffect(() => {
    getProductById();
    console.log("path" + pathname);
  }, []);

  return (
    <>
      <section className="singleProduct">
        <section className="singleProduct__section sps1">
          <div className="sps1__picture">
            <img src="images/3 → prod8.jpg.png" alt="imagen producto" />
          </div>
          {/* <div className="sps1__pictures">
            <img src="" alt="imagen preview" />
            <img src="" alt="imagen preview" />
            <img src="" alt="imagen preview" />
          </div> */}
        </section>
        <section className="singleProduct__section sps2 flexcolum">
          <h2 className="sps2__name">{producto.title}</h2>

          <p className="sps2__price">${producto.price}</p>

          <ul className="sps2__description">
            <li className="sps2__description--item">
              {" "}
              descripcion : {producto.description}
            </li>
          </ul>

          <span className="sps2__shipping">free shipping</span>

          <span className="sps2__stock">
            <i className="ri-check-line"></i>in stock: {producto.stock}
          </span>

          <div className="sps2__addcart flexrow">
            <div className="flexrow">
              <button
                className="previewbtn"
                onClick={() => setCant(cant - 1)}
                disabled={cant === 1}
              >
                -
              </button>
              <span>{cant}</span>
              <button
                className="nextbtn"
                onClick={() => setCant(cant + 1)}
                disabled={cant === producto.stock}
              >
                +
              </button>
            </div>
            <button
              className={`sps2__sendCart ${
                loading ? "sps2__sendCart--loader" : ""
              } `}
              onClick={addToCart}
            >
              {loading && <Loading2H className="sps2__loading " />}
              {!loading && <span>Add To Cart</span>}
            </button>
            <i className="ri-heart-line"></i>
          </div>
        </section>
        <section className="orderSummary sps3 flexcolum">
          <h4 className="orderSummary__title">Your Cart</h4>

          <section className="orderSummary__description flexcolum">
            <div className="flexcolum">
              <img src="" alt="" />
              <div>
                <p></p>
                <span></span>
              </div>
              <i className="ri-close-line"></i>
            </div>
            <div className="flexrow">
              <span>Sub Total:</span>
              <span>$1,000.00</span>
            </div>
          </section>

          <div className="sps3__button flexrow">
            <Link to={"/cart"}>
              <button className="orderSummary__button">
                {<span>View cart</span>}
              </button>
            </Link>
            <button className="orderSummary__button">Checkout</button>
          </div>
        </section>
      </section>
    </>
  );
}

export default Product;
