import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";
import "../../css/variables.css";
import { useEffect, useState } from "react";

function PDFComponent({ ticket, fecha, user }) {
  const styles = StyleSheet.create({
    ticketDetail: {
      padding: "15px",
      margin: "10px auto 0",
      border: "1px solid #666666",
      width: "100%",
    },
    detailHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 50px 0 0",
    },
    detailHeaderOrder: {
      flexDirection: "column",
      gap: 3,
    },
    detailsPurchaser: {
      width: "100%",
    },
    flexRow: {
      display: "flex",
      flexDirection: "row",
    },
    flexColumn: {
      display: "flex",
      flexDirection: "column",
    },
    ticketProductCard: {
      display: "flex",
      justifyContent: "space-between",
      textTransform: "capitalize",
      boxShadow: "2px 2px 5px 3px var(--box-shadow)",
    },
    ticketProductCardInfo: {
      margin: 0,
    },
  });

  const [products, setProducts] = useState([]);

  console.log("ticket pdf", ticket.products);
  console.log("products pdf", products);
  // setProducts(ticket.products);

  return (
    ticket && (
      <Document>
        <Page>
          <View style={styles.ticketDetail}>
            <View style={styles.detailHeader}>
              <View style={styles.detailHeaderOrder}>
                <Text>
                  <strong>confirmación de orden</strong>
                </Text>
                <Text>
                  <strong>N° Ticket: </strong>
                  {ticket.code}
                </Text>
                <Text>
                  <strong>Fecha: </strong>
                  {fecha ? fecha : "no hay fecha"}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: "2rem",
                  color: "#008ecc",
                }}
              >
                MegaMart
              </Text>
            </View>
            <View style={styles.flexRow}>
              <View style={styles.detailsPurchaser}>
                <Text style={{ fontSize: "1.25rem" }}>detalles de Cliente</Text>
                <Text>
                  <strong>id: </strong>
                  {user._id}
                </Text>
                <Text>
                  <strong>Cliente: </strong>
                  {user.first_name} {user.last_name}
                </Text>
                <Text>
                  <strong>email: </strong>
                  {user.email}
                </Text>
                <Text>
                  <strong>role: </strong>
                  {user.role}
                </Text>
              </View>
            </View>
            <View>
              <Text style={{ fontSize: "15px" }}>
                ¡Hola, {user.first_name}!
              </Text>
              <Text>
                Gracias por comprar con nosotros. Te enviaremos una confirmación
                cuando tus artículos sean enviados. Esperamos verte de nuevo
                pronto.
              </Text>
            </View>
            <View style={styles.productsDetail}>
              <View style={styles.flexRow}>
                <Text>Producto</Text>
                <Text>subTotal</Text>
              </View>

              {/* {ticket &&
              ticket.products.map((product) => (
                <PDFTicketProductDetail key={product._id} products={product} />
              ))} */}
              <View style={styles.flexRow}>
                <Text>Total</Text>
                <Text>$ {ticket.amount}</Text>
              </View>
            </View>
            <Text>
              E-commerce MegaMart. Gracias por comprar con nosotros. Enviaremos
              una confirmación cuando tus productos sean enviados. Esperamos
              verte pronto. <br /> Todos los derechos reservados © MegaMart.
            </Text>
          </View>
        </Page>
      </Document>
    )
  );
}

export default PDFComponent;
