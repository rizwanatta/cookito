import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { Signin } from "../screens/signin/sigin";
import { Signup } from "../screens/signup/signup";
import { Main } from "../screens/main/main";
import { WebPage } from "../screens/webpage/webpage";
import { Splash } from "../screens/splash/splash";
import { Settings } from "../screens/settings/settings";

function MainNav() {
  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  const iconSize = 18;

  const Home = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={
              route.name === "Main"
                ? "home"
                : route.name === "Settings"
                ? "settings"
                : "person"
            }
            color={focused ? "red" : "grey"}
            size={iconSize}
          />
        ),
      })}
    >
      <Tab.Screen name={"Main"} component={Main} />
      <Tab.Screen name={"WebPage"} component={WebPage} />
      <Tab.Screen name={"Settings"} component={Settings} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { MainNav };
