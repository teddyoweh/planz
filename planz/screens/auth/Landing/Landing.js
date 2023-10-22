import { View,Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import * as Haptics from 'expo-haptics'; 
export default function LandingScreen({navigation}){
    return (
       <ImageBackground source={require('../../../assets/landing.jpeg')} style={{flex:1,width: '100%', height: '100%',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <View
        
        stle={{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
     
        
        }}
        >
          <Image 
          source={require('../../../assets/logo.png')}
          />
        </View>
        <View
        style={{
            flexDirection:'column',
            paddingBottom: 60,
            paddingHorizontal: 10
        }}
        >
            
            <View
            style={{
                fontSize: 40,
                fontWeight: '900',
                color: 'white',
                textAlign: 'left',
                marginTop: 100,
                flexDirection:'column',
                paddingHorizontal: 8,

            
            }}
            >
                <Text
                
                style={{
                    fontSize:40,
                    fontWeight: '900',
                    color: 'white',
                    textAlign: 'left',
                    marginTop: 100,
                    flexDirection:'column',
    
                
                }}>
                    SocialCoordination
                </Text>
                <Text
                     style={{
                        fontSize: 55,
                        fontWeight: '900',
                        color: '#aaa',
                        textAlign: 'left',
                      
                        flexDirection:'column'
        
                    
                    }}
                >
                    Made Easy
            </Text>
            </View>
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
            }}
            >
                <TouchableOpacity
                                onPress={()=>{Haptics.impactAsync("medium");  navigation.navigate('RegisterScreens')}}

                style={{
                    backgroundColor: '#fff',
                    paddingVertical: 15,
                    paddingHorizontal: 40,
                    borderRadius: 100,
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop: 20,
                    width: "50%",
              
                
                }}
                
                >
                    <Text
                    
                    style={{
                        fontSize: 20,
                        fontWeight: '500',
                        color: '#000',
                        textAlign: 'left',
                        flexDirection:'column'
        
                    
                    
                    }}>
                        Get Started
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={()=>{Haptics.impactAsync("medium");  navigation.navigate('LoginScreens')}}
                style={{
       
                    paddingVertical: 15,
                    paddingHorizontal: 40,
                    borderRadius: 100,
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop: 20,
                    borderWidth: 1,
                    borderColor: '#fff',
                    marginLeft: 10,
                    width: "50%",
                
                }}
                
                >
                    <Text
                    
                    style={{
                        fontSize: 20,
                        fontWeight: '500',
                        color: '#fff',
                        textAlign: 'left',
                        flexDirection:'column'
        
                    
                    
                    }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    </ImageBackground>
    )
}