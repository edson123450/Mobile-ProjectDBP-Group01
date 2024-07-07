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
//import Servicio from '../screens/ServiceDetails';
import WorkerSetHorarioDeTrabajo from '../screens/WorkerSetHorarioDeTrabajo';
import WorkerSchedules from '../screens/WorkerSchedules';
import WorkerServicios from '../screens/WorkerServicios';
import ServiceDetails from '../screens/ServiceDetails';
import ContractWorker from '../screens/ContractWorker';

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
        <Stack.Screen name="WorkerSetHorarioDeTrabajo" options={{ headerShown: false }} component={WorkerSetHorarioDeTrabajo} />
        <Stack.Screen name="WorkerSchedules" options={{ headerShown: false }} component={WorkerSchedules} />
        <Stack.Screen name="WorkerServicios" options={{ headerShown: false }} component={WorkerServicios} />
        <Stack.Screen name="ServiceDetails" options={{ headerShown: false }} component={ServiceDetails} />
        <Stack.Screen name="ContractWorker" options={{ headerShown: false }} component={ContractWorker} />


        <Stack.Screen name="ClientProfile" options={{ headerShown: false }} component={ClientProfile} />
        <Stack.Screen name="MisServicios" options={{ headerShown: false }} component={MisServicios} />
        <Stack.Screen name="EditarServicio" options={{ headerShown: false }} component={EditarServicio} />
        <Stack.Screen name="Servicios" options={{ headerShown: false }} component={Servicios} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default AppNavigation;