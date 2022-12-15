import { SafeAreaView } from "react-native-safe-area-context";
import { MainNav } from "./src/navigation/appNavigator";
import Toast from 'react-native-toast-message'

function App() {
  return (
    <SafeAreaView style={{flex:1}}>
     <MainNav/>
     <Toast/>
    </SafeAreaView>
  );
}

export default App;
