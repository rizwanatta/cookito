import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Signin } from "../screens/signin/sigin";
import { Signup } from "../screens/signup/signup";
import { Main } from "../screens/main/main";
import { WebPage } from "../screens/webpage/webpage";

function MainNav() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="WebPage" component={WebPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { MainNav };
