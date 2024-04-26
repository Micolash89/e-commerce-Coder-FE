import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { END_POINTS } from "./endPoints";
import axios from "axios";
import "../css/product.css";
import Cookies from "js-cookie";
import Loading2H from "./loaders/Loading2H";
import { useDispatch, useSelector } from "react-redux";
import { messageError, messageOk } from "../redux/features/NotificationSlice";
import NoSession from "./noSession/NoSession";
import noUrl from "../assets/image_3.png";
import { cartAdd } from "../redux/features/CartSlice";

function Product() {
  const [producto, setProduct] = useState({});
  const [cant, setCant] = useState(1);
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const session = useSelector((state) => state.user.session);

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
    if (!session) {
      dispatch(messageError("debes iniciar session"));
      return;
    }
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
      dispatch(
        messageOk(
          `Se agrego ${cant} ${cant == 1 ? "producto" : "productos"} al carrito`
        )
      );
      dispatch(cartAdd(cant));
      setCant(1);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getCart = async () => {
    const TokenCookie = Cookies.get("coderCookieToken");

    try {
      const response = await axios.get(`${END_POINTS.URL()}/api/carts/`, {
        withCredentials: true,
        headers: {
          Authorization: `coderCookieToken=${TokenCookie}`,
        },
      });
      console.log("response: ", response.data);
      setProducts(response.data.payload.products);
      setSubtotal(0);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubtotal = async () => {
    let sub = 0;
    products.forEach(
      (product) => (sub += product.quantity * product.product.price)
    );

    setSubtotal(sub);
  };

  useEffect(() => {
    getProductById();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getCart();
  }, [loading]);

  useEffect(() => {
    if (products) getSubtotal();
  }, [products]);

  return (
    <>
      <section className="singleProduct mediaSingleProduct">
        <section className="singleProduct__section sps1 mediaSingleProductSps1">
          <div className="sps1__picture">
            <img
              src={producto.url || noUrl}
              alt={producto.title}
              title={producto.title}
            />
          </div>
          {/* <div className="sps1__pictures">
            <img src="" alt="imagen preview" />
            <img src="" alt="imagen preview" />
            <img src="" alt="imagen preview" />
          </div> */}
        </section>
        <section className="singleProduct__section sps2 flexcolum mediaSingleProductSps2">
          <h2 className="sps2__name">{producto.title}</h2>

          <p className="sps2__price">${producto.price}</p>

          <ul className="sps2__description">
            <li className="sps2__description--item">
              {" "}
              descripción : {producto.description}
            </li>
            <li className="sps2__description--item">
              {" "}
              categoría : {producto.description}
            </li>
          </ul>

          <span
            className={`sps2__shipping ${
              producto.status ? "freeShipping" : "nofreeShipping"
            } `}
          >
            {producto.status ? "disponible" : "no disponible"}
          </span>

          <span className="sps2__stock">
            {producto.stock != 0 && producto.status ? (
              <>
                <i className="ri-check-line"></i>in stock {producto.stock}
              </>
            ) : (
              <>
                <i className="ri-close-line sps2__stock--iconClose"></i>no stock{" "}
                {producto.stock}
              </>
            )}
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
                disabled={cant === producto.stock || producto.stock === 0}
              >
                +
              </button>
            </div>
            <button
              className={`sps2__sendCart ${
                loading ? "sps2__sendCart--loader" : ""
              } `}
              onClick={addToCart}
              disabled={producto.stock == 0}
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
              {/* <img src="" alt="" /> */}
              {/* <div>
                <span></span>
                <span></span>
              </div>
              <i className="ri-close-line"></i> */}
              {products && session ? (
                products.map((product, index) => (
                  <div key={`${index}-items`} className="flexrow">
                    <span>
                      {product.product.title.length < 10
                        ? product.product.title
                        : product.product.title.slice(0, 10) + "..."}{" "}
                      x {product.quantity}
                    </span>
                    <span>$ {product.quantity * product.product.price}</span>
                  </div>
                ))
              ) : (
                <NoSession />
              )}
            </div>
            <div className="flexrow">
              <span>Sub Total:</span>
              <span>$ {subtotal}</span>
            </div>
          </section>

          <div className="sps3__button flexrow">
            <Link to={"/cart"}>
              <button className="orderSummary__button">
                {<span>ver Cart</span>}
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
