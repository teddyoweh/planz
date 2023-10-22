import * as React from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Add } from 'iconsax-react-native';
import TabBar from '../../components/Tabbar';
import { NavigationContainer } from '@react-navigation/native';
import HomeStacks from './Home';
import NewStacks from './New';
import { createStackNavigator } from '@react-navigation/stack';
import EventPage from './Home/EventPage';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function HomeScreen(){
  return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Home</Text>
    </View>
  )
}
  function HomeScreens() {
 
    const Tab = createBottomTabNavigator();
  
    return (
  
        <Tab.Navigator
          tabBar={(props) => <TabBar {...props} />}
          screenOptions={({ route }) => ({
            headerShown: false,
          })}
        >
 
          <Tab.Screen name="Home">
            {() => (
              <SafeAreaView style={{ flex: 1,        backgroundColor:'#fff', }}>
                <HomeStacks />
              </SafeAreaView>
            )}
          </Tab.Screen>
          <Tab.Screen name="Recent">
            {() => (
              <SafeAreaView style={{ flex: 1,        backgroundColor:'#fff', }}>
               <HomeStacks />
              </SafeAreaView>
            )}
          </Tab.Screen>
          <Tab.Screen name="New">
            {() => {
              alert('New');
            }
              }
          </Tab.Screen>
          <Tab.Screen name="Notifications">
            {() => (
              <SafeAreaView style={{ flex: 1,        backgroundColor:'#fff', }}>
          <HomeStacks />
              </SafeAreaView>
            )}
          </Tab.Screen>
          <Tab.Screen name="Profile">
            {() => (
              <SafeAreaView style={{ flex: 1,        backgroundColor:'#fff', }}>
        <HomeStacks />
              </SafeAreaView>
            )}
          </Tab.Screen>
        </Tab.Navigator>
 
    );
  }

export default function HomeStacksScreens(){
  return (
    <NavigationContainer>
  <Stack.Navigator
      screenOptions={
        {
          headerShown: false,
        }
      }
      >
        <Stack.Screen name="HomeScreens" component={HomeScreens} />
        <Stack.Screen name="NewScreens" component={NewStacks} />
        <Stack.Screen name="EventPage" component={EventPage} />
 
      </Stack.Navigator>
    </NavigationContainer>
  )
}

 
 
 