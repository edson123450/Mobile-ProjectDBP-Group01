import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigation/>
    </SafeAreaProvider>
  );
};
