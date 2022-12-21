import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import { FloatingAction } from "react-native-floating-action";
import dayjs from 'dayjs'

import Swiper from "react-native-swiper";
import { colors } from "../../utils/theme";
import { AddRecipy } from "../../components/addRecipy";
import { Loading } from "../../components/loading";
import { firebase } from "../../services/firebaseConfig";
import { showToast } from "../../utils/help";
import { BButton } from "../../components/BButton";

const sliderHeight = 250;
const slideHight = 250;

function Main({navigation}) {
  const [showAddRecipy, setShowAddRecipy] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [recipieData, setRecipieData] = useState([]);

  // when this component/screen will load infront of user
  useEffect(() => {
      fetchRecipesFromDB()
  }, []);


  const fetchRecipesFromDB = ()=>{
    setShowLoading(true);
    firebase
      .firestore()
      .collection("recipies")
      .get()
      .then((response) => {
        setRecipieData(response.docs);
        setShowLoading(false);
      })
      .catch((error) => {
        console.log({ error });
        setShowLoading(false);
      });
  }


  const onRecipyLongPress = (recipyId)=>{


       firebase
      .firestore()
      .collection('recipies')
      .doc(recipyId)
      .delete()
      .then(response=>{
        showToast('success', 'your recipy got deleted')
      })
       .catch(error=>{
        showToast('error', error.message)
      })

  }

  const __renderItem = ({ item }) => {
    const recipy = item.data();
    const recipyId = item.id

    return (
      <TouchableOpacity 
      onLongPress={()=>onRecipyLongPress(recipyId)}
      >
       <ImageBackground
        style={{ width: 100, height: 100, margin: 5 }}
        source={{ uri: recipy.recipyImageUrl }}
       >
        <Text style={{ color: "white" }}>{recipy.title}</Text>
       </ImageBackground>
      </TouchableOpacity>
    );
  };

  const famousRecipies = [
    {
      title: "Brockliee sandwitch",
      recipieImage:
        "https://cdn.pixabay.com/photo/2016/03/27/17/19/food-1283181_1280.jpg",
    },
    {
      title: "Mash Potatoes",
      recipieImage:
        "https://cdn.pixabay.com/photo/2016/08/11/08/43/potatoes-1585060_1280.jpg",
    },
    {
      title: "Peas and Carrots",
      recipieImage:
        "https://cdn.pixabay.com/photo/2016/08/26/21/16/carrot-juice-1623157_1280.jpg",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: sliderHeight }}>
        <Swiper style={styles.wrapper} showsButtons={true}>
          <ImageBackground
            source={{ uri: famousRecipies[0].recipieImage }}
            style={styles.slide1}
          >
            <Text style={styles.text}>{famousRecipies[0].title}</Text>
          </ImageBackground>

          <ImageBackground
            source={{ uri: famousRecipies[1].recipieImage }}
            style={styles.slide2}
          >
            <Text style={styles.text}>{famousRecipies[1].title}</Text>
          </ImageBackground>

          <ImageBackground
            source={{ uri: famousRecipies[2].recipieImage }}
            style={styles.slide3}
          >
            <Text style={styles.text}>{famousRecipies[2].title}</Text>
          </ImageBackground>
        </Swiper>
      </View>

      <FlatList
        data={recipieData}
        horizontal={true}
        renderItem={__renderItem}
        ListEmptyComponent={<Text>no recipies found </Text>}
        refreshing={showLoading}
        onRefresh={()=>fetchRecipesFromDB()}
      />
    <BButton title={'go to recipies lists'} onButtonPress={
     ()=> navigation.navigate('Recipies')
    }/>


    <Text style={{fontSize:50}}>
   {dayjs().diff(dayjs('1972-10-08'), 'year')}
    </Text>

      <Toast />
      <FloatingAction
        color={colors.primary}
        onPressMain={() => {
          setShowAddRecipy(true);
        }}
      />

      <AddRecipy show={showAddRecipy} onClose={() => setShowAddRecipy(false)} />

      {showLoading && <Loading />}
    </View>
  );
}

export { Main };

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    height: slideHight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    height: slideHight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    height: slideHight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
