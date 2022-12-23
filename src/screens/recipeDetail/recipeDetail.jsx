import {useState} from 'react';
import { View, Image, Text, StyleSheet } from "react-native";

function  RecipeDetail({navigation, route}){

  const [incomingRecipy, setIncomingRecipy] = useState(route.params.recipy)
  

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri:incomingRecipy.recipyImageUrl}}/>
      <View>
       <Text style={styles.text}>{incomingRecipy.title}</Text>
       <Text style={styles.text}>{incomingRecipy.description}</Text>
       <Text style={styles.text}>{incomingRecipy.ingrediants}</Text>
       </View>
    </View>
  )
}


export {RecipeDetail}

const styles = StyleSheet.create({
  container:{
   flex:1
  },
  image:{
    height:'30%',
    width:'100%'
  },
  text:{
    marginVertical:10,
    fontSize:20
  }

})
