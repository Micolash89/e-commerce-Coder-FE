import React from "react";
import { Link } from "react-router-dom";

function CategorieList({ name }) {
  return (
    <>
      <Link to={`/search/${name}`} className="ms3Cards__card flexcolum">
        <div className="ms3Cards__card--img">
          <img src="images/image 3 (1).png" alt="" />
        </div>

        <span className="ms3Cards__card--name">{name}</span>
      </Link>
    </>
  );
}

export default CategorieList;
