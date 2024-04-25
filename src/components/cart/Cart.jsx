import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "../cart/cart.css";
import CartItem from "./CartItem";
import Cookies from "js-cookie";
import { END_POINTS } from "../endPoints";
import axios from "axios";
import NoSession from "../noSession/NoSession";
import { useSelector } from "react-redux";
import {
  messageError,
  messageOk,
} from "../../redux/features/NotificationSlice";
import Loading2H from "../loaders/Loading2H";
import { cartAdd, cartSet } from "../../redux/features/CartSlice";

function Cart() {
  const [products, setProducts] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [deleteButton, setDeleteButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const session = useSelector((state) => state.user.session);
  const dispatch = useDispatch();
  const TokenCookie = Cookies.get("coderCookieToken");

  const placeOrder = async () => {
    setLoading(true);
    axios
      .post(
        `${END_POINTS.URL()}/api/carts/purchase`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `coderCookieToken=${TokenCookie}`,
          },
        }
      )
      .then((response) => {
        console.log("response purchase", response);
        setProducts(response.data.productsLeft);

        dispatch(cartSet());
        if (response.data.productsLeft.length > 0) {
          response.data.productsLeft.forEach((product) => {
            dispatch(cartAdd(product.quantity));
          });

          dispatch(messageOk("algunos productos no estan disponibles"));
        } else {
          dispatch(messageOk("se realizo la compra"));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(messageError("ocurrio un error"));
      })
      .finally(() => {
        setLoading(false);
        window.scrollTo(0, 0);
      });
  };

  const getCart = async () => {
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
    products.forEach((product) => {
      sub += product.product.status
        ? product.quantity * product.product.price
        : 0;
    });

    setSubtotal(sub);
  };

  useEffect(() => {
    const TokenCookie = Cookies.get("coderCookieToken");

    if (!TokenCookie) return;

    getCart();
    setDeleteButton(false);
  }, [deleteButton]);

  useEffect(() => {
    if (products) getSubtotal();
  }, [products]);

  return (
    <>
      {
        <section className="cartView flexrow">
          <section className="cart cartView__cart flexcolum">
            {session && products && products.length != 0 ? (
              products.map((product, index) => (
                <CartItem
                  key={index + product.product.title}
                  title={product.product.title}
                  price={product.product.price}
                  quantity={product.quantity}
                  stock={product.product.stock}
                  id={product.product._id}
                  url={product.product.url}
                  status={product.product.status}
                  setDeleteButton={setDeleteButton}
                />
              ))
            ) : (
              <div className="cartView__empty">
                <span>no hay productos en el carrito</span>
                <i className="ri-shopping-cart-line"></i>
              </div>
            )}
          </section>

          <section className="orderSummary flexcolum">
            <NoSession />
            <h4 className="orderSummary__title">Order Summary</h4>
            <section className="orderSummary__description flexcolum">
              <div className="flexcolum">
                {session &&
                  products &&
                  products.map((product, index) => (
                    <div key={`${index}-items`} className="flexrow">
                      {product.product.status ? (
                        <>
                          <span>
                            {product.product.title.length < 8
                              ? product.product.title + " "
                              : product.product.title.slice(0, 8) + "... "}
                            X {product.quantity}
                          </span>
                          <span>
                            ${product.quantity * product.product.price}
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
              </div>
              <div className="flexrow">
                <span>order Total:</span>
                {<span>${subtotal}</span>}
              </div>
            </section>
            <button
              className={`orderSummary__button ${loading ? "oSb" : ""}`}
              onClick={placeOrder}
            >
              {!loading ? (
                <span>Realizar pedido</span>
              ) : (
                <Loading2H className="sps2__loading " />
              )}
            </button>
          </section>
        </section>
      }
    </>
  );
}

export default Cart;
