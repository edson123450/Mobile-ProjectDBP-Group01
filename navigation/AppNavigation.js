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
import ClientProfile from '../screens/ClientProfile';
import MisServicios from '../screens/MisServicios';
import EditarServicio from '../screens/EditarServicio';
import Servicios from '../screens/Servicios';
import Servicio from '../screens/Servicio';

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
        <Stack.Screen name="ClientProfile" options={{ headerShown: false }} component={ClientProfile} />
        <Stack.Screen name="MisServicios" options={{ headerShown: false }} component={MisServicios} />
        <Stack.Screen name="EditarServicio" options={{ headerShown: false }} component={EditarServicio} />
        <Stack.Screen name="Servicios" options={{ headerShown: false }} component={Servicios} />
        <Stack.Screen name="Servicio" options={{ headerShown: false }} component={Servicio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default AppNavigation;