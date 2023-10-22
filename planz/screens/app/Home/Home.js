import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Scroll, Setting4 } from "iconsax-react-native";
import React,{useState,useRef, useContext} from "react";
import { View,Text, Image, ScrollView, ImageBackground, Dimensions,TouchableOpacity, Pressable } from "react-native";
import PagerView from "react-native-pager-view";
import { AuthContext } from "../../../context/authContext";
 
const events_data = [
  {
    img: "https://images.unsplash.com/photo-1619229665876-f54b2276b7bd?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Washington, DC",
    name: "Bujus Concert",
    day: "18",
    month: "Jan",
    desc: "Come celebrate Bujus Concert with us! It's going to be a night full of music and entertainment."
  },
  {
    img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Soccer Match",
    location: "Lagos, Nigeria",
    day: "14",
    month: "Aug",
    desc: "Join us for an exciting soccer match in Lagos, Nigeria. Bring your friends and enjoy the game!"
  },
  {
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MTQ1MjV8MHwxfHNlYXJjaHwyfHxjb25jZXJ0fGVufDB8fHx8MTY5Nzk1NTU4NXww&ixlib=rb-4.0.3&q=85",
    location: "Washington, DC",
    name: "Bujus Concert",
    day: "18",
    month: "Jan",
    desc: "Another chance to celebrate Bujus Concert in Washington, DC. Get ready for a night of great music and fun!"
  },
  {
    img: "https://images.unsplash.com/photo-1557754897-ca12c5049d83?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Washington, DC",
    name: "Calculus Test Prep",
    day: "18",
    month: "Jan",
    desc:  "Let's get ready for the Calculus test! We'll be going over some practice problems and reviewing key concepts."
  },
];

function RenderEvent({item,navigation}){
  return (
    <Pressable
    onPress={()=>{
      navigation.navigate('EventPage',{
        event:item
      })
    }}
    style={{
    
    }}
    >

   
    <ImageBackground
    source={{uri:item.img}}
    style={{
      width:Dimensions.get('window').width-20,
      height:Dimensions.get('window').height / 1.5,
      borderRadius:50,
       

      overflow:'hidden',
  marginHorizontal:10,
      marginBottom:8,
      resizeMode:'cover',
      flexDirection:'column',
      justifyContent:'space-between',
    
    }}
    >
      <View
      style={{
        alignItems:'flex-end',
        paddingHorizontal:20,
        paddingTop:20,
      }}
      >
    <BlurView intensity={50} tint="dark" style={{
      alignItems:"center",
      justifyContent:'center',
      borderRadius:100,
      height:80,
      width:80,
      overflow:'hidden',
 
    }}>
      <Text
      style={{
        color:'#fff',
        fontSize:27,
        fontWeight:'900',
      }}
      >
        {item.day}
      </Text>
      <Text
      style={{
        color:'#fff',
        fontSize:16,
        fontWeight:'500',
      }}
      >
        {item.month}
      </Text>
    </BlurView>
      </View>
      <View
      intensity={50} tint="dark"
      style={{
        flexDirection:'column',
         
        borderRadius:20,
        overflow:'hidden',
        paddingVertical:30,
        paddingHorizontal:25,
      }}
      >
         <Text
      style={
        {
          color:'#eee',
          fontSize:13,
          fontWeight:'600',
          marginBottom:4,
          
        }
      }
      >
        {item.location}
      </Text>
      <Text
      style={
        {
          color:'#fff',
          fontSize:33,
          fontWeight:'900',
        
        }
      }
      >
        {item.name}
      </Text>
 
      </View>
      </ImageBackground>
      </Pressable>
  )
}
export default function HomeScreen({navigation}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const pagerViewRef = useRef(null);
  const handlePageScroll = (e) => {
    const { offset ,positon} = e.nativeEvent;
  
    setScrollPosition(e.nativeEvent.position);
  };
  const scrollToIndex = (index) => {
    if (pagerViewRef.current) {
      pagerViewRef.current.setPage(index);
      setScrollPosition(index); // Update the scroll position state
    }
  };
const {user} = useContext(AuthContext)
  const filters = ['Upcoming', 'Completed','Work','Entertainment','Religious','Sports','Shopping', 'Others']
  const [activeFilter, setActiveFilter] = useState(filters[0])
    return (
      user &&
      <View
      style={{
        flex:1,
        backgroundColor:'#fff',
      
 
        paddingBottom:10,
      }}
      >
         <BlurView
      intensity={10}
      tint="light"
        style={{
          paddingHorizontal:10,
          backgroundColor:"transparennt"
        }}
        >
       <View
       style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      
        paddingVertical:10,
       }}
       >
        <View
           style={{
            flexDirection:'row',
            alignItems:'center',}}
        >

       
        <Image
        source={{uri:"https://i.pinimg.com/564x/8d/b4/5a/8db45ac77819eca514fcdcf4ea31f4d4.jpg"}}
        style={{
          width:50,
          height:50,
          borderRadius:25,
          marginRight:10,
        }}
        />
        <View
        style={{
          flexDirection:'column',
      
        
        }}
        >
          <Text
          style={{
            color:"#8c7c82",
            fontSize:14,
            fontWeight:'500',
            fontFamily:"Georgia"
          }}
          >
            Welcome,
          </Text>
          <Text
          style={{
            color:"#333",
            fontWeight:'500',
            fontSize:23,
            fontFamily:"Georgia"
           
          }}
          >
        {user.firstname+' '+user.lastname}
          </Text>
          </View>
          </View>
          <TouchableOpacity
          style={{
            backgroundColor:'#f1f1f1',
            padding:10,
            borderRadius:50,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
          }}
          >
          <Ionicons name="people-sharp" size={20} color="#aaa" />
          </TouchableOpacity>
   
        </View>
        <View
        style={{
          flexDirection:'row',
          alignItems:'center',
          marginBottom:20,
       
        }}
        >
          {/* <TouchableOpacity
          style={{
            marginRight:20,
    
            height:40,
            width:40,
            backgroundColor:"#f1f1f1",
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:100
          }}
          
          >
          <Setting4 size="16" color="#aaa"/>
          </TouchableOpacity> */}
  
        <ScrollView 
contentContainerStyle={{
  flexDirection:'row',
  alignItems:'center',
  backgroundColor:"#f1f1f1",

  paddingHorizontal:10,

  paddingVertical:5,
  borderRadius:30
  
}}
      style={{
   
    

        
      }}
      showsHorizontalScrollIndicator={false}
      horizontal={true}> 
        {
          filters.map((filter, index)=>{
            return (
              <TouchableOpacity
              onPress={()=>setActiveFilter(filter)}
              style={{
             
                paddingHorizontal:20,
                paddingVertical:10,
                borderRadius:30,
                marginRight:5,
             
                flexDirection:'row',
                alignItems:'center',
                backgroundColor:filter===activeFilter?"#fff":'transparent',
                borderWidth:1,
                borderColor:filter===activeFilter?"#ddd":'transparent',
              
              }}
              >
                  {/* {
                  activeFilter===filter&&
                  <View
                  style={{
                    marginRight:10,
                    height:5,
                    width:5,
                    borderRadius:50,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
    
                    backgroundColor:filter===activeFilter?"#fff":'#999',
          
                  }}
                  />
                } */}
                <Text
                style={{
                  fontSize:13,
                  fontWeight:filter===activeFilter?'300':200,
                  color:filter===activeFilter?"#333":'#7c7c82',
                
                }}
                >
                  {filter}
                </Text>
              
             
  
              </TouchableOpacity>
            )
        })}
      </ScrollView>
      </View>
      </BlurView>
      <View
      style={{
        flexDirection:'row',
        flex:1
      }}
      >

   
      <PagerView style={{ flex:1  }} pageMargin={10} orientation="vertical"
          onPageScroll={handlePageScroll}
          ref={pagerViewRef}
      >
 
      
{/* <ScrollView> */}

            {
              events_data.map((item,index)=>{
                return (
                  <RenderEvent item={item} navigation={navigation}/>
                )
              })
            }
           
{/* </ScrollView> */}
        </PagerView>
        {/* <View
        style={{
           
          alignItems:'center',
          justifyContent:'center',
          marginHorizontal:10
        }}
        >
          <View
          
          >
            {
              events_data.map((item,index)=>{  
                return (
                  <TouchableOpacity
                  onPress={()=>scrollToIndex(index)}
                  style={{
                    width:10,
                    height:index==scrollPosition?25:10,
                    borderRadius:50,
                    backgroundColor: index==scrollPosition?"#333": '#ccc',
                    marginVertical:5,
                  }}
                  />
                )
              }
              )
            }
          </View>

        </View> */}
        </View>
  
      </View>
    );
  }
  