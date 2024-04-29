import { Link } from "react-router-dom";

function HeaderLi({ item: { url, text, icon } }) {
  return (
    <>
      <Link to={`${url}`} className="menu__item">
        <li>
          {icon} {text}
        </li>
      </Link>
    </>
  );
}

export default HeaderLi;
