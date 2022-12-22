import { setStatusBarBackgroundColor } from "expo-status-bar";
import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

function Counter() {
  const [count, setCount] = useState(0);

  const incrementOne = () => {
    setCount(count + 1);
  };

  const decrementOne = () => {
    if (count - 1 < 0) {
      return;
    }
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={incrementOne} style={styles.button}>
        <Text>+</Text>
      </TouchableOpacity>
      <Text>{count}</Text>
      <TouchableOpacity onPress={decrementOne} style={styles.button}>
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
});

export { Counter };
