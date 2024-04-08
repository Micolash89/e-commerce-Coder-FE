import React, { useEffect, useState } from "react";
import "../css/cart.css";
import CartItem from "./CartItem";
import Cookies from "js-cookie";
import { END_POINTS } from "./endPoints";
import axios from "axios";

function Cart() {
  const [products, setProducts] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [deleteButton, setDeleteButton] = useState(false);

  const placeOrder = async () => {
    const TokenCookie = Cookies.get("coderCookieToken");

    try {
      const response = await axios.post(
        `${END_POINTS.URL()}/api/carts/purchase`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `coderCookieToken=${TokenCookie}`,
          },
        }
      );
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async () => {
    const TokenCookie = Cookies.get("coderCookieToken");

    try {
      console.log(TokenCookie);

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

  console.log("products: ", products);
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
            {products &&
              products.map((product, index) => (
                <CartItem
                  key={index}
                  title={product.product.title}
                  price={product.product.price}
                  quantity={product.quantity}
                  stock={product.product.stock}
                  id={product.product._id}
                  setDeleteButton={setDeleteButton}
                />
              ))}
          </section>

          <section className="orderSummary flexcolum">
            <h4 className="orderSummary__title">Order Summary</h4>
            <section className="orderSummary__description flexcolum">
              {/* <div className="flexrow">
              {products.map((product, index) => (
                <>
                  {}
                  <span>Sub Total:</span>
                  <span>${product.quantity * product.product.price}</span>
                </>
              ))}
            </div> */}
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
