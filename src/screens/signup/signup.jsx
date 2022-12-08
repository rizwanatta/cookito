import { useState } from "react";
import Toast from "react-native-toast-message";

import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { BButton } from "../../components/BButton";
import { Loading } from "../../components/loading";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { TextButton } from "../../components/textButton";
import { colors, modifiers } from "../../utils/theme";
import { firebase } from "../../services/firebaseConfig";
import { MediaPicker } from "../../components/mediapicker";
import { CustomCamera } from "../../components/customCamera";
import { makeBlob } from "../../services/uploadImage";
import { getARandomImageName, showToast } from "../../utils/help";

function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPickerShown, setIsPickerShown] = useState(false);
  const [isCameraShown, setIsCameraShown] = useState(false);
  const [imageFromPicker, setImageFromPicker] = useState("");
  const [imageFromCamera, setImageFromCamera] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const handleShowPass = () => {
    if (showPass === true) {
      setShowPass(false);
    } else if (showPass === false) {
      setShowPass(true);
    }
  };

  const onImageCameFromGallery = (image) => {
    setImageFromPicker(image.uri);
    setIsPickerShown(false);
  };

  const onSignupPress = () => {
    console.log(userName, email, password);
    //create a user account in firebase auth then upload image
    setShowLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authResponse) => {
        uploadImage(imageFromCamera || imageFromPicker);
        showToast("success", "registered successfully proceed to login", "top");
      })
      .catch((authError) => {
        setShowLoading(false);
        showToast("error", authError.message, "top");
      });

    // firebase.firestore().collection("users").doc("id0003").set({
    //   user_name: userName,
    //   user_email: email,
    //   user_password: password,
    // });
    //
  };

  const onImagePressed = () => {
    if (isPickerShown === true) {
      setIsPickerShown(false);
    } else if (isPickerShown === false) {
      setIsPickerShown(true);
    }
    // lin51  does the same sa all from 45 to 49
    // setIsPickerShown(!isPickerShown)
  };

  function uploadImage(imgUri) {
    makeBlob(imgUri)
      .then((imageBlob) => {
        const userStorageRef = firebase.storage().ref("users/");
        const imageName = getARandomImageName();
        userStorageRef
          .child(imageName)
          .put(imageBlob)
          .then((uploadResponse) => {
            setShowLoading(false);

            Toast.show({
              type: "success",
              text1: "Hello",
              text2: "This is some something 👋",
              position: "bottom",
            });
          })
          .catch((uploadError) => {
            setShowLoading(false);
          });
      })
      .catch((blobError) => {
        setShowLoading(false);
      });
  }

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: colors.bgColor }}
    >
      <Header title={"Sign up"} />
      <TouchableOpacity onPress={onImagePressed}>
        <View style={styles.pickImgCircle}>
          <Image
            source={{ uri: imageFromPicker || imageFromCamera }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
            resizeMode={"contain"}
          />
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

      <MediaPicker
        show={isPickerShown}
        onClose={onImagePressed}
        onImagePickerSelected={(imageSelcted) => {
          onImageCameFromGallery(imageSelcted);
        }}
        onCameraPressed={() => {
          setIsCameraShown(!isCameraShown);
        }}
      />

      <CustomCamera
        show={isCameraShown}
        onClose={() => setIsCameraShown(false)}
        onPictureTaken={(response) => {
          setIsCameraShown(false);
          setIsPickerShown(false);
          // if image came it will add the uri in our state
          setImageFromCamera(response.uri);
        }}
      />
      {showLoading && <Loading />}
      <Toast />
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
