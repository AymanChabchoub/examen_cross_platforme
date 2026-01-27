import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeMainScreen from "../screens/HomeMain";
import FavoritesScreen from "../screens/Favorites";
import CartScreen from "../screens/Cart";
import ProfileScreen from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 75,
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          backgroundColor: "#FFF",
          position: "absolute",
          borderTopWidth: 0,
          elevation: 10, // Android shadow
        },
        tabBarIcon: ({ focused }) => {
          let icon: string = "home-outline"; // valeur par défaut

          if (route.name === "HomeMain") {
            icon = focused ? "home" : "home-outline";
          } else if (route.name === "Favorites") {
            icon = focused ? "heart" : "heart-outline";
          } else if (route.name === "Cart") {
            icon = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            icon = focused ? "person" : "person-outline";
          }

          return (
            <Ionicons
              name={icon}
              size={30}
              color={focused ? "#1B5E20" : "#8EA897"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="HomeMain" component={HomeMainScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
