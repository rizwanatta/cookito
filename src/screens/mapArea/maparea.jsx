import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

function MapArea({ navigation, route }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        showsUserLocation={true}
        showsUserLocationButton={true}
        zoomControlEnabled
        mapType="satellite"
      >
        {/* <Marke±±±±±±±±±±    ={{ latitude: 31.515997, longitude: 74.3428656 }}
        /> */}
      </MapView>
    </View>
  );
}

export { MapArea };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
