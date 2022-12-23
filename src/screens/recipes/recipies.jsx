
import { useState, useEffect } from "react";
import {TouchableOpacity,ImageBackground, View, Text ,FlatList } from "react-native"
import { Input } from "../../components/input";
import { firebase } from "../../services/firebaseConfig";

function Recipies({navigation}) {

  const [showAddRecipy, setShowAddRecipy] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [recipieData, setRecipieData] = useState([]);
  const [recipieFilteredData, setRecipieFilteredData] = useState();

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

  const __renderItem = ({ item }) => {
    const recipy = item.data();
    const recipyId = item.id

    return (
      <TouchableOpacity 
      style={{width:'100%'}}
      onPress={()=>
        navigation.navigate('RecipeDetail', {recipy:recipy})

      }
      >
       <ImageBackground
        style={{ width: '100%', height: 120, justifyContent: 'center', alignItems: 'center', marginVertical:10}}
        source={{ uri: recipy.recipyImageUrl }}
       >
        <Text style={{ color: "white" }}>{recipy.title}</Text>
       </ImageBackground>
      </TouchableOpacity>
    );
  };


  const onUserInput  = (text)=>{
         
      const filteredData = recipieData.filter(item=> item.data().title?.includes(text))
    console.log(recipieData)
    console.log(filteredData)
       if(filteredData.length>0){
         setRecipieFilteredData(filteredData)
       }else {
          
       }
     
  }


  return (
    <>
     <Input placeholder={'search recipie'} showIcon={true} iconName={'search'} onChange={onUserInput}/>

      <FlatList
        data={ recipieFilteredData || recipieData}
        renderItem={__renderItem}
        ListEmptyComponent={<Text>no recipies found </Text>}
        refreshing={showLoading}
        onRefresh={()=>fetchRecipesFromDB()}
      />
    </>
  );
}

export { Recipies };
