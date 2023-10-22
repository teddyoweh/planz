import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
 
import LoginScreen from './Login';
const Stack = createStackNavigator();
 
 
function LoginStacks() {
  return (
 
      <Stack.Navigator
      screenOptions={
        {
          headerShown: false,
        }
      }
      >
        <Stack.Screen name="LoginPage" component={LoginScreen} />
 
      </Stack.Navigator>
 
  );
}

export default LoginStacks;
