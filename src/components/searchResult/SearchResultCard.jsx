import React from "react";
import { Link } from "react-router-dom";

function SearchResultCard({ product: { title, stock, price, _id } }) {
  return (
    <>
      <Link
        to={`/details/${_id}`}
        className="ms2Cards__card flexcolum SearchResultList__card"
      >
        <div className="ms2Cards__card--div SearchResultList__card--imgContainer">
          <img src="images/image 3.png" alt="producto" />
        </div>

        <div className="ms2Cards__card--div  flexcolum SearchResultList__card--description">
          <span>({stock})</span>
          <span>{title}</span>
          <span>
            {" "}
            <strong> $ {price}</strong>
          </span>
        </div>
        <p>
          56% <br />
          OFF{" "}
        </p>
        <span
          className={`ms2Cards__card--span .SearchResultList__card--stock ${
            stock > 0 ? "" : ".SearchResultList__card--noStock "
          } `}
        >
          <i className="ri-check-line"></i> - In Stock
        </span>
      </Link>
    </>
  );
}

export default SearchResultCard;
