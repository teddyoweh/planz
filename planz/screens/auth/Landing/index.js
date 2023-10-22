import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
 
import LandingScreen from './Landing';
const Stack = createStackNavigator();
 
 
function LandingStack() {
  return (
 
      <Stack.Navigator
      screenOptions={
        {
          headerShown: false,
        }
      }
      >
        <Stack.Screen name="LandingPage" component={LandingScreen} />
 
      </Stack.Navigator>
 
  );
}

export default LandingStack;
