import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { View,Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, SafeAreaView, Image } from "react-native";
import * as Haptics from 'expo-haptics';
import { authstyle } from "../../../styles/authstyle";
import authApi from "../../../api/auth.api";
import { AuthContext } from "../../../context/authContext";
export default function LoginScreen({navigation}){
    const [passHide, setPassHide] = useState(true);
    const [uid, setUId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {login} = useContext(AuthContext)
    const handleLogin = async () => {
      try {
        const credentials = {
          uid,
          password,
        };
  
        const response = await authApi.loginUser(credentials);
        login(response.user,response.token)
       } catch (error_) {
        if (typeof error_ === 'string') {
          setError(error_);
        } else if (error_) {
          setError(error_.message);
        }
      }
    };
    return (
        <SafeAreaView
        style={{
            backgroundColor:"white",
            flex:1,
            flexDirection:'column'

        }}
        >
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
{error && (
            <View style={authstyle.errorContainer}>
              <Text style={authstyle.errorMessage}>{error}</Text>
            </View>
          )}
    <TextInput
    placeholder="Username or Email"
    style={authstyle.auth_input}
    value={uid}
    onChangeText={(text)=>setUId(text)}
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
    navigation.navigate('RegisterScreens')
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
        New Here?
    </Text>
    <Text
      style={{
        fontSize:12,
        color:"#333",
        fontWeight:"800",
        marginLeft:4
    }}
    >
        Get Started
    </Text>
</TouchableOpacity>
<TouchableOpacity

    style={{flexDirection:'row',alignItems:'center'}}>
 
    <Text
      style={{
        fontSize:12,
        color:"#333",
        fontWeight:"800",
        marginLeft:4
    }}
    >
        Reset Password
    </Text>
</TouchableOpacity>
    </View>
    <TouchableOpacity
     onPress={() => {
        handleLogin();
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
            Login
        </Text>
    </TouchableOpacity>
</View>
             
        </KeyboardAvoidingView>
        </SafeAreaView>
    )
}