import { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { BButton } from "../../components/BButton";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { TextButton } from "../../components/textButton";
import { colors, modifiers } from "../../utils/theme";
import { firebase } from "../../services/firebaseConfig";
import { MediaPicker } from "../../components/mediapicker";
import { CustomCamera } from "../../components/customCamera";

function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isPickerShown, setIsPickerShown] = useState(false);
  const [isCameraShown, setIsCameraShown] = useState(false);
  const [imageFromPicker, setImageFromPicker] = useState('');

  const handleShowPass = () => {
    if (showPass === true) {
      setShowPass(false);
    } else if (showPass === false) {
      setShowPass(true);
    }
  };

  const onImageCameFromGallery=(image)=>{
         setImageFromPicker(image.uri)
         setIsPickerShown(false)
  }

  const onSignupPress = () => {
    console.log(userName, email, password);
    firebase.firestore().collection("users").doc("id0002").set({
      user_name: userName,
      user_email: email,
      user_password: password,
    });
  };

  const onImagePressed = () => {
    if(isPickerShown === true){
      setIsPickerShown(false)
    }else if(isPickerShown === false ){
      setIsPickerShown(true)
    }
   // lin51  does the same sa all from 45 to 49
   // setIsPickerShown(!isPickerShown)
  }

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: colors.bgColor }}
    >
      <Header title={"Sign up"} />
      <TouchableOpacity onPress={onImagePressed}>
        <View style={styles.pickImgCircle}>
            <Image source={{uri:imageFromPicker}} style={{width:100, height:100}}/>
        </View>
      </TouchableOpacity>

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

      <MediaPicker show={isPickerShown} onClose={onImagePressed}
                  onImagePickerSelected={(imageSelcted)=>{onImageCameFromGallery(imageSelcted)}}
                  onCameraPressed={()=>{setIsCameraShown(!isCameraShown)}}/>

      <CustomCamera show={isCameraShown} onClose={()=> setIsCameraShown(false)} />

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

  pickImgCircle: {
    backgroundColor: "orange",
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
