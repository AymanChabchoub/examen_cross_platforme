import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface CategoryProps {
  title: string;
  icon: string;
  active?: boolean;
  onPress?: () => void;
}

function Category({ title, icon, active, onPress }: CategoryProps) {
  return (
    <TouchableOpacity
      style={[styles.container, active && styles.active]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon}
        size={18}
        color={active ? "#FFFFFF" : "#1B5E20"}
      />

      <Text style={[styles.text, active && styles.activeText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default Category;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    elevation: 3,
  },
  active: {
    backgroundColor: "#1B5E20",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1B5E20",
  },
  activeText: {
    color: "#FFFFFF",
  },
});
