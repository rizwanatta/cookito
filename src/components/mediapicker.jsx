import {View,  Text ,  StyleSheet, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

import {BButton} from './BButton';

function MediaPicker({show,onClose, onCameraPressed, onGalleryPressed}){

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

          <TouchableOpacity style={styles.circleView}> 
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
