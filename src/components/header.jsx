import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { modifiers } from "../utils/theme";

function Header({ title }) {
  return (
    <View style={styles.headerCon}>
      <Ionicons name={"chevron-back"} size={24} style={styles.backIcon} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export { Header };

const styles = StyleSheet.create({
  headerCon: {
    paddingHorizontal: modifiers.containerPadding,
    height: 100,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
  },
  backIcon: {
    marginLeft: -5,
  },
});
