import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { BButton } from "../../components/BButton";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { TextButton } from "../../components/textButton";
import { colors, modifiers } from "../../utils/theme";
import { firebase } from "../../services/firebaseConfig";

function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleShowPass = () => {
    if (showPass === true) {
      setShowPass(false);
    } else if (showPass === false) {
      setShowPass(true);
    }
  };

  const onSignupPress = () => {
    console.log(userName, email, password);
    firebase.firestore().collection("users").doc("id0002").set({
      user_name: userName,
      user_email: email,
      user_password: password,
    });
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
          onChange={setUserName}
          iconName={"person-outline"}
        />

        <Input
          placeholder={"Email"}
          showIcon={true}
          onChange={setEmail}
          iconName={"mail-outline"}
        />

        <Input
          placeholder={"Password"}
          isSecure={!showPass}
          onChange={setPassword}
          showIcon={true}
          iconName={showPass === false ? "eye-outline" : "eye-off-outline"}
          onIconPress={handleShowPass}
        />

        <View style={styles.textBtnCon}>
          <TextButton title={"Already have an account?"} />
        </View>
        <BButton title={"Sign up"} onButtonPress={onSignupPress} />
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
