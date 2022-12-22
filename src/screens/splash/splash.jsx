import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Loading } from "../../components/loading";
import { showToast } from "../../utils/help";
import { getUserLoggedInStatus } from "../../services/storageService";

function Splash({ navigation }) {
  useEffect(() => {
    // aya k user na previous login kra hua th ak nei
    getUserLoggedInStatus()
      .then((response) => {
        if (response === "true") {
          navigation.replace("Home");
        } else {
          navigation.replace("Signin");
        }
      })
      .catch((error) => {
        showToast("error", error.message);
      });
  }, []);

  return (
    <View style={styles.mainCon}>
      <Loading />
    </View>
  );
}

const styles = StyleSheet.create({
  mainCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});

export { Splash };
