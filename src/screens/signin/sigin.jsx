import { useState } from "react";
import { View, ScrollView, StyleSheet , Text} from "react-native";
import Toast from "react-native-toast-message";

import { BButton } from "../../components/BButton";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { TextButton } from "../../components/textButton";
import { Loading } from "../../components/loading";
import { colors, modifiers } from "../../utils/theme";
import { firebase } from "../../services/firebaseConfig";
import { showToast } from "../../utils/help";
import { getUserId, storeUserSession, getUserLoggedInStatus } from "../../services/storageService";

function Signin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showLoading, setShowLoading] = useState(false);



        
          const loggedIn =  getUserLoggedInStatus();
          const UID =   getUserId();
         console.log("my_uid",UID)
         console.log("user_logged",loggedIn)



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

  const onSignin = () => {
    setShowLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((authResponse) => {
        setShowLoading(false);
        
        const userUid = authResponse.user.uid;

        storeUserSession(userUid,"true")

        navigation.navigate("Main");
        showToast("success", "you are the authentic useer CONGO", "top");
        //  now we need a session of user and also take him to goToHome()
      })
      .catch((authError) => {
        setShowLoading(false);
        showToast("error", authError.message, "top");
      });
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
          onChange={setEmail}
        />

        <Input
          placeholder={"Password"}
          isSecure={!showPass}
          showIcon={true}
          onChange={setPassword}
          iconName={showPass === false ? "eye-outline" : "eye-off-outline"}
          onIconPress={handleShowPass}
        />

        <View style={styles.textBtnCon}>
          <TextButton title={"Forgot your password?"} />
        </View>
        <BButton title={"Sign in"} onButtonPress={onSignin} />
        <View style={styles.goToSignupCon}>
          <TextButton
            title={"Dont have an account yet signup"}
            onPress={goToSignup}
          />
        </View>
      </View>
      {showLoading && <Loading />}
      <Toast />

    <Text>hello</Text>
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
