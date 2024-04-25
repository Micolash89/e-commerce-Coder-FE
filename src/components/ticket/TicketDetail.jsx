import { useSelector } from "react-redux";
import TicketProductDetail from "./TicketProductDetail";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { END_POINTS } from "../endPoints";
import Cookies from "js-cookie";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFComponent from "../PDF/PDFComponent";

function TicketDetail() {
  const user = useSelector((state) => state.user.user);
  const { tid } = useParams();

  const [ticket, setTicket] = useState([]);
  const [fecha, setFecha] = useState();

  const format = (date, locale, options) =>
    new Intl.DateTimeFormat(locale, options).format(date);

  useEffect(() => {
    const cookieToken = Cookies.get("coderCookieToken");

    axios
      .get(`${END_POINTS.URL()}/api/tickets/getticket/${tid}`, {
        withCredentials: true,
        headers: {
          Authorization: `coderCookieToken=${cookieToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTicket(res.data.payload);

        // const fecha = format(day, "es");
      })
      .catch((err) => console.error(err))
      .finally(() => {});
  }, []);

  useEffect(() => {
    if (ticket && ticket.length != 0) {
      const day = new Date(ticket.purchase_datetime);
      console.log(ticket.purchase_datetime);
      console.log("dia", format(day, "es", { dateStyle: "full" }));
      setFecha(format(day, "es", { dateStyle: "full" }));
    }
  }, [ticket]);

  return (
    <>
      {ticket && (
        <section className="ticketDetail flexcolum">
          <header className="detailHeader flexrow">
            <section className="detailHeader__order flexcolum">
              <span>
                <strong>confirmación de orden</strong>
              </span>

              <span>
                <strong>N° Ticket: </strong>
                {ticket.code}
              </span>

              <span>
                <strong>Fecha: </strong>
                {fecha ? fecha : "no hay fecha"}
                {/* {format(new Date(ticket.purchase_datetime), "es", {
                  dateStyle: "long",
                })} */}
              </span>
            </section>

            <h2>MegaMart</h2>
            {/* <div className="ticketPdf">
              {ticket && (
                <PDFDownloadLink
                  document={
                    <PDFComponent ticket={ticket} fecha={fecha} user={user} />
                  }
                  fileName="Ticket.pdf"
                >
                  {({ loading, url, error, blob }) =>
                    loading ? (
                      <div>cargando...</div> //<a href={url}>Descargar PDF</a>
                    ) : (
                      <button
                        className="ticketPdfButton"
                        title="descarga el ticket en formato pdf"
                      >
                        <i className="ri-file-pdf-2-line"></i>
                      </button>
                    )
                  }
                </PDFDownloadLink>
              )}
            </div> */}
          </header>
          <section className="flexrow">
            <div className="ticketDetail__div detailsPurchaser flexcolum">
              <h4>detalles de Cliente</h4>
              <span>
                <strong>id: </strong>
                {user._id}
              </span>
              <span>
                <strong>Cliente: </strong>
                {user.first_name} {user.last_name}
              </span>
              <span>
                <strong>email: </strong>
                {user.email}
              </span>
              <span>
                <strong>role: </strong>
                {user.role}
              </span>
            </div>
          </section>
          <section className="ticketDetail__purchase flexcolum">
            <h4>¡Hola, {user.first_name}!</h4>
            <p>
              Gracias por comprar con nosotros. Te enviaremos una confirmación
              cuando tus artículos sean enviados. Esperamos verte de nuevo
              pronto.
            </p>
          </section>
          <section className="productsDetail flexcolum">
            <div className="flexrow">
              <span>Producto </span>
              <span>subTotal</span>
            </div>
            {ticket &&
              ticket.products &&
              ticket.products.map((product) => (
                <TicketProductDetail key={product._id} products={product} />
              ))}

            <div className="flexrow">
              <span>Total </span>
              <span>$ {ticket.amount}</span>
            </div>
          </section>

          <span>
            E-commerce MegaMart. Gracias por comprar con nosotros. Enviaremos
            una confirmación cuando tus productos sean enviados. Esperamos verte
            pronto. <br /> Todos los derechos reservados © MegaMart.
          </span>
        </section>
      )}
    </>
  );
}

export default TicketDetail;
