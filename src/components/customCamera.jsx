
import {useEffect, useState, useRef} from 'react';
import {View,  StyleSheet, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";
import { Camera, CameraType } from "expo-camera";
import {Ionicons} from '@expo/vector-icons'


function  CustomCamera({show,onClose, onPictureTaken}){

  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // ref for camera 
   const cameraRef = useRef();

  useEffect(()=>{
    Camera.requestCameraPermissionsAsync()
  },[])

  
  const toggleCameraType  =  ()=> {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

// when we know that is a fun that will just share a data and wont go anywherwe call it with a __ ( private )
  const __takePicture = ()=>{

    if(cameraRef){
      cameraRef.current.takePictureAsync().then(response=>{

        onPictureTaken(response)

      }).catch(error=>{

        alert(error)
      })
    }

  }


  return (
    <View>
     <Modal
      animationIn={'slideInUp'}  
      animationOut={'slideOutDown'}
      isVisible={show}
      style={{justifyContent:'flex-end', flex:1,
        }}>

      <Camera
        style={styles.camera} 
        type={type}
        ref = {cameraRef}
    >
        <View style={styles.topButtonView}>
          <TouchableOpacity  onPress={toggleCameraType}>
            <Ionicons name={'camera-reverse'} color={'white'} size={50}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Ionicons name={'close-circle'} color={'white'} size={50}/>
          </TouchableOpacity>
        </View>

    <View  style={styles.bottomCon}>
          <TouchableOpacity onPress={__takePicture} style={styles.pickBtn}>
            <Ionicons name={'camera'} color={'white'} size={50}/>
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
  },
  bottomCon:{
     height:'90%',
     width:'100%',
     justifyContent:'flex-end',
     alignItems:'center'
  },

})



export {CustomCamera}
