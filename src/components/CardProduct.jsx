import phone from "../assets/image_3.png";

function CardProduct({ data: { title, price, category } }) {
  return (
    <>
      <a href="#" className="ms2Cards__card flexcolum">
        <div className="ms2Cards__card--div">
          <img src={phone} alt="producto" />
        </div>

        <div className="ms2Cards__card--div  flexcolum">
          <span>{title}</span>
          <span>
            {" "}
            <strong> {price}</strong>
            ₹74999
          </span>
        </div>
        <p>
          56% <br />
          OFF{" "}
        </p>
        <span className="ms2Cards__card--span">{category}</span>
      </a>
    </>
  );
}

export default CardProduct;
