import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Scroll, Setting4 } from "iconsax-react-native";
import React,{useState,useRef, useContext} from "react";
import { View,Text, Image, ScrollView, ImageBackground, Dimensions,TouchableOpacity, Pressable } from "react-native";
import PagerView from "react-native-pager-view";
export default function EventPage({route,navigation}){
    
    const {event} = route.params

    return (
        <ScrollView
        style
        ={{
            flex:1,
            backgroundColor:'#fff',
        
        }}
        >
              <ImageBackground
    source={{uri:event.img}}
    style={{
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height / 1.5,
      borderRadius:50,
       

      overflow:'hidden',
 
      marginBottom:8,
      resizeMode:'cover',
      flexDirection:'column',
      justifyContent:'space-between',
      position:"absolute",
      top:0
    
    }}
    >
     
    <BlurView intensity={50} tint="dark" style={{
        flexDirection:'row',
      alignItems:"center",
      justifyContent:'center',
      borderRadius:100,
      height:60,
      width:60,
      overflow:'hidden',
      marginTop:50,
      marginHorizontal:20,
      marginVertical:20
 
    }}>
        <TouchableOpacity
        onPress={()=>{
            navigation.goBack()
        
        }}
        >

    
     <Ionicons name="arrow-back" size={24} color="#fff" />
     </TouchableOpacity>
    </BlurView>
 
     
      </ImageBackground>
        </ScrollView>
    )
}