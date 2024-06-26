import { useEffect, useState } from "react";
import "../ticket/ticket.css";
import TicketItem from "./TicketItem";
import axios from "axios";
import { END_POINTS } from "../endPoints";
import Cookies from "js-cookie";

function Ticket() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const tokenCoder = Cookies.get("coderCookieToken");

    axios
      .get(`${END_POINTS.URL()}/api/tickets/owntickets`, {
        withCredentials: true,
        headers: {
          Authorization: `coderCookieToken=${tokenCoder}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTickets(res.data.payload);
        console.log("tickets", tickets);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {tickets.length > 0 && (
        <section className="ticketBox flexcolum">
          <h3 className="ticketBox__title">Mis Tickets</h3>
          <div className="ticketCard flexcolum">
            {tickets.length > 0 &&
              tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket} />
              ))}
          </div>
        </section>
      )}
      {tickets.length == 0 && (
        <div className="ticketBox__empty">
          <span>
            no hay tickets en este momento.
            <i className="ri-shopping-bag-line"></i>
          </span>
        </div>
      )}
    </>
  );
}

export default Ticket;
