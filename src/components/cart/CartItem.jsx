import axios from "axios";
import { END_POINTS } from "../endPoints";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { messageOk } from "../../redux/features/NotificationSlice";
import noUrl from "../../assets/image_3.png";
import { cartRemove } from "../../redux/features/CartSlice";

function CartItem({
  title,
  price,
  quantity,
  stock,
  id,
  setDeleteButton,
  url,
  status,
  setPreferenceId,
}) {
  const dispatch = useDispatch();

  const removeProduct = async () => {
    const TokenCookie = Cookies.get("coderCookieToken");

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
      setPreferenceId(false);
      dispatch(cartRemove(quantity));
      dispatch(messageOk("se elimino el producto del carrito"));
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="cart__card flexrow">
        <div className="cart__card--product ccp ccp2 flexcolum">
          <div className="ccp__img">
            <img src={url || noUrl} alt={title} title={title} />
          </div>
        </div>

        <div className="cart__card--remove" onClick={removeProduct}>
          <i className="ri-close-line "></i>
        </div>

        <div className="cart__card--info cci flexcolum">
          <p>
            {title} X <span>{quantity}</span>
          </p>
          <span>${price} X unid.</span>

          <div className="flexrow">
            <span
              className={`sps2__shipping  cci__shipping ${
                status ? "freeShipping" : "nofreeShipping"
              } `}
            >
              {status ? "disponible" : "no disponible"}
            </span>
          </div>
          <span className="inStock">
            {stock != 0 && status ? (
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
