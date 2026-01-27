import { StyleProp, TouchableOpacity, ViewStyle, Text } from "react-native";

interface ButtonProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          height: 48,
          backgroundColor: "#DDDDDD",
          width: "100%",
          borderRadius: 8,
        },
        props.style,
      ]}
      onPress={props.onPress}
    >
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
}

export default Button;