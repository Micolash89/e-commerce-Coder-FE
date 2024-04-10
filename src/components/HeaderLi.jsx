import React from "react";
import { Link } from "react-router-dom";

function HeaderLi({ item: { url, text } }) {
  return (
    <>
      <Link to={`${url}`} className="menu__item">
        <li>{text}</li>
      </Link>
    </>
  );
}

export default HeaderLi;
