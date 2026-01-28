import React, { useState } from "react";
import { Alert, Text, View, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import ScreenTemplate from "../templates/ScreenTemplate";
import Input from "../components/Input";
import Button from "../components/Button";
import { RootStackParamList } from "../navigations/types";

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    console.log("handleRegister appelé");

    if (!email || !password || !confirmPassword) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erreur", "Mot de passe trop court (minimum 6 caractères)");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);

    // Fonction avec timeout de 15 secondes
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout: Firebase ne répond pas après 15s. Vérifiez votre connexion internet.")), 15000);
    });

    try {
      console.log("Tentative de création du compte avec:", email);

      // Race entre Firebase et le timeout
      const userCredential = await Promise.race([
        auth().createUserWithEmailAndPassword(email, password),
        timeoutPromise
      ]) as any;

      console.log("Compte créé:", userCredential.user.email);
      setLoading(false);
      Alert.alert("Succès", "Compte créé avec succès!", [
        { text: "OK", onPress: () => navigation.navigate("Tabs") }
      ]);
    } catch (error: any) {
      setLoading(false);
      console.log("Erreur Firebase:", error.code, error.message);

      // Messages d'erreur plus clairs en français
      let errorMessage = error.message;
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Cet email est déjà utilisé par un autre compte.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "L'adresse email n'est pas valide.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Le mot de passe est trop faible.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Erreur réseau. Vérifiez votre connexion internet.";
      }

      Alert.alert("Erreur d'inscription", errorMessage);
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.title}>Créer un compte</Text>

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

        <View style={styles.inputWrapper}>
          <Input
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <Button
          title={loading ? "Création en cours..." : "Créer le compte"}
          style={[styles.primaryButton, loading && { opacity: 0.7 }]}
          onPress={handleRegister}
        />

        <View style={{ height: 16 }} />

        <Button
          title="Déjà un compte ? Se connecter"
          style={styles.secondaryButton}
          onPress={() => navigation.goBack()}
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
    backgroundColor: "#16A34A",
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 8,
  },

  secondaryButton: {
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    paddingVertical: 14,
  },
});

export default RegisterScreen;
