import { ActivityIndicator, View, StyleSheet } from "react-native";

function Loading() {
  return (
    <View style={styles.mainCon}>
      <ActivityIndicator size={"large"} color={"white"} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainCon: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
  },
});

export { Loading };
