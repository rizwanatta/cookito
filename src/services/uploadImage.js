import {firebase} from './firebaseConfig';

async function uploadImage(imgUri){
   // fir st conver the image to blob 
  // a blo b as middle ware for your image to be uploaded
  try {

   const imgBlob = await makeBlob(imgUri);
  //
  //
  // // storage ref to our users folder
   const userStorageRef = firebase.storage().ref('users/')
  //   
   await userStorageRef.child('dummyImage_1')
    .put(imgBlob)
  //   .then(response=>{
  //     alert(resposne)
  //  }).catch(error=>{
  //    alert(error)
  //  })

  } catch (error){
     console.log(error)
  }
   
}





const makeBlob  = async (img)=>{

  const blobInMaking = await fetch(img);

   const theBlob = await blobInMaking.blob();

  return theBlob

}


export {uploadImage}
