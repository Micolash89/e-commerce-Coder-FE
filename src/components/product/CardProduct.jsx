import { Link } from "react-router-dom";
import phone from "../../assets/image_3.png";

function CardProduct({ data, url }) {
  return (
    <>
      <Link to={`/${url}/${data._id}`} className="ms2Cards__card flexcolum">
        <div className="ms2Cards__card--div">
          <img src={data.url || phone} alt="producto" />
        </div>

        <div className="ms2Cards__card--div  flexcolum">
          <span>
            {data.title.length < 15
              ? data.title
              : data.title.slice(0, 15) + " ..."}
          </span>
          <span>
            {" "}
            <strong>$ {data.price}</strong>
          </span>
        </div>
        {/* <p>
          56% <br />
          OFF{" "}
        </p> */}
        <span className="ms2Cards__card--span"> {data.category}</span>
      </Link>
    </>
  );
}

export default CardProduct;
