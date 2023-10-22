import {useContext,useState} from 'react'
import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Add } from 'iconsax-react-native';
import TabBar from './components/Tabbar';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreens from './screens/app';
import HomeStacksScreens from './screens/app';
import { StatusBar } from 'expo-status-bar';
import AuthScreens from './screens/auth';
import { AuthProvider, AuthContext } from './context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clear } from 'i/lib/inflections';


 
  function AppContent() { 
    const { token } = useContext(AuthContext); // Get the token from AuthContext
    clearAll = async () => {
      try {
        await AsyncStorage.clear()
      } catch(e) {
        // clear error
      }
    
      console.log('Done.')
    }
    // clearAll()
   return (
    <>
      {token ? <HomeStacksScreens /> : <AuthScreens />}
    </>
  );
}
 
export default function App() {
  return (
    <AuthProvider>  
      <StatusBar />
      <AppContent /> 
    </AuthProvider>
  );
}