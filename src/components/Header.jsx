import { Link } from "react-router-dom";
import "../css/header.css";
import { useContext, useState } from "react";
import HeaderLi from "./HeaderLi";
import Cookies from "js-cookie";
import { ThemeContext } from "./context/ThemeContext";

function Header() {
  const [show, setShow] = useState(false);

  let cookieTheme = Cookies.get("theme");

  if (cookieTheme == undefined) {
    Cookies.set("theme", "true", { expires: 7 });
    cookieTheme = "true";
  }

  const cookieValue = cookieTheme.includes("true");

  const [themeMenu, setThemeMenu] = useState(cookieValue);

  const { theme, handleTheme } = useContext(ThemeContext);

  let rutas = [
    { url: "/", text: "Home" },
    { url: "/current", text: "Dashboard" },
    { url: "/cart", text: "Cart" },
    { url: "/registerProduct", text: "Registrar Producto" },
    { url: "/myproducts", text: "Mis Productos" },
  ];

  const handleLightDarkMode = () => {
    setThemeMenu(!themeMenu);
    Cookies.set("theme", !themeMenu, { expires: 7 });

    handleTheme(!themeMenu ? "ligth" : "dark");
  };

  return (
    <>
      <header className={`header flexcolum  ${theme} `}>
        <section className={`header__section1 flexrow ${theme}`}>
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
            <div className="header__search--login login hslogin flexrow">
              <i className="ri-user-3-line"></i>
              <strong className="flexrow">
                <Link to={"/register"}>Sign Up</Link>
                <span> / </span>
                <Link to={"/login"}>Sign In</Link>
              </strong>
              <div className="flexrow">
                <i className="ri-logout-box-r-line"></i>
                <strong>logout</strong>
              </div>
            </div>
            {/* solucionar error de la etiqueta a */}
            <Link to={"cart"} className="header__search--cart hsc">
              <i className="ri-shopping-cart-line hsc__icon"></i>
              <strong>Cart</strong>
            </Link>

            <div className="header__search--theme">
              <button>
                <i
                  className={` ${themeMenu ? "ri-sun-line" : "ri-moon-line"}`}
                  onClick={handleLightDarkMode}
                ></i>
              </button>
            </div>
          </div>
        </section>
      </header>
    </>
  );
}

export default Header;
