import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { addFavorite, removeFavorite, isFavorite } from "../services/favoritesService";
import { addToCart } from "../services/cartService";


export default function ProductDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { title, subtitle, price, image } = route.params as any;

  const [cupSize, setCupSize] = useState("Small");
  const [sugar, setSugar] = useState("No Sugar");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    isFavorite(title).then(setLiked);
  }, []);

  const toggleFavorite = async () => {
    if (liked) {
      await removeFavorite(title);
      setLiked(false);
    } else {
      await addFavorite({ title, subtitle, price, image });
      setLiked(true);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* IMAGE */}
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />

        {/* BACK BUTTON */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="#1B5E20" />
        </TouchableOpacity>

        {/* FAVORITE BUTTON */}
        <TouchableOpacity style={styles.favBtn} onPress={toggleFavorite}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={22}
            color="#C62828"
          />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* TITLE */}
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          <View style={styles.rating}>
            <Text style={styles.ratingText}>⭐ 4.8</Text>
          </View>
        </View>

        {/* CUP SIZE */}
        <Text style={styles.sectionTitle}>Cup Size</Text>
        <View style={styles.optionRow}>
          {["Small", "Medium", "Large"].map((size) => (
            <Option
              key={size}
              label={size}
              active={cupSize === size}
              onPress={() => setCupSize(size)}
            />
          ))}
        </View>

        {/* SUGAR LEVEL */}
        <Text style={styles.sectionTitle}>Level Sugar</Text>
        <View style={styles.optionRow}>
          {["No Sugar", "Low", "Medium"].map((lvl) => (
            <Option
              key={lvl}
              label={lvl}
              active={sugar === lvl}
              onPress={() => setSugar(lvl)}
            />
          ))}
        </View>

        {/* ABOUT */}
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.about}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
          <Text style={styles.readMore}> Read More</Text>
        </Text>

        {/* ADD TO CART */}
     <TouchableOpacity
  style={styles.addCart}
  onPress={() =>
    addToCart({
      title,
      subtitle,
      price,
      image,
      cupSize,
      sugar,
    })
  }
>
  <Text style={styles.addText}>Add to cart</Text>
  <View style={styles.divider} />
  <Text style={styles.addText}>{price}</Text>
</TouchableOpacity>

      </View>
    </ScrollView>
  );
}

/* 🔘 OPTION COMPONENT */
function Option({ label, active, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.option, active && styles.optionActive]}
    >
      <Text style={[styles.optionText, active && styles.optionTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },

  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 360,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#FFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  favBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#FFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -24,
    padding: 24,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    color: "#777",
    marginTop: 4,
  },
  rating: {
    backgroundColor: "#E7C89A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  ratingText: {
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  optionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F4F4F4",
  },
  optionActive: {
    backgroundColor: "#1B5E20",
  },
  optionText: {
    fontWeight: "600",
    color: "#000",
  },
  optionTextActive: {
    color: "#FFF",
  },

  about: {
    color: "#666",
    lineHeight: 22,
    marginBottom: 32,
  },
  readMore: {
    color: "#1B5E20",
    fontWeight: "700",
  },

  addCart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1B5E20",
    height: 56,
    borderRadius: 28,
    gap: 12,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  addText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
