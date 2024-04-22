import { useEffect, useState } from "react";
import "../cart/cart.css";
import CartItem from "./CartItem";
import Cookies from "js-cookie";
import { END_POINTS } from "../endPoints";
import axios from "axios";
import NoSession from "../noSession/NoSession";
import { useSelector } from "react-redux";

function Cart() {
  const [products, setProducts] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [deleteButton, setDeleteButton] = useState(false);

  const session = useSelector((state) => state.user.session);

  const placeOrder = async () => {
    const TokenCookie = Cookies.get("coderCookieToken");

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
        console.log("response", response);
      })
      .catch((error) => {
        console.log(error);
      });
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
            {session &&
              products &&
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
              ))}
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
            <button className="orderSummary__button" onClick={placeOrder}>
              Place Order
            </button>
          </section>
        </section>
      }
    </>
  );
}

export default Cart;
