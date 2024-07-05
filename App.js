import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListScreen from './components/ListScreen';
import UpdateScreen from './components/UpdateScreen';
import AddScreen from './components/AddScreen';
import { ApiProvider } from './context/ApiContext';
 
const Drawer = createDrawerNavigator();

 
export default function App() {
  return (
    <ApiProvider>
    <NavigationContainer>
      <Drawer.Navigator>
       <Drawer.Screen name="list" component={ListScreen} options={{ drawerLabel: 'Liste des Livres' }}/>
      <Drawer.Screen name="add" component={AddScreen} options={{ drawerLabel: 'Ajouter un Livre' }} />
       <Drawer.Screen name="update" component={UpdateScreen} options={{ drawerLabel: 'Update' }} />
      </Drawer.Navigator>
    </NavigationContainer>
    </ApiProvider>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});