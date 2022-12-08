import { getARandomImageName } from "../utils/help";
import { firebase } from "./firebaseConfig";

function uploadImage(imgUri) {
  makeBlob(imgUri)
    .then((imageBlob) => {
      const userStorageRef = firebase.storage().ref("users/");
      const imageName = getARandomImageName();
      userStorageRef
        .child(imageName)
        .put(imageBlob)
        .then((uploadResponse) => {})
        .catch((uploadError) => {});
    })
    .catch((blobError) => {});
}

const makeBlob = async (img) => {
  const blobInMaking = await fetch(img);

  const theBlob = await blobInMaking.blob();

  return theBlob;
};

export { uploadImage, makeBlob };
