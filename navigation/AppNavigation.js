import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Register from '../screens/Register';
import Login from '../screens/Login';
import ClientHomeScreen from '../screens/ClientHomeScreen';
import WorkerHomeScreen from '../screens/WorkerHomeScreen';
/*import Register from '../screens/Register';
import Login from '../screens/Login';
import HomeScreen from '../screens/HomeScreen';
import ActivityScreen from '../screens/ActivityScreen';
import Profile from '../screens/Profile';*/

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const AppNavigation = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
        <Stack.Screen name="ClientHomeScreen" options={{ headerShown: false }} component={ClientHomeScreen} />
        <Stack.Screen name="WorkerHomeScreen" options={{ headerShown: false }} component={WorkerHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default AppNavigation;