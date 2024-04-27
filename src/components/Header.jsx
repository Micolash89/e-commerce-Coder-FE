import { Link, useNavigate } from "react-router-dom";
import "../css/header.css";
import { useContext, useEffect, useState } from "react";
import HeaderLi from "./HeaderLi";
import Cookies from "js-cookie";
import { ThemeContext } from "./context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { logOutSession, setSession } from "../redux/features/UserSlice";
import axios from "axios";
import { END_POINTS } from "./endPoints";
import { setProducts } from "../redux/features/SearchResult";
import { messageError, messageOk } from "../redux/features/NotificationSlice";
import { cartAdd, cartSet } from "../redux/features/CartSlice";

function Header() {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [modalLogin, setmodalLogin] = useState(false);
  console.log(modalLogin);
  const user = useSelector((state) => state.user.user);
  const session = useSelector((state) => state.user.session);
  const cartCant = useSelector((state) => state.cart.cant);
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
    { url: "/", text: "Home", icon: <i className="ri-home-3-line"></i> },
    {
      url: "/current",
      text: "Dashboard",
      icon: <i className="ri-settings-3-line"></i>,
    },
    {
      url: "/cart",
      text: "Cart",
      icon: <i className="ri-shopping-cart-2-line"></i>,
    },
    {
      url: "/registerProduct",
      text: "Registrar Producto",
      icon: <i className="ri-file-edit-line"></i>,
    },
    {
      url: "/myproducts",
      text: "Mis Productos",
      icon: <i className="ri-survey-line"></i>,
    },
    {
      url: "/profile",
      text: "Perfil",
      icon: <i className="ri-settings-3-line"></i>,
    },
    {
      url: "/tickets",
      text: "Mis Tickets",
      icon: <i className="ri-shopping-bag-line"></i>,
    },
  ];

  const modalLoginChange = () => {
    if (show) setShow(false);
    setmodalLogin(!modalLogin);
  };

  const menuShow = () => {
    if (modalLogin) setmodalLogin(false);
    setShow(!show);
  };

  const handleLightDarkMode = () => {
    setThemeMenu(!themeMenu);
    Cookies.set("theme", !themeMenu, { expires: 7 });
    handleTheme(!themeMenu ? "ligth" : "dark");
  };

  const handleLogout = () => {
    axios
      .get(`${END_POINTS.URL()}/api/sessions/logout`)
      .then((response) => {
        console.log("logout", response.data);
      })
      .finally(() => {
        dispatch(messageOk("session cerrada"));
        Cookies.remove("coderCookieToken");
        dispatch(logOutSession());
        dispatch(cartSet());
        navigate("/login");
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.length < 2) {
      dispatch(messageError("Ingrese al menos dos letras"));
      return;
    }
    axios
      .get(`${END_POINTS.URL()}/api/products/custom/search?search=${query}`)
      .then((response) => {
        console.log(response.data);
        dispatch(setProducts(response.data.payload));
        navigate(`/search/${query}`);
      });
  };

  const handleCart = (cookieToken) => {
    try {
      axios
        .get(`${END_POINTS.URL()}/api/carts/`, {
          withCredentials: true,
          headers: {
            Authorization: `coderCookieToken=${cookieToken}`,
          },
        })
        .then((response) => {
          dispatch(cartSet(0));
          console.log(response.data);
          console.log("response: cart", response.data.payload.products);
          response.data.payload.products.map((item) =>
            dispatch(cartAdd(item.quantity))
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const cookieToken = Cookies.get("coderCookieToken");

    if (cookieToken) {
      axios
        .get(`${END_POINTS.URL()}/api/sessions/current`, {
          withCredentials: true,
          headers: {
            Authorization: `coderCookieToken=${cookieToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          dispatch(setSession(response.data.payload.user));
        })
        .catch((err) => {
          console.log("usuario no loguado", err);
        });

      handleCart(cookieToken);
    }
  }, []);

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
        <section className=" flexrow header__section2">
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
              <i
                className="ri-menu-line"
                onMouseOver={menuShow}
                onClick={menuShow}
              ></i>
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
                  placeholder="Buscar Producto"
                  name="search"
                  minLength={2}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <i className="ri-list-check"></i>
              </label>
            </form>
            <div className="header__search--login login hslogin flexrow">
              <strong className={`flexrow ${session ? "hidden" : " "}`}>
                <i className="ri-user-3-line" onClick={modalLoginChange}></i>
                <Link
                  to={"/register"}
                  className={`${modalLogin ? "showLogin" : ""}`}
                  onMouseLeave={() => setmodalLogin(false)}
                >
                  <i className="ri-user-add-line"></i>
                  Registrar
                </Link>
                <span> / </span>
                <Link
                  to={"/login"}
                  className={`${modalLogin ? "showLogin" : ""}`}
                  onMouseLeave={() => setmodalLogin(false)}
                >
                  <i className="ri-user-follow-line"></i>
                  Login
                </Link>
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
              <div
                className={`cartCount ${cartCant ? "" : "cartCountdisplay"}`}
              >
                <span>{cartCant}</span>
              </div>
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
