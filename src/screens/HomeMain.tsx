import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import ScreenTemplate from "../templates/ScreenTemplate";
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";

/* =======================
   DATA
======================= */

const categories = [
  "All",
  "Cappuccino",
  "Coffee",
  "Espresso",
  "Latte",
  "Mocha",
];

const productsData = [
  {
    id: "1",
    title: "Cappuccino",
    subtitle: "With Sugar",
    price: "Rp 50.000",
    image: require("../assets/images/coffee1.png"),
    category: "Cappuccino",
  },
  {
    id: "2",
    title: "Coffee",
    subtitle: "With Sugar",
    price: "Rp 50.000",
    image: require("../assets/images/coffee2.png"),
    category: "Coffee",
  },
  {
    id: "3",
    title: "Espresso",
    subtitle: "With Sugar",
    price: "Rp 50.000",
    image: require("../assets/images/coffee3.png"),
    category: "Espresso",
  },
  {
    id: "4",
    title: "Latte",
    subtitle: "With Sugar",
    price: "Rp 50.000",
    image: require("../assets/images/coffee4.png"),
    category: "Latte",
  },
  {
    id: "5",
    title: "Mocha",
    subtitle: "With Sugar",
    price: "Rp 50.000",
    image: require("../assets/images/coffee5.png"),
    category: "Mocha",
  },
];

/* =======================
   SCREEN
======================= */

function HomeMainScreen() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchText, setSearchText] = useState<string>("");

  /* ICON LOGIC */
  const getCategoryIcon = (category: string, active: boolean) => {
    if (category === "All") return active ? "apps" : "apps-outline";
    if (category === "Espresso") return active ? "flash" : "flash-outline";
    if (category === "Mocha") return active ? "leaf" : "leaf-outline";
    return active ? "cafe" : "cafe-outline";
  };

  /* FILTER (CATEGORY + SEARCH) */
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      const matchSearch = product.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchText]);

  return (
    <ScreenTemplate>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/avatar.png")}
            style={styles.avatar}
          />

          <View style={styles.headerText}>
            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={14}
                color="#1B5E20"
              />
              <Text style={styles.location}>Jakarta, Indonesia</Text>
            </View>
            <Text style={styles.greeting}>Good morning, melek</Text>
          </View>

          <Ionicons
            name="notifications-outline"
            size={22}
            color="#000"
          />
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search Coffee ..."
            placeholderTextColor="#9E9E9E"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* CATEGORIES */}
        <Text style={styles.sectionTitle}>Categories</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <Category
                key={cat}
                title={cat}
                icon={getCategoryIcon(cat, isActive)}
                active={isActive}
                onPress={() => setActiveCategory(cat)}
              />
            );
          })}
        </ScrollView>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <Text style={{ color: "#777", marginBottom: 16 }}>
            Aucun produit trouvé
          </Text>
        )}

        {/* PRODUCTS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.products}
        >
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              price={item.price}
              image={item.image}
            />
          ))}
        </ScrollView>

        {/* SPECIAL OFFER */}
        <Text style={styles.sectionTitle}>Special Offer</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.specialOffers}
        >
          <ProductCard
            title="Coffee"
            subtitle="With Sugar"
            price="Rp 50.000"
            image={require("../assets/images/coffee4.png")}
            large
          />
          <ProductCard
            title="Cappuccino"
            subtitle="With Sugar"
            price="Rp 50.000"
            image={require("../assets/images/coffee5.png")}
            large
          />
        </ScrollView>
      </ScrollView>
    </ScreenTemplate>
  );
}

export default HomeMainScreen;

/* =======================
   STYLES
======================= */

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    fontSize: 12,
    color: "#777",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  searchBox: {
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    justifyContent: "center",
    marginBottom: 24,
  },
  searchInput: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#000",
  },
  categories: {
    flexDirection: "row",
    gap: 12,
    paddingBottom: 24,
  },
  products: {
    flexDirection: "row",
    gap: 16,
    paddingBottom: 32,
  },
  specialOffers: {
    flexDirection: "row",
    gap: 16,
  },
});