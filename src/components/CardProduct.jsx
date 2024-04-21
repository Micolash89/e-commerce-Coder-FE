import { Link } from "react-router-dom";
import phone from "../assets/image_3.png";

function CardProduct({ data: { _id, title, price, category }, url }) {
  return (
    <>
      <Link to={`/${url}/${_id}`} className="ms2Cards__card flexcolum">
        <div className="ms2Cards__card--div">
          <img src={phone} alt="producto" />
        </div>

        <div className="ms2Cards__card--div  flexcolum">
          <span>{title}</span>
          <span>
            {" "}
            <strong>$ {price}</strong>
          </span>
        </div>
        {/* <p>
          56% <br />
          OFF{" "}
        </p> */}
        <span className="ms2Cards__card--span"> {category}</span>
      </Link>
    </>
  );
}

export default CardProduct;
