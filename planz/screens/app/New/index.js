import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
 
import NewScreen from './New';
import { SafeAreaView } from 'react-native';
const NewStack = createStackNavigator();
 
 
function NewStacks() {
  return (
 <SafeAreaView
 style={{
    flex: 1,
    backgroundColor: 'white',
   
 }}
 >


      <NewStack.Navigator
      screenOptions={
        {
          headerShown: false,
        }
      }
      >
        <NewStack.Screen name="NewPage" component={NewScreen} />
 
      </NewStack.Navigator>
      </SafeAreaView>
 
  );
}

export default NewStacks;
