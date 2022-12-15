import {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Loading} from '../../components/loading'
import { showToast } from '../../utils/help';


function Splash({navigation}){


  const loadAfterTime = ()=>{
    showToast('success', 'WELCOME')
     navigation.navigate('Signin')
  }

  /***
   * this will run when screen turns on
   */
  useEffect(() => {
    // to wait for  atime we use power of timeout
     setTimeout(loadAfterTime,3000); 
  }, [])


  return (
    <View style={styles.mainCon}>
         <Loading/>
    </View>
  )
}


const styles=  StyleSheet.create({
    mainCon: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'red'
    }
})


export {Splash}
