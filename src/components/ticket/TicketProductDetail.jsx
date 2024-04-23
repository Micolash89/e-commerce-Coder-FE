import noUrl from "../../assets/image_3.png";

function TicketProductDetail({ products: { product, quantity } }) {
  //   const product = {
  //     title: "dsadasdsadas",
  //     category: "dsadsadsa",
  //     price: 10000,
  //     url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCGSOCNO65ZY85C20VPTyV91UmpKPx5j5Y5eXuM9v0kQ&s",
  //   };
  //   const quantity = 1;
  return (
    <>
      <section className="cart__card ticketProductCard flexrow">
        <section className="flexrow">
          <div className="cart__card--product ccp flexcolum">
            <div className="ccp__img">
              <img
                src={product.url || noUrl}
                alt={product.title}
                title={product.title}
              />
            </div>
          </div>

          <div className="cart__card--info cci ticketProductCard__info flexcolum ">
            <p>{product.title}</p>
            <p>{product.category}</p>
            <p> ${product.price}</p>
            <p>Cant.: {quantity}</p>
          </div>
        </section>
        <div className="flexrow">
          <span>$ {product.price * quantity}</span>
        </div>
      </section>
    </>
  );
}

export default TicketProductDetail;
