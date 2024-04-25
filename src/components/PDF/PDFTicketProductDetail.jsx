import noUrl from "../../assets/image_3.png";
import { Text, View, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  ticketProductCard: {
    justifyContent: "space-between",
    textTransform: "capitalize",
    boxShadow: "2px 2px 5px 3px rgba(0, 0, 0, 0.459)",
    display: "flex",
    flexDirection: "row",
  },
  ticketProductCard__info: {
    margin: "0",
  },
  ticketProductCard__info__p: {
    fontSize: "1.875rem",
    color: "#000000",
    fontWeight: "700",
  },
  ticketProductCard__info__p__medios: {
    fontSize: "1rem",
    color: "#666666",
    fontWeight: "400",
  },
  ticketProductCard__info__p_ultimo: {
    fontSize: "0.875rem",
    fontWeight: "200",
    color: "#000000",
  },
  ticketProductCard_div_last_child: {
    fontSize: "1.25rem",
  },

  ticketDetail__dentro_span: {
    textAlign: "center",
    fontSize: "0.813rem",
    fontWeight: "200",
  },
  flexrow: {
    display: "flex",
    flexDirection: "row",
  },
  flexcolum: {
    display: "flex",
    flexDirection: "column",
  },
});

function PDFTicketProductDetail({ products }) {
  return (
    <View style={styles.ticketProductCard}>
      <View style={styles.flexRow}>
        <View>
          <View>
            <Image src={products.product.url || noUrl} />
          </View>
        </View>
        <View style={styles.ticketProductCard__info}>
          <Text style={styles.ticketProductCard__info__p}>
            {products.product.title}
          </Text>
          <Text style={styles.ticketProductCard__info__p__medios}>
            {products.product.category}
          </Text>
          <Text style={styles.ticketProductCard__info__p__medios}>
            $ {products.product.price}
          </Text>
          <Text style={styles.ticketProductCard_div_last_child}>
            Cant.: {products.quantity}
          </Text>
        </View>
      </View>
      <View style={styles.flexrow}>
        <Text style={styles.ticketDetail__dentro_span}>
          $ {products.product.price * products.quantity}
        </Text>
      </View>
    </View>
  );
}

export default PDFTicketProductDetail;
