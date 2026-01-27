import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import ScreenTemplate from "../templates/ScreenTemplate";
import Button from "../components/Button";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/types";

function HomeScreen() {
const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScreenTemplate>
      <ImageBackground
        source={require("../assets/images/backGround.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Image sac de café */}
          <Image
            source={require("../assets/images/sacCoffe.png")}
            style={styles.coffeeImage}
            resizeMode="contain"
          />

          {/* Texte principal */}
          <Text style={styles.title}>
            Coffee so good,{'\n'}
            your taste buds{'\n'}
            will love it
          </Text>

          {/* Sous-texte */}
          <Text style={styles.subtitle}>
            The best grain, the finest roast,{'\n'}
            the most powerful flavor.
          </Text>

          {/* Bouton */}
<Button
  title="Get started"
  style={styles.button}
  onPress={() => navigation.navigate("Tabs")}
/>


        </View>
      </ImageBackground>
    </ScreenTemplate>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  coffeeImage: {
    width: 300,        // 👈 PLUS GRAND
    height: 300,       // 👈 PLUS GRAND
    marginBottom: 40,
  },
  title: {
    fontSize: 32,      // 👈 TEXTE PLUS GRAND
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#E6E6E6",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#1B5E20",
    height: 56,
    borderRadius: 28,
    width: "100%",
  },
});
