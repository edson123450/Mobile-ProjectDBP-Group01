import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Register from '../screens/Register';
import Login from '../screens/Login';
import ClientHomeScreen from '../screens/ClientHomeScreen';
import WorkerHomeScreen from '../screens/WorkerHomeScreen';
import AgregarServicio from '../screens/AgregarServicio';
import WorkerProfile from '../screens/WorkerProfile';

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
        <Stack.Screen name="AgregarServicio" options={{ headerShown: false }} component={AgregarServicio} />
        <Stack.Screen name="WorkerProfile" options={{ headerShown: false }} component={WorkerProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default AppNavigation;