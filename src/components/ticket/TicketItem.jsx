import { Link } from "react-router-dom";

function TicketItem({ ticket }) {
  const format = (date, locale, options) =>
    new Intl.DateTimeFormat(locale, options).format(date);
  const day = new Date(ticket.purchase_datetime);

  const fecha = format(day, "es");

  console.log("ticket", ticket);
  return (
    <>
      <Link
        to={`/tickets/details/${ticket._id}`}
        className="ticketCard__section flexrow"
      >
        {/* <div className="ticketCard__section--product  tsp flexcolum">
          <div className="tsp__img">
            <img src="images/image 3.png" alt="title" title="title" />
          </div>
        </div> */}

        <div className="ticketCard__section--info tsi  flexcolum">
          <span className="tsi__span">
            fecha:
            <strong> {fecha}</strong>
          </span>
          <h4 className="tsi__p">
            código:
            <strong>{ticket.code}</strong>
          </h4>
          <ul className="tsi__list flexrow">
            {ticket.products.length}{" "}
            {ticket.products.length > 1 ? "items" : "item"}
          </ul>
        </div>
        <div className="ticketCard__section__total">
          <span>
            Total:
            <strong> ${ticket.amount}</strong>
          </span>
        </div>
      </Link>
    </>
  );
}

export default TicketItem;
