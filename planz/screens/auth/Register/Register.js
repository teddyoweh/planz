import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState,useContext } from "react";
import { View,Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, SafeAreaView, Image } from "react-native";
import * as Haptics from 'expo-haptics';
import { authstyle } from "../../../styles/authstyle";
import authApi from "../../../api/auth.api";
import { AuthContext } from "../../../context/authContext";
export default function RegisterScreen({navigation}){
    const [passHide,setPassHide] = useState(true)
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastName] = useState('')
    const [email,setEmail]  = useState('')
    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState(null)
    const {login} = useContext(AuthContext)
    const handleRegister = async () => {
        try {
          const user = {
            firstname,
            lastname,
            email,
            username,
            password,
          };
      
 
          const response = await authApi.registerUser(user);
          login(response.user,response.token)
        }
        catch(error_){
 
 
    if (typeof error_ === 'string') {
      setError(error_)
    } else if (error_) {
     setError(error_.message)}
        }
    }
    return (
        <SafeAreaView
        style={{
            backgroundColor:"white",
            flex:1,
            flexDirection:'column'

        }}
        >
            <ScrollView>

            
<View
style={{
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20
    
}}
>
<TouchableOpacity
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.goBack();
            }}
            style={{
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                backgroundColor: '#f2f2f2',
            }}
            >
            <Ionicons name="ios-arrow-back" size={20} color="#aaa" />
            </TouchableOpacity>

</View>

        <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

        keyboardVerticalOffset={50}

        style={{
            paddingHorizontal:20,
            paddingVertical:10,
            alignItems:"center",
            justifyContent:'center'
        }}
        >


<Image 
source={require("../../../assets/logo-white-.png")}

style={{
    width:200,
    height:200
}}
/>
<View
style={{
    width:'100%',
    alignItems:"center",
    justifyContent:'center'
}}
>
    {
        error&&
        <View
        style={authstyle.errorContainer}
        >
            <Text
            
            style={authstyle.errorMessage}
            >
                {error}
            </Text>
        </View>
    }
    <TextInput
    placeholder="Firstname"
    style={authstyle.auth_input}
    value={firstname}
    onChangeText={(text)=>setFirstname(text)}
    autoCapitalize="none"

    />
        <TextInput
    placeholder="Lastname"
    style={authstyle.auth_input}
    value={lastname}
    autoCapitalize="none"
    onChangeText={(text)=>setLastName(text)}
    

    />
          <TextInput
    placeholder="Username"
    style={authstyle.auth_input}
    value={username}
    onChangeText={(text)=>setUserName(text)}
    autoCapitalize="none"

    />
              <TextInput
    placeholder="Email"
    style={authstyle.auth_input}
    value={email}
    onChangeText={(text)=>setEmail(text)}
    autoCapitalize="none"

    />
    <View
        style={authstyle.auth_input}
    >
        <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text)=>setPassword(text)}
        secureTextEntry={passHide}
        autoCapitalize="none"
        style={{
            width:'80%'
        }}/>
        <TouchableOpacity
        onPress={()=>{
            setPassHide(!passHide)
        }}
        >
        <Feather name={passHide?"eye-off":"eye"} size={20} color="#333" />
        </TouchableOpacity>
    </View>
    <View
    style={{flexDirection:'row',width:'90%',alignItems:'space-between',justifyContent:"space-between",
marginBottom:20}}
    >
<TouchableOpacity
onPress={()=>{
    navigation.navigate('LoginScreens')
}}

    style={{flexDirection:'row',alignItems:'center'}}>
     <Text
      style={{
        fontSize:12,
        color:"#777",
        fontWeight:"800",
        marginLeft:4
    }}
    >
 Already got PLANZ?
    </Text>
    <Text
      style={{
        fontSize:12,
        color:"#333",
        fontWeight:"800",
        marginLeft:4
    }}
    >
       Login
    </Text>
</TouchableOpacity>
 
    </View>
    <TouchableOpacity
    onPress={()=>{
        handleRegister()
    }}
    style={{
        backgroundColor:"#333",
        paddingHorizontal:50,
        paddingVertical:18,
        borderRadius:50,
        width:'90%',
        alignItems:"center",
        justifyContent:'center'
    }}
    >
        <Text
        style={{
            color:"white",
            fontSize:16
        }}
        >
            Register
        </Text>
    </TouchableOpacity>
</View>
             
        </KeyboardAvoidingView>
        </ScrollView>
        </SafeAreaView>
    )
}