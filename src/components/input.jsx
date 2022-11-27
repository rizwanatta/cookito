import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, modifiers } from "../utils/theme";

function Input({
  onChange,
  placeholder,
  isSecure,
  showIcon,
  iconName,
  onIconPress,
}) {
  return (
    <View style={styles.inputCon}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChange}
        secureTextEntry={isSecure}
      />
      {showIcon === true ? (
        <Ionicons
          style={styles.icon}
          name={iconName}
          size={20}
          color={colors.green}
          onPress={onIconPress}
        />
      ) : (
        <View />
      )}
    </View>
  );
}

export { Input };

const styles = StyleSheet.create({
  inputCon: {
    paddingHorizontal: 20,
    height: 70,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginHorizontal: 10,
    borderRadius: 5,
    marginVertical: modifiers.itemMargin,
    flexDirection: "row",
  },
  input: {
    width: "95%",
  },

  icon: {
    alignSelf: "center",
  },
});
