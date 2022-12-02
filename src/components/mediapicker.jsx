import {View,  Text ,  StyleSheet, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

import {BButton} from './BButton';

function MediaPicker({show,onClose, onCameraPressed, onImagePickerSelected}){

  const pickImageFromGallery = ()=>{
     ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.Images,
       allowsEditing: true,
       quality:1
     }).then(response=>{
      

       // when users opens the picker and just comes back and does not select the image
       if(response.canceled){
         alert('not selected')
       }else{
          onImagePickerSelected(response.assets[0])
       }



     }).catch(error=>{

        alert(error.message)
     })
  }

  return (
    <View>
     <Modal
      animationIn={'slideInUp'}  
      animationOut={'slideOutDown'}
      animationOutTiming={1500}
      isVisible={show}
      style={{justifyContent:'flex-end', flex:1,
        }}>
        <View style={{ height:'35%', backgroundColor:'white', borderRadius:10 , padding:10, justifyContent:'center' }}>

         <View style={{flexDirection: 'row', justifyContent:'space-evenly'}}>
    
         <TouchableOpacity style={styles.circleView} onPress={onCameraPressed}> 
           <Ionicons name={'camera-sharp'} size={50} color={'white'}/>
        </TouchableOpacity > 

          <TouchableOpacity style={styles.circleView} onPress={pickImageFromGallery}> 
           <Ionicons name={'images-sharp'} size={50} color={'white'}/>
          </TouchableOpacity> 
         </View>
    
     <View  style={{ marginTop:10}}> 
        <BButton title={'cancel'} onButtonPress={onClose} />
    </View>

        </View>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
    circleView: {
      backgroundColor: "orange",
      height: 100,
      width: 100,
      borderRadius: 50,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    }

})



export {MediaPicker}
