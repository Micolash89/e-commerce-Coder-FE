import { useDispatch, useSelector } from "react-redux";
import TicketProductDetail from "./TicketProductDetail";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { END_POINTS } from "../endPoints";
import Cookies from "js-cookie";
import {
  messageError,
  messageOk,
} from "../../redux/features/NotificationSlice";

function TicketDetail() {
  const user = useSelector((state) => state.user.user);
  const { tid } = useParams();

  const [ticket, setTicket] = useState([]);
  const [fecha, setFecha] = useState();

  const format = (date, locale, options) =>
    new Intl.DateTimeFormat(locale, options).format(date);

  const dispatch = useDispatch();

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
      })
      .catch((err) => console.error(err))
      .finally(() => {});
  }, []);

  const handleFPD = () => {
    const cookieToken = Cookies.get("coderCookieToken");
    axios
      .get(`${END_POINTS.URL()}/api/pdf/generatepdf/${ticket._id}`, {
        withCredentials: true,
        headers: {
          Cookies: `coderCookieToken=${cookieToken}`,
        },
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ticket.pdf"); // Nombre del archivo descargado
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link); // Elimina el enlace después de la descarga
        window.URL.revokeObjectURL(url); // Libera la URL del objeto
        window.scrollTo(0, 0);
        dispatch(messageOk("se descargo el PDF"));
      })
      .catch((err) => {
        dispatch(messageError("ocurrio un error al generar PDF"));
        console.error(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    if (ticket && ticket.length != 0) {
      const day = new Date(ticket.purchase_datetime);
      setFecha(format(day, "es", { dateStyle: "full" }));
    }
  }, [ticket]);

  return (
    <>
      {ticket && (
        <section className="ticketDetail flexcolum">
          <header className="detailHeader flexrow">
            <section className=" flexcolum detailHeader__order">
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
              </span>
              <span>
                <strong>Estado: </strong>
                {ticket.status}
              </span>
            </section>

            <h2>MegaMart</h2>
            <div className="ticketPdf">
              <button
                className="ticketPdfButton"
                title="descarga el ticket en formato pdf"
                onClick={handleFPD}
              >
                <i className="ri-file-pdf-2-line"></i>
              </button>
            </div>
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

          {ticket.status == "aceptado" && (
            <span>
              nota:<strong>se pago con Mercado Pago</strong>
            </span>
          )}
          {ticket.status == "pendiente" && (
            <span>
              nota: <strong>se reservo pero aun no se pago</strong>
            </span>
          )}
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
