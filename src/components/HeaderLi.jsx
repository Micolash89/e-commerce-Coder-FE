import React from "react";
import { Link } from "react-router-dom";

function HeaderLi({ item: { url, text } }) {
  return (
    <>
      <li className="menu__item">
        <Link to={`${url}`}>{text}</Link>
      </li>
    </>
  );
}

export default HeaderLi;
