import React, { useState } from "react";
import { Alert, Text, View, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import ScreenTemplate from "../templates/ScreenTemplate";
import Input from "../components/Input";
import Button from "../components/Button";
import { RootStackParamList } from "../navigations/types";

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs !");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Erreur", "Adresse email invalide");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 6 caractères"
      );
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate("Home");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Erreur", "Utilisateur non trouvé");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Erreur", "Mot de passe incorrect");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Erreur", "Email invalide");
      } else {
        Alert.alert("Erreur", error.message);
      }
    }
  };

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs !");
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert("Succès", "Compte créé avec succès");
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
  <Text style={styles.title}>Connexion</Text>

  <View style={styles.inputWrapper}>
    <Input
      placeholder="Adresse email"
      value={email}
      onChangeText={setEmail}
    />
  </View>

  <View style={styles.inputWrapper}>
    <Input
      placeholder="Mot de passe"
      value={password}
      onChangeText={setPassword}
    />
  </View>

  <Button
    title="Se connecter"
    style={styles.primaryButton}
    onPress={handleLogin}
  />

  <View style={{ height: 16 }} />

  <Button
    title="Créer un compte"
    style={styles.secondaryButton}
    onPress={() => navigation.navigate("Register")}
  />
</View>

    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
    color: "#1A1A1A",
  },

  inputWrapper: {
    marginBottom: 16,
  },

  primaryButton: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 8,
  },

  secondaryButton: {
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    paddingVertical: 14,
  },

  secondaryButtonText: {
    color: "#111827",
    fontWeight: "600",
  },
});


export default LoginScreen;