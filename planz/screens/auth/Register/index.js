import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './Register';
 
 
const Stack = createStackNavigator();
 
 
function RegisterStacks() {
  return (
 
      <Stack.Navigator
      screenOptions={
        {
          headerShown: false,
        }
      }
      >
        <Stack.Screen name="RegisterPage" component={RegisterScreen} />
 
      </Stack.Navigator>
 
  );
}

export default RegisterStacks;
