import LandingStack from "./Landing";
import LoginStacks from "./Login";
import * as React from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Add } from 'iconsax-react-native';

import { NavigationContainer } from '@react-navigation/native';
 
import { createStackNavigator } from '@react-navigation/stack';
import RegisterStacks from "./Register";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function AuthScreens(){
    return (
        
      <NavigationContainer>
    <Stack.Navigator
        screenOptions={
          {
            headerShown: false,
          }
        }
        >
          <Stack.Screen name="LandingScreens" component={LandingStack} />
          <Stack.Screen name="LoginScreens" component={LoginStacks} />
          <Stack.Screen name="RegisterScreens" component={RegisterStacks} />
   
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
   