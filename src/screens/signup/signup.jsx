import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { BButton } from "../../components/BButton";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { TextButton } from "../../components/textButton";
import { colors, modifiers } from "../../utils/theme";

function Signup() {
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    if (showPass === true) {
      setShowPass(false);
    } else if (showPass === false) {
      setShowPass(true);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: colors.bgColor }}
    >
      <Header title={"Sign up"} />
      <View style={styles.formCon}>
        <Input
          placeholder={"User Name"}
          showIcon={true}
          iconName={"person-outline"}
        />

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
          <TextButton title={"Already have an account?"} />
        </View>
        <BButton title={"Sign up"} />
      </View>
    </ScrollView>
  );
}

export { Signup };

const styles = StyleSheet.create({
  formCon: {
    height: "60%",
    justifyContent: "center",
    paddingHorizontal: modifiers.containerPadding,
  },
  textBtnCon: { alignItems: "flex-end" },
});
