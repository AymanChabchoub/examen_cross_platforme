import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import ScreenTemplate from "../templates/ScreenTemplate";
import Button from "../components/Button";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

const AVATAR_KEY = "USER_AVATAR_URI";

function ProfileScreen() {
  const navigation = useNavigation();
  const user = auth().currentUser;

  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  // Données profil (exemple statique / prêt à être branché API)
  const [firstName] = useState("melek");
  const [lastName] = useState("Louati");
  const [phone] = useState("+216 25165050");

  useEffect(() => {
    loadAvatar();
  }, []);

  const loadAvatar = async () => {
    const storedUri = await AsyncStorage.getItem(AVATAR_KEY);
    if (storedUri) setAvatarUri(storedUri);
  };

  const pickAvatar = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.7,
    });

    if (result.didCancel || !result.assets?.[0]?.uri) return;

    const uri = result.assets[0].uri;
    await AsyncStorage.setItem(AVATAR_KEY, uri);
    setAvatarUri(uri);
  };

  const handleLogout = async () => {
    await auth().signOut();
    await AsyncStorage.removeItem(AVATAR_KEY);

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" as never }],
    });
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        {/* AVATAR */}
        <TouchableOpacity onPress={pickAvatar} style={styles.avatarWrapper}>
          <Image
            source={
              avatarUri
                ? { uri: avatarUri }
                : require("../assets/images/avatar.png")
            }
            style={styles.avatar}
          />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={16} color="#FFF" />
          </View>
        </TouchableOpacity>

        {/* NAME */}
        <Text style={styles.name}>
          {firstName} {lastName}
        </Text>

        {/* INFO CARD */}
        <View style={styles.card}>
          <ProfileRow icon="mail" label="Email" value={user?.email || "-"} />
          <ProfileRow icon="call" label="Téléphone" value={phone} />
        </View>

        {/* LOGOUT */}
        <Button
          title="Se déconnecter"
          style={styles.logoutButton}
          onPress={handleLogout}
        />
      </View>
    </ScreenTemplate>
  );
}

export default ProfileScreen;

/* ---------- COMPONENT ---------- */
const ProfileRow = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <View style={styles.row}>
    <Ionicons name={icon as any} size={18} color="#2563EB" />
    <View style={{ marginLeft: 12 }}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  </View>
);

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 24,
  },

  avatarWrapper: {
    marginBottom: 16,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    padding: 6,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
    color: "#111827",
  },

  card: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  rowLabel: {
    fontSize: 13,
    color: "#6B7280",
  },

  rowValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    marginTop: 40,
    borderRadius: 10,
    paddingVertical: 14,
    width: "100%",
  },
});
