import { Link } from "react-router-dom";
import "../css/header.css";
import { useEffect, useState } from "react";
import HeaderLi from "./HeaderLi";
import Cookies from "js-cookie";

function Header() {
  const [show, setShow] = useState(false);

  let rutas = [
    { url: "/", text: "Home" },
    { url: "/current", text: "Dashboard" },
    { url: "/cart", text: "Cart" },
    { url: "/registerProduct", text: "Registrar Producto" },
    { url: "/myproducts", text: "Mis Productos" },
  ];

  return (
    <>
      <header className="header flexcolum">
        <section className="header__section1 flexrow">
          <span className="header__section1--span">
            {" "}
            Welcome to worldwide Megamart!
          </span>
          <div className="header__section1--div hsDescription">
            <span className="hsDescription__span">
              <i className="ri-map-pin-line"></i> Deliver to{" "}
              <strong>423651</strong>
            </span>
            <span className="hsDescription__span">
              <i className="ri-truck-line"></i> Track your order
            </span>
            <span className="hsDescription__span">
              <i className="ri-discount-percent-line"></i> All Offers
            </span>
          </div>
        </section>
        <section className="header__section2 flexrow">
          <div className="header__section2--div menu">
            <ul
              className={`menu__list  ${show ? "showMenu" : "showHidde"}`}
              onMouseLeave={() => setShow(false)}
            >
              {rutas.map((item, index) => (
                <HeaderLi key={`${item.text} ${index}`} item={item} />
              ))}
            </ul>
            <h1 className="menu__button ">
              {" "}
              <i className="ri-menu-line" onMouseOver={() => setShow(true)}></i>
              <Link to={"/"}>
                <strong>MegaMart</strong>
              </Link>
            </h1>
          </div>
          <div className="header__search flexrow">
            <label className="header__search--label">
              <i className="ri-search-line"></i>
              <input
                type="search"
                placeholder="Search essentials, groceries and more..."
              />
              <i className="ri-list-check"></i>
            </label>
            <div className="header__search--login login">
              <i className="ri-user-3-line"></i>
              <strong>
                <Link to={"/register"}>Sign Up</Link>/
                <Link to={"/login"}>Sign In</Link>
              </strong>{" "}
            </div>
            {/* solucionar error de la etiqueta a */}
            <Link to={"cart"} className="header__search--cart cart">
              <i className="ri-shopping-cart-line"></i>
              <strong>Cart</strong>
            </Link>
          </div>
        </section>
      </header>
    </>
  );
}

export default Header;
