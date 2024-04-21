import { Link, useNavigate } from "react-router-dom";
import "../css/header.css";
import { useContext, useState } from "react";
import HeaderLi from "./HeaderLi";
import Cookies from "js-cookie";
import { ThemeContext } from "./context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { logOutSession } from "../redux/features/UserSlice";
import axios from "axios";
import { END_POINTS } from "./endPoints";
import { setProducts } from "../redux/features/SearchResult";
import { messageOk } from "../redux/features/NotificationSlice";

function Header() {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");

  const user = useSelector((state) => state.user.user);
  const session = useSelector((state) => state.user.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    { url: "/profile", text: "Perfil" },
  ];

  const handleLightDarkMode = () => {
    setThemeMenu(!themeMenu);
    Cookies.set("theme", !themeMenu, { expires: 7 });
    handleTheme(!themeMenu ? "ligth" : "dark");
  };

  const handleLogout = () => {
    axios.get(`${END_POINTS.URL()}/api/sessions/logout`).then((response) => {
      console.log("logout", response.data);
      Cookies.remove("coderCookieToken");
      dispatch(messageOk("session cerrada"));
      dispatch(logOutSession());
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    axios
      .get(`${END_POINTS.URL()}/api/products/custom/search?search=${query}`)
      .then((response) => {
        console.log(response.data);
        dispatch(setProducts(response.data.payload));
        navigate(`/search/${query}`);
      });
  };

  return (
    <>
      <header className={`header flexcolum  ${theme} `}>
        <section className={`header__section1 flexrow ${theme}`}>
          <span className="header__section1--span">
            {" "}
            Bienvenido a Megamart!
            <span> {session ? user.first_name : ""}</span>
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
            <form onSubmit={handleSearch}>
              <label className="header__search--label">
                <i className="ri-search-line"></i>
                <input
                  type="search"
                  placeholder="Search essentials, groceries and more..."
                  name="search"
                  onChange={(e) => setQuery(e.target.value)}
                />
                <i className="ri-list-check"></i>
              </label>
            </form>
            <div className="header__search--login login hslogin flexrow">
              <strong className={`flexrow ${session ? "hidden" : " "}`}>
                <i className="ri-user-3-line"></i>
                <Link to={"/register"}>Sign Up</Link>
                <span> / </span>
                <Link to={"/login"}>Sign In</Link>
              </strong>
              <div className={`flexrow ${session ? " " : "hidden"}`}>
                <button
                  type="button"
                  className={`flexrow`}
                  onClick={handleLogout}
                >
                  <i className="ri-logout-box-r-line"></i>
                  <strong>logout</strong>
                </button>
              </div>
            </div>
            {/* solucionar error de la etiqueta a */}
            <Link to={"cart"} className="header__search--cart hsc">
              <i className="ri-shopping-cart-line hsc__icon"></i>
              <strong>Cart</strong>
            </Link>

            <div className="header__search--theme">
              <button type="button">
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
