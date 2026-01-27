import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { addFavorite, removeFavorite, isFavorite } from "../services/favoritesService";
import { useNavigation } from "@react-navigation/native";
import { addToCart } from "../services/cartService";

interface ProductCardProps {
  title: string;
  subtitle: string;
  price: string;
  image: any;
  large?: boolean;
}

export default function ProductCard({ title, subtitle, price, image, large }: ProductCardProps) {
  const navigation: any = useNavigation();
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
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("ProductDetail", {
          title,
          subtitle,
          price,
          image,
        })
      }
    >
      <View style={[styles.card, large && styles.large]}>
        {/* ❤️ Favorite Button */}
        <TouchableOpacity style={styles.favoriteBtn} onPress={toggleFavorite}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={22}
            color="#C62828"
          />
        </TouchableOpacity>

        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.footer}>
          <Text style={styles.price}>{price}</Text>
          <View style={styles.addButton}>
<TouchableOpacity
  style={styles.addButton}
  onPress={() => addToCart({ title, subtitle, price, image })}
>
  <Text style={styles.addText}>+</Text>
</TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 12,
    elevation: 4,
    marginBottom: 16,
  },
  large: { width: 240 },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 16,
  },
  favoriteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 20,
  },
  title: { fontSize: 16, fontWeight: "700", marginTop: 8 },
  subtitle: { fontSize: 12, color: "#777", marginBottom: 8 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: { fontSize: 16, fontWeight: "700" },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1B5E20",
    justifyContent: "center",
    alignItems: "center",
  },
  addText: { color: "#FFF", fontSize: 18, fontWeight: "700" },
});
