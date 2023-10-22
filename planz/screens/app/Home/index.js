import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
const Stack = createStackNavigator();
 
 
function HomeStacks() {
  return (
 
      <Stack.Navigator
      screenOptions={
        {
          headerShown: false,
        }
      }
      >
        <Stack.Screen name="Home" component={HomeScreen} />
 
      </Stack.Navigator>
 
  );
}

export default HomeStacks;
