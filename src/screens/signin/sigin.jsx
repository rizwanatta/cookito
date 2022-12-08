import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import { BButton } from "../../components/BButton";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { TextButton } from "../../components/textButton";
import { Loading } from "../../components/loading";
import { colors, modifiers } from "../../utils/theme";

function Signin({ navigation }) {
  const [showPass, setShowPass] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleShowPass = () => {
    if (showPass === true) {
      setShowPass(false);
    } else if (showPass === false) {
      setShowPass(true);
    }
  };

  const goToSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: colors.bgColor }}
    >
      <Header title={"Sign in"} />
      <View style={styles.formCon}>
        <Input
          placeholder={"Email"}
          showIcon={true}
          iconName={"mail-outline"}
        />

        <Input
          placeholder={"Password"}
          isSecure={!showPass}
          showIcon={true}
          iconName={showPass === false ? "eye-outline" : "eye-off-outline"}
          onIconPress={handleShowPass}
        />

        <View style={styles.textBtnCon}>
          <TextButton title={"Forgot your password?"} />
        </View>
        <BButton title={"Sign in"} />
        <View style={styles.goToSignupCon}>
          <TextButton
            title={"Dont have an account yet signup"}
            onPress={goToSignup}
          />
        </View>
      </View>
      {showLoading === true && <Loading />}
    </ScrollView>
  );
}

export { Signin };

const styles = StyleSheet.create({
  formCon: {
    height: "60%",
    justifyContent: "center",
    paddingHorizontal: modifiers.containerPadding,
  },
  textBtnCon: { alignItems: "flex-end" },
  goToSignupCon: { alignItems: "center" },
});
