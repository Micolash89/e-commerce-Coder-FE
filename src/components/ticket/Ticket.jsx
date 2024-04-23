import "../ticket/ticket.css";

function Ticket() {
  return (
    <>
      <section className="ticketBox flexcolum">
        <h3 className="ticketBox__title">Mis Tickets</h3>
        <div className="ticketCard flexrow">
          <section className="ticketCard__section flexrow">
            <div className="ticketCard__section--product  tsp flexcolum">
              <div className="tsp__img">
                <img src="images/image 3.png" alt="title" title="title" />
              </div>
            </div>

            <div className="ticketCard__section--info tsi  flexcolum">
              <h4 className="tsi__p">dsa X dsa</h4>
              <span className="tsi__span">$das X unid.</span>
              <ul className="tsi__list">
                <li className="tsi__list--items">television</li>
                <li className="tsi__list--items">celular</li>
                <li className="tsi__list--items">pc</li>
              </ul>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default Ticket;
