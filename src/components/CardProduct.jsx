import phone from "../assets/image_3.png";

function CardProduct({ data: { title, price, category } }) {
  return (
    <>
      <div className="section2Container__card">
        <img className="section2Container__card--img" src={phone} alt="" />
        <div className="section2Container__card--div">
          <span>nombre: {title}</span>
          <br />
          <span>precio: $ {price}</span>
        </div>
        <span className="section2Container__card--span">
          categoria: {category}
        </span>
      </div>
    </>
  );
}

export default CardProduct;
