import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getCart, incrementQty, decrementQty } from "../services/cartService";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function CartScreen() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const data = await getCart();
    setItems(data);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const subtotal = items.reduce(
    (sum: any, p: any) =>
      sum + parseInt(p.price.replace(/\D/g, "")) * p.qty,
    0
  );
  const discount = subtotal * 0.25;
  const total = subtotal - discount;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Cart</Text>

      {items.map((item: any) => (
        <View key={item.title} style={styles.card}>
          {/* Product Image */}
          <Image source={item.image} style={styles.image} />

          <View style={{ flex: 1 }}>
            {/* Title & Heart */}
            <View style={styles.rowSpace}>
              <View>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>

              <TouchableOpacity>
                <Ionicons name="heart-outline" size={22} color="#C62828" />
              </TouchableOpacity>
            </View>

            {/* Price */}
            <Text style={styles.price}>{item.price}</Text>

            {/* Cup & Sugar */}
            <Text style={styles.desc}>Cap Size: <Text style={styles.bold}>{item.cupSize}</Text></Text>
            <Text style={styles.desc}>Level Sugar: <Text style={styles.bold}>{item.sugar}</Text></Text>

            {/* Qty Row */}
            <View style={styles.qtyRow}>
              <Text style={styles.qty}>{item.qty}</Text>

              <TouchableOpacity
                style={styles.btnPlus}
                onPress={async () => {
                  await incrementQty(item.title);
                  load();
                }}
              >
                <Ionicons name="add" size={20} color="#FFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnMinus}
                onPress={async () => {
                  await decrementQty(item.title);
                  load();
                }}
              >
                <Ionicons name="remove" size={14} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* PAYMENT SECTION */}
      <View style={{ marginTop: 10 }}>
        <Text style={styles.paymentItem}>
          Subtotal  <Text style={styles.priceVal}>Rp {subtotal.toLocaleString()}</Text>
        </Text>
        <Text style={styles.paymentItem}>
          Discount  <Text style={styles.priceVal}>Rp {discount.toLocaleString()}</Text>
        </Text>
        <Text style={[styles.paymentItem, styles.total]}>
          Total  <Text style={styles.totalVal}>Rp {total.toLocaleString()}</Text>
        </Text>

        <Text style={styles.paymentTitle}>Payment</Text>
        <View style={styles.paymentRow}>
          <Image source={require("../assets/images/visa.png")} style={styles.payLogo} />
          <Image source={require("../assets/images/paypal.png")} style={styles.payLogo} />
          <Image source={require("../assets/images/master.png")} style={styles.payLogo} />
        </View>

        <TouchableOpacity style={styles.buyBtn}>
          <Text style={styles.buyText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#FFF", flex: 1 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 20,
    padding: 12,
    elevation: 10,
    shadowColor: "#000",
  },
  image: { width: 100, height: 100, borderRadius: 16, marginRight: 12 },
  rowSpace: { flexDirection: "row", justifyContent: "space-between" },
  productTitle: { fontSize: 18, fontWeight: "700" },
  subtitle: { fontSize: 13, color: "#777" },
  price: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 6,
    marginBottom: 6,
  },
  desc: { fontSize: 13, color: "#555" },
  bold: { fontWeight: "700", color: "#000" },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  qty: { fontSize: 24, fontWeight: "700" },
  btnPlus: {
    backgroundColor: "#1B5E20",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  btnMinus: {
    backgroundColor: "#C62828",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentItem: {
    fontSize: 15,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceVal: { fontWeight: "700" },
  total: { marginTop: 6 },
  totalVal: { fontWeight: "900", fontSize: 17 },
  paymentTitle: { marginTop: 20, marginBottom: 8, fontWeight: "700" },
  paymentRow: { flexDirection: "row", gap: 12 },
  payLogo: { width: 50, height: 30, resizeMode: "contain" },
  buyBtn: {
    backgroundColor: "#1B5E20",
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buyText: { color: "#FFF", fontSize: 18, fontWeight: "700" },
});
