import {useState} from 'react';
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";

import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { BButton } from "./BButton";
import { Loading } from "./loading";
import { Header } from "./header";
import { Input } from "./input";
import { colors, modifiers } from "../utils/theme";
import { firebase } from "../services/firebaseConfig";
import { MediaPicker } from "./mediapicker";
import { CustomCamera } from "./customCamera";
import { makeBlob } from "../services/uploadImage";
import { getARandomImageName, getARandomRecipeName, showToast } from "../utils/help";

function AddRecipy({onClose,show}){

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingrediants, setIngrediants] = useState("");
  const [isPickerShown, setIsPickerShown] = useState(false);
  const [isCameraShown, setIsCameraShown] = useState(false);
  const [imageFromPicker, setImageFromPicker] = useState("");
  const [imageFromCamera, setImageFromCamera] = useState("");
  const [showLoading, setShowLoading] = useState(false);



  const onSubmit = ()=>{
    setShowLoading(true)
    uploadImage()
  }

  const onImageCameFromGallery = (image) => {
    setImageFromPicker(image.uri);
    setIsPickerShown(false);
  };

  const onImagePressed = () => {
    if (isPickerShown === true) {
      setIsPickerShown(false);
    } else if (isPickerShown === false) {
      setIsPickerShown(true);
    }
  };

  function uploadImage() {
    const imageUri = imageFromCamera || imageFromPicker

    makeBlob(imageUri)
      .then((imageBlob) => {
        const userStorageRef = firebase.storage().ref("recipies/");
        const imageName = getARandomImageName();
        userStorageRef
          .child(imageName)
          .put(imageBlob)
          .then((uploadResponse) => {

            // will fetch uploaded image url for us
            firebase.storage().ref("recipies/"+imageName).getDownloadURL().then(downloadRes=>{
               
              const imageUrlOnServer = downloadRes;
              
              // passing the url to add data to firestore function
               saveRecipeData(imageUrlOnServer)

            }).catch(downlaodErr=>{
              showToast('error',downlaodErr.message)
              setShowLoading(false);
            })

            // get the url from response and then add it with the data to firebase with uid
            

          })
          .catch((uploadError) => {
            showToast('error',uploadError.message)
            setShowLoading(false);
          });
      })
      .catch((blobError) => {
        setShowLoading(false);
      });
  }


  const saveRecipeData = (imageUrl)=>{

    const randomName = getARandomRecipeName()
       
    firebase
      .firestore()
      .collection("recipies")
      .doc(randomName)
      .set({
        recipyImageUrl: imageUrl,
        title,
        description,
        ingrediants
      })
      .then((response) => {
        setShowLoading(false);
        showToast("success", "your recipy is uploaded", "top");
        onClose()
      })
      .catch((error) => {
        showToast("error", error.message, "top");
        setShowLoading(false);
      });

  }

  return (
      <Modal
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        isVisible={show}
        style={{ justifyContent: "flex-end", flex: 1 }}
      >
    
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: colors.bgColor }}
    >
      <Header title={"Add New Recipy"}  
      onIconPress={onClose}
    />
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
          placeholder={"Title"}
          showIcon={true}
          onChange={setTitle}
        />

        <Input
          placeholder={"description"}
          showIcon={true}
          onChange={setDescription}
          beMultiline={true}
        />

        <Input
          placeholder={"Ingrediants"}
          showIcon={true}
          onChange={setIngrediants}
          beMultiline={true}
        />

        <BButton title={"Submit"}   onButtonPress={onSubmit}/>
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
    </ScrollView>
    </Modal>
  );
}

export { AddRecipy };

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
