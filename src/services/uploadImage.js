import { firebase } from "./firebaseConfig";

function uploadImage(imgUri) {
  makeBlob(imgUri)
    .then((imageBlob) => {
      const userStorageRef = firebase.storage().ref("users/");
      userStorageRef
        .child("dummyImage_dember6")
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

export { uploadImage };
