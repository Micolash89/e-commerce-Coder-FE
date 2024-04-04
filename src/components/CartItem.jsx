import React from "react";

function CartItem({ title, price, quantity }) {
  return (
    <>
      <section className="cart__card flexrow">
        <div className="cart__card--product ccp flexcolum">
          <div className="ccp__img">
            <img src="images/image 3.png" alt="" />
          </div>
          <p className="ccp__info">
            SAVE
            <strong>$199.00</strong>
          </p>
        </div>

        <div className="cart__card--info cci flexcolum">
          <p>{title}</p>
          <span>${price}</span>
          <div>
            <span>
              <button>-</button>
              <span>{quantity}</span>
              <button>+</button>
            </span>
          </div>
          <div className="flexrow">
            <span
              className="
            freeShipping"
            >
              free Shipping
            </span>
          </div>
          <span className="inStock">
            <i className="ri-check-line"></i>
            in stock
          </span>
        </div>
      </section>
    </>
  );
}

export default CartItem;
