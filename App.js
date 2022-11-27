import { SafeAreaView } from "react-native-safe-area-context";
import { MainNav } from "./src/navigation/appNavigator";

function App() {
  return (
    <SafeAreaView style={{flex:1}}>
     <MainNav/>
    </SafeAreaView>
  );
}

export default App;
