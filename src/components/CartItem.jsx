import axios from "axios";
import { END_POINTS } from "./endPoints";
import Cookies from "js-cookie";
import Notification from "./Notification";

function CartItem({ title, price, quantity, stock, id, setDeleteButton }) {
  const removeProduct = async () => {
    const TokenCookie = Cookies.get("coderCookieToken");
    console.log("dentre");
    try {
      const response = await axios.delete(
        `${END_POINTS.URL()}/api/carts/products/${id}`,

        {
          withCredentials: true,
          headers: {
            Authorization: `coderCookieToken=${TokenCookie}`,
          },
        }
      );

      console.log(response.data);
      setDeleteButton(true);
    } catch (error) {
      console.log(error);
    }
  };

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

        <div className="cart__card--remove" onClick={removeProduct}>
          <i className="ri-close-line "></i>
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
            {stock != 0 ? (
              <>
                <i className="ri-check-line"></i>
                in stock : {stock}
              </>
            ) : (
              <>
                <i className="ri-close-line noStock"></i>
                no stock : {stock}
              </>
            )}
          </span>
        </div>
      </section>
    </>
  );
}

export default CartItem;
