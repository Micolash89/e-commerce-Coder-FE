import { Link } from "react-router-dom";
import "../css/header.css";

function Header() {
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
            <ul className="menu__list">
              <li className="menu__item">
                <a href="#" className="menu__item--link">
                  Home
                </a>
              </li>
              <li className="menu__item">
                <a href="#" className="menu__item--link">
                  Home
                </a>
              </li>
              <li className="menu__item">
                <a href="#" className="menu__item--link">
                  Home
                </a>
              </li>
              <li className="menu__item">
                <a href="#" className="menu__item--link">
                  Home
                </a>
              </li>
              <li className="menu__item">
                <a href="#" className="menu__item--link">
                  Home
                </a>
              </li>
            </ul>
            <h1 className="menu__button ">
              {" "}
              <i className="ri-menu-line"></i>
              <strong>MegaMart</strong>
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
            <a className="header__search--login login">
              <i className="ri-user-3-line"></i>
              <strong>
                <Link to={"/register"}>Sign Up</Link>/
                <Link to={"/login"}>Sign In</Link>
              </strong>{" "}
            </a>
            <a href="#" className="header__search--cart cart">
              <i className="ri-shopping-cart-line"></i>
              <strong>Cart</strong>
            </a>
          </div>
        </section>
      </header>
    </>
  );
}

export default Header;
