import { StyleProp, TextInput, TextStyle } from "react-native";

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (e: string) => void;
  style?: StyleProp<TextStyle>;
}

function Input(props: InputProps) {
  return (
    <TextInput
      style={[
        {
          width: "100%",
          height: 48,
          borderColor: "#EAEAEA",
          borderWidth: 2,
          borderRadius: 8,
          backgroundColor: "#FFF",
         
        },
        props.style, // applique ton style personnalisé après
      ]}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
    />
  );
}

export default Input;