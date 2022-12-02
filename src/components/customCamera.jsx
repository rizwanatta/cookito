
import {useEffect, useState} from 'react';
import {View,  StyleSheet, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";
import { Camera, CameraType } from "expo-camera";
import {Ionicons} from '@expo/vector-icons'


function  CustomCamera({show,onClose}){

  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(()=>{
    Camera.requestCameraPermissionsAsync()
  },[])

  
  const toggleCameraType  =  ()=> {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }


  return (
    <View>
     <Modal
      animationIn={'slideInUp'}  
      animationOut={'slideOutDown'}
      isVisible={show}
      style={{justifyContent:'flex-end', flex:1,
        }}>

      <Camera style={styles.camera} type={type}>
        <View style={styles.topButtonView}>
          <TouchableOpacity  onPress={toggleCameraType}>
            <Ionicons name={'camera-reverse'} color={'white'} size={50}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Ionicons name={'close-circle'} color={'white'} size={50}/>
          </TouchableOpacity>
        </View>
      </Camera>

      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
    camera:{
      flex:1
    },
  flipButton:{
    height:100,
    width:100,
    padding:10
  },
  topButtonView:{
   flexDirection:'row',
    justifyContent:'space-between'
  }

})



export {CustomCamera}
