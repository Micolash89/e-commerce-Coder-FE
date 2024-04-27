import { Link } from "react-router-dom";
import noUrl from "../../assets/image_3.png";

function SearchResultCard({
  product: { title, stock, price, _id, url, status },
}) {
  return (
    <>
      <Link
        to={`/details/${_id}`}
        className="ms2Cards__card flexcolum SearchResultList__card"
      >
        <div className="ms2Cards__card--div SearchResultList__card--imgContainer">
          <img src={url || noUrl} alt="producto" />
          {!status && (
            <div className="noDisponible">
              <span>no disponible</span>
            </div>
          )}
        </div>

        <div className="ms2Cards__card--div  flexcolum SearchResultList__card--description">
          <span>({status ? stock : 0})</span>
          <span>{title.length < 21 ? title : title.slice(0, 22) + "..."}</span>
          <span>
            {" "}
            <strong> $ {price}</strong>
          </span>
        </div>
        {/* <p>
          56% <br />
          OFF{" "}
        </p> */}
        <span
          className={`ms2Cards__card--span SearchResultList__card--stock ${
            stock > 0 && status ? "" : "SearchResultList__card--noStock "
          } `}
        >
          {stock > 0 && status ? (
            <>
              <i className="ri-check-line"></i>
              <span> En Stock</span>
            </>
          ) : (
            <>
              <i className="ri-close-line"></i>
              <span> Sin Stock</span>
            </>
          )}
        </span>
      </Link>
    </>
  );
}

export default SearchResultCard;
