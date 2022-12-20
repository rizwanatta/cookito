import {useRef, useEffect} from 'react'
import {View, Animated} from 'react-native'
import { BButton } from '../../components/BButton'
import { showToast } from '../../utils/help'
import Toast from 'react-native-toast-message'
import {Calendar} from 'react-native-calendars';
import dayjs from 'dayjs'

function Settings (){
 const fadeAnim = useRef(new Animated.Value(0)).current

  const openCalendar = ()=>{

 Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000,
      }
    ).start();
  }

  return (

    <View style={{flex:1}}>

    <Animated.View style={{opacity: fadeAnim}}>
     <BButton title={'open calendar'} onButtonPress={openCalendar}/>
    </Animated.View>

    <Calendar 

     minDate={dayjs().format('YYYY-MM-DD')}
    />
    <Toast/>
    </View>
  )
}

export {Settings}
