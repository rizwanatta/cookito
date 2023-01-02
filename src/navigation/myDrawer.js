import { createDrawerNavigator } from '@react-navigation/drawer';
import { Main } from '../screens/main/main';
import { WebPage } from '../screens/webpage/webpage';


const Drawer = createDrawerNavigator();

function MyDrawer() {

  return (
  <Drawer.Navigator>
    <Drawer.Screen  name= 'home' component={Main}/>
    <Drawer.Screen  name= 'webPage' component={WebPage}/>
  </Drawer.Navigator>
  )

}


export {MyDrawer}
