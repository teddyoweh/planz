import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { Add } from 'iconsax-react-native';
export default function TabBar({ state, descriptors, navigation }) {
    const getIconColor = (routeName, focused) => {
      return focused ? 'white' : '#5d6271';
    };
  
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'black',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: 40,
          paddingTop: 20,
          borderRadius: 40,
 
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || route.name;
  
          const isFocused = state.index === index;
  
          const icon = (routeName) => {
            switch (routeName) {
              case 'Home':
                return (
                  <MaterialIcons
                    name="home-filled"
                    size={20}
                    color={getIconColor(routeName, isFocused)}
                  />
                );
              case 'Recent':
                return (
                  <MaterialIcons
                    name="history"
                    size={20}
                    color={getIconColor(routeName, isFocused)}
                  />
                );
              case 'Profile':
                return (
                  <AntDesign
                    name="user"
                    size={20}
                    color={getIconColor(routeName, isFocused)}
                  />
                );
              case 'Notifications':
                return (
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color={getIconColor(routeName, isFocused)}
                  />
                );
            case 'New':
                return (
                    <TouchableOpacity
                    onPress={()=>navigation.navigate("NewScreens")}
                    style={{
                      backgroundColor: 'white',
                      width: 50,
                      height: 50,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    >
                      <Add color='#333' size={30}/>
                    </TouchableOpacity>
                );
              default:
                return null;
            }
          };
  
          const route_name = route.name=='New'?'NewScreens':route.name;
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() =>{   navigation.navigate(route_name)}}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {icon(route.name)}
              {
                route.name!='New'&&
        
              <Text
                style={{
                  color: getIconColor(route.name, isFocused),
                  fontSize: 11,
                  marginTop: 5,
                  fontWeight: '500',
                }}
              >
                {label}
              </Text>
                    }
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  