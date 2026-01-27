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

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erreur", "Mot de passe trop court");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
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
          title="Créer le compte"
          style={styles.primaryButton}
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
