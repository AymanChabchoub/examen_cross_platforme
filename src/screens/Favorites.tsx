import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ProductCard from "../components/ProductCard";
import { getFavorites } from "../services/favoritesService";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<any[]>([]);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  useEffect(() => {
    const interval = setInterval(loadFavorites, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>

      {favorites.length === 0 ? (
        <Text style={styles.empty}>No favorites yet</Text>
      ) : (
        <FlatList
          data={favorites}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <ProductCard {...item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 18 },
  empty: { marginTop: 40, textAlign: "center", color: "#777" },
});
