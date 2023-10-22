import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState,useRef,useEffect } from "react";
import { View,Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Dimensions, FlatList } from "react-native";
import * as Haptics from 'expo-haptics';
import { Calendar, SearchNormal, SearchNormal1 } from "iconsax-react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import {Picker} from '@react-native-picker/picker';
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import debounce from 'lodash.debounce';
import eventApi from "../../../api/event.api";
function RenderDateBottomSheet({dateBottomSheet,type,setDate}){
 
    function getAllYearsFrom1999ToNow() {
        const currentYear = new Date().getFullYear();
        const startYear = 1999;
        const yearsArray = [];
      
        for (let year = startYear; year <= currentYear; year++) {
          yearsArray.push(year);
        }
      
        return yearsArray;
      }
      const getYears = (currentYear, range) => {
        const years = [];
        for (let i = 1; i <= Math.abs(range); i++) {
          const year = currentYear + (range > 0 ? i : -i);
          years.push(year);
        }
        return years;
      };
    
 
    
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July',
        'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
      ];
      const options = ['Date','Time']

      const currentYear = new Date().getFullYear();
 
      const [yearslist,setYearsList] = useState([...Array(41).keys()].map(i => currentYear - 20 + i))
      console.log(yearslist)
 
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth,setSelectMonth] = useState(monthNames[new Date().getMonth()])
    const [activeDay,setActiveDay] = useState(new Date().getDate())
    const [selectedHour,setSelectedHour] = useState((new Date().getHours()% 12) || 12)
    const [selectedMinute,setSelectedMinute] = useState(new Date().getMinutes())
    const [selectedAMPM,setSelectedAMPM] = useState(new Date().getHours()>=12?'PM':'AM')
 
    const [activeOption,setActiveOption] = useState(options[0])
  
    const hoursarr = Array.from({ length: 59 }, (_, index) => {
        const number = index + 1;
        return number < 10 ? `0${number}` : `${number}`;
      });
      
      const getDayOfWeek = (year, month, day) => {
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July',
            'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
          ];
        //   const monthNames = [
        //     'January', 'February', 'March', 'April', 'May', 'June', 'July',
        //     'August', 'September', 'October', 'November', 'December'
        //   ];
        const dayOfWeek = new Date(year, monthNames.indexOf(month), day).getDay();
  
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
        // const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return dayNames[dayOfWeek];
      };

      //${getDayOfWeek(selectedYear,selectedMonth,activeDay)}
  const updateDate = () => {
   
    const formattedDate = `${selectedMonth} ${activeDay}, ${selectedYear} ${selectedHour}:${selectedMinute} ${selectedAMPM}`;
    
   setDate(formattedDate);

  };

  
  useEffect(() => {
    updateDate();
  }, [selectedYear, selectedMonth, activeDay, selectedHour, selectedMinute, selectedAMPM]);

    
    return (
        <BottomSheet  draggable={false}  ref={dateBottomSheet} height={Dimensions.get('screen').height-550}
        >
      
            <KeyboardAvoidingView
            style={{
                backgroundColor: 'white',
                height:'100%'
            }}
            >
                
     
            <View
            style={{
                padding:10
            }}
            >
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                paddingVertical:20,
                justifyContent:'space-around'
            }}
            >
                {options.map((option,index)=>{
                    return (
                        <TouchableOpacity
                        key={index}
                        onPress={()=>{
                            Haptics.impactAsync('medium');
                            setActiveOption(option)
                        }}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            paddingHorizontal:20,
                            paddingVertical:10,
                            borderRadius:10,
                            backgroundColor:activeOption==option?'#eee':'#fff',
                             
                            //backgroundColor:activeOption==option?color_scheme(colorMode,'black'):color_scheme(colorMode,'#eee')
                        }}
                        >
                            <Text
                            style={{
                                //color:activeOption==option?color_scheme(colorMode,'white'):color_scheme(colorMode,'black'),
                                fontSize:17,
                                fontWeight:400
                            }}
                            >

                                {option}
                            </Text>
                        </TouchableOpacity>
                    )
                })
                }
            </View>
            {
                activeOption=='Date' &&
         
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
            
                justifyContent:'center',
                paddingTop:20
            }}
            >
        
              
                <Picker
        selectedValue={`${activeDay}`}
        itemStyle={{
            color:""
        }}
        style={{ height: 0, width: 90 }}
        onValueChange={(itemValue, itemIndex) => setActiveDay(`${itemValue}`)}
      >
        {Array.from({ length: 31 }, (_, index) => index + 1).map((d,index)=>{
            return (
                <Picker.Item key={index} label={`${d}`}  value={`${d}`} />
            )
        })
        }
       
        
      </Picker>
      <Picker
        selectedValue={selectedMonth}
        itemStyle={{
           
        }}
        style={{ height: 0, width: 150 , }}
        onValueChange={(itemValue, itemIndex) => setSelectMonth(itemValue)}
      >
        {monthNames.map((m,index)=>{
            return (
                <Picker.Item key={index} label={m}  value={m} />
            )
        })
        }
       
        
      </Picker>
      <Picker
        selectedValue={`${selectedYear}`}
        itemStyle={{
           
        }}
        style={{ height: 0, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedYear(`${itemValue}`)}
      >
        {Array.from({ length: 41 }, (_, index) => new Date().getFullYear() - 20 + index).map((year,index)=>{
            return (
                <Picker.Item label={`${year}`}  key={index} value={`${year}`} />
            )
        })
        }
       
        
      </Picker>
        
            </View>   }
            {
                activeOption=='Time' &&
         
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
            
                justifyContent:'center',
                paddingTop:20
            }}
            >
        
              
                <Picker
        selectedValue={`${selectedHour}`}
        itemStyle={{
           
        }}
        style={{ height: 0, width: 100 }}
        onValueChange={(itemValue, itemIndex) => setSelectedHour(`${itemValue}`)}
      >
        {Array.from({ length: 12 }, (_, index) => index + 1).map((d,index)=>{
            return (
                <Picker.Item key={index} label={`${d}`}  value={`${d}`} />
            )
        })
        }
       
        
      </Picker>
      <Picker
        selectedValue={`${selectedMinute}`}
        itemStyle={{
           
        }}
        style={{ height: 0, width: 100 }}
        onValueChange={(itemValue, itemIndex) => setSelectedMinute(`${itemValue}`)}
      >
        {hoursarr.map((d,index)=>{
            return (
                <Picker.Item key={index}  label={`${d}`}  value={`${d}`} />
            )
        })
        }
       
        
      </Picker>
      <Picker
        selectedValue={`${selectedAMPM}`}
        itemStyle={{
           
        }}
        style={{ height: 0, width: 100 }}
        onValueChange={(itemValue, itemIndex) => setSelectedAMPM(`${itemValue}`)}
      >
        {['AM','PM'].map((year,index)=>{
            return (
                <Picker.Item key={index} label={`${year}`}  value={`${year}`} />
            )
        })
        }
       
        
      </Picker>
        
            </View>   }
           
     
             
                </View>
          
            </KeyboardAvoidingView>
      </BottomSheet>
    )
}
function RenderAccesses() {
    const [accesses, setAccesses] = useState([
      'Public',
      'Private',
      'Request',
      'Friends'
    ]);
    const accessIcons = {
      'Public': <FontAwesome5 name="globe-americas" size={20} color="black" />,
      'Private': <Entypo name="lock" size={20} color="black" />,
      'Request': <MaterialIcons name="access-time" size={20} color="black" />,
      'Friends': <Ionicons name="md-people-sharp" size={20} color="black" />
    };
  
    const [activeAccess, setActiveAccess] = useState(accesses[0]);
  
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 20,
        }}
      >
        {accesses.map((access, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setActiveAccess(access);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
              paddingVertical: 8,
              paddingHorizontal: 20,
              backgroundColor: activeAccess === access ? "#333" : '#f1f1f1',
              borderRadius: 100,
            }}
          >
            {React.cloneElement(accessIcons[access], {
              color: activeAccess === access ? '#fff' : '#bbb',
            })}
            <Text
              style={{
                marginLeft: 10,
                color: activeAccess === access ? '#fff' : '#bbb',
                fontWeight: '300',
                fontSize: 12,
              }}
            >
              {access}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
  

function RenderDate({type,date,setDate}){
    const dateBottomSheet = useRef()

    return (
        <TouchableOpacity
        onPress={()=>{
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            dateBottomSheet.current.show()
        
        }}
        style={{
      
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 100,
            flexDirection: 'column',
            
            justifyContent: 'space-between',
            width: "48%",
        //    borderWidth:0.5,
        //    borderColor:"#333",
           backgroundColor:"#f5f5f5",
             
          
        
        }}
        >
            <Text
             style={styles.form_text}
            >
                {type}

            </Text>
            <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 5,
            
            }}
            >
                <Calendar color="#333" size={18}/>
                <Text
                style={{
                    color: '#333',
                    fontWeight: '300',
                  
                    fontSize:13,
                    marginLeft: 1,
                }}
                >
                    {date}
                </Text>
            </View>
            <View>

            </View>
            <RenderDateBottomSheet dateBottomSheet={dateBottomSheet} type={type} setDate={setDate}/>
        </TouchableOpacity>
    )
}
function RenderDates({ startDate, setStartDate, endDate, setEndDate }) {
        
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 10,
        }}
      >
        <RenderDate setDate={setStartDate} date={startDate} type={"Start"} />
        <RenderDate setDate={setEndDate} date={endDate} type={"End"} />
      </View>
    );
  }
  
function Options({active,setActive,options}){
    return (
        <ScrollView
        contentContainerStyle={{
            alignItems: 'flex-start',
            marginBottom: 10,
    
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        >
            {
                options.map((option,index) => {
                    return (
                        <TouchableOpacity
                        onPress={()=>{
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            setActive(option)
                        
                        }}
                        style={{
                            marginRight: 10,
                            paddingVertical: 20,
                            paddingHorizontal: 30,
                            backgroundColor: active === option ? "#333":'#f1f1f1',
                        
                            borderRadius: 100,

                        }}
                        >
                            <Text
                            style={{
                                color: active === option ? '#fff' : '#bbb',
                                fontWeight: '300',
                              
                            
                            }}
                            >
                                {option}
                            </Text>
                        </TouchableOpacity>
                    )
                }) 
            }
        </ScrollView>
    )

}
function RenderLocationBottomSheet({locationBottomSheet,setLocation}){
    const API_KEY = "7239e3674cb94283ad055f0d94d4eaa6"
    const [location, setLocation_] = useState('');
    const [results, setResults] = useState(null);
    const [coords, setCoords] = useState(null); // Add coords state for storing coordinates
  

    const debouncedSearch = debounce((text) => {
        handleLocationSearch(text);
      }, 300); // Debounce for 300 milliseconds
    
      const handleLocationSearch = async (text) => {
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${text}&key=${API_KEY}`
          );
    
          if (response.data.results && response.data.results.length > 0) {
            setResults(response.data.results);
            console.log(response.data);
          } else {
            setResults([]);
          }
        } catch (error) {
          console.error('Error searching for location:', error);
        }
      };
    
      useEffect(() => {
        if (location.trim() !== '') {
          debouncedSearch(location); // Use the debounced function
        } else {
          setResults([]);
        }
      }, [location]);
    return (
        <BottomSheet draggable={false} sheetBackgroundColor="white"   ref={locationBottomSheet}  height={Dimensions.get('screen').height-100}>
            <KeyboardAvoidingView
            style={{
                backgroundColor: 'white',
                height:'100%',
                paddingHorizontal: 10,
                paddingVertical: 20,
                flexDirection: 'column',
                justifyContent: 'space-between',

                
            }}
            >
                <View
                style={{
                    flexDirection: 'column',
              
                    height: "36%",
                 
                   
                    borderRadius: 20,
                   
                  
                 
                }}
                >

          
                <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: '#f5f5f5',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 15,
               
                }}
                >

<AntDesign name="search1" size={20} color="#aaa" />
<TextInput

placeholder="Search for a location"
placeholderTextColor="#aaa"
style={{
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '300',
    width: '100%',
    color: '#333',
 

}}
autoCorrect={false}
value={location}
            onChangeText={(text) => setLocation_(text)}
/>
                </View>
                <View>
                    {
                        results && <FlatList
                                  data={results}
                                  keyExtractor={(item) => item.annotations.geohash}
                                  renderItem={({ item }) => (
                                    <TouchableOpacity
                                      onPress={() => {
                                        // Handle selecting a location from results
                                        console.log('Selected location:', item);
                                        setLocation(item)
                                        // Set the coordinates when a location is selected
                                        setCoords({
                                          latitude: item.geometry.lat,
                                          longitude: item.geometry.lng,
                                        });
                                      }}
                                      style={{
                                        borderBottomWidth: 0.5,
                                        borderBottomColor: '#ddd',
                                        paddingVertical: 16,
                                      }}
                                    >
                                    <Text style={{ fontSize: 13,fontWeight:"600",color:"#333" }}>{item.formatted}</Text>
                                    </TouchableOpacity>
                                        )}
                                       />
                    }
                    {
                        results==null &&
                        <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 20,
                        
                        
                        }}
                        >
                            <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '300',
                                color: '#aaa',
                              

                            
                            }}
                            >
                               Search for a location
                            </Text>
                        </View>
                    }
                </View>
               
                </View>
                <MapView
                style={{
                    height: "55%",
                    width: '100%',
                    borderRadius: 20,
                    
                  

                }}
                region={
                                coords
                                  ? {
                                      latitude: coords.latitude,
                                      longitude: coords.longitude,
                                      latitudeDelta: 0.02,
                                      longitudeDelta: 0.02,
                                    }
                                  : null
                              }
                            >
                     {coords && (
    <Marker
      coordinate={coords}
      draggable  
      onDragEnd={(e) => {
  
        setCoords(e.nativeEvent.coordinate);
      }}
    />
  )}
                            </MapView>
            </KeyboardAvoidingView>
        </BottomSheet>
    )
}
 
function RenderLocation({location,setLocation}){

    const locationBottomSheet = useRef()
    return (
        <View
        style={{
            flexDirection: 'column',
            paddingTop: 10,
        }}
        >
            <Text
            style={styles.form_text}
            >
                Location
            </Text>
            <TouchableOpacity
           
        //    onPress={()=>{locationBottomSheet.current.show()}}
            >
            <MapView
            style={{
                height: 200,
                width: '100%',
                borderRadius: 20,
                marginTop: 10,
        
            }}
            draggable={false}
            onPress={()=>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                locationBottomSheet.current.show()}}
                region={
                    location
                      ? {
                          latitude: location.geometry.lat,
                          longitude: location.geometry.lng,
                          latitudeDelta: 0.02,
                          longitudeDelta: 0.02,
                        }
                      : null
                  }
                >
         {location && (
<Marker
coordinate={{   latitude: location.geometry.lat,
    longitude: location.geometry.lng,}}
draggable  
onDragEnd={(e) => {

setCoords(e.nativeEvent.coordinate);
}}
/>
        
           )}
                                     </MapView>
           
          
                </TouchableOpacity>
                <RenderLocationBottomSheet locationBottomSheet={locationBottomSheet} setLocation={setLocation}/>
        </View>
    )
}
export default function NewScreen({ navigation }) {
    const [title, setTitle] = useState(''); // State for title
    const [description, setDescription] = useState(''); // State for description
    const [startDate, setStartDate] = useState(''); // State for startDate
    const [endDate, setEndDate] = useState('');  
    const [location, setLocation] = useState(null);  
    const [accesses, setAccesses] = useState([
        'Public',
        'Private',
        'Request',
        'Friends'
      ]);
    const [access, setAccess] = useState('Public');  
    const [activeAccess, setActiveAccess] = useState(accesses[0]);
  
    const options = ['General', 'Party', 'KickBack', 'Dinner/Lunch', 'Meeting', 'Concert', 'Sports', 'Movies', 'Birthday', 'Wedding', 'Other'];
    const [activeOption, setActiveOption] = useState(options[0]);
    const accessIcons = {
        'Public': <FontAwesome5 name="globe-americas" size={20} color="black" />,
        'Private': <Entypo name="lock" size={20} color="black" />,
        'Request': <MaterialIcons name="access-time" size={20} color="black" />,
        'Friends': <Ionicons name="md-people-sharp" size={20} color="black" />
      };
    const handleCreateEvent = async () => {
      // Prepare the event data from the state
      const eventData = {
        title,
        description,
        startDate,
        endDate,
        access,
        tag: activeOption,
        location:location
       
      };
  
      try {
       
        const createdEvent = await eventApi.createEvent(eventData);
  
 
        console.log('Created event:', createdEvent);
  
 e
      } catch (error) {
         
        console.error('Error creating event:', error);
       }
    };
    return (

      <KeyboardAvoidingView

        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}
      >
        <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,

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
        <ScrollView

        contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 20,
       
           
          
        
        }}
        >
                <Options options={options} setActive={setActiveOption} active={activeOption}/>

    <View
    style={styles.form_box}
    >
        <Text
        style={styles.form_text}
        >
            Title
        </Text>
        <TextInput
         placeholder="Eddies Birthday Party"
         value={title}
         onChangeText={(text) => setTitle(text)}
         placeholderTextColor="#7c7c825e"
            style={[styles.form_input,
            {
                color:"#333",
             
                
            }]}
       />
    </View>
    <View
    style={styles.form_box}
    >
        <Text
        style={styles.form_text}
        >
            Description
        </Text>
        <TextInput
               placeholderTextColor="#7c7c825e"
         placeholder="Join us for a park party Games and Food!"
         value={description}
         onChangeText={(text) => setDescription(text)}
            style={[styles.form_input,{
               
   
                color:"#333",
                paddingTop:20,
                paddingBottom: 20,
                paddingLeft: 20,
          
            
            }]}
            multiline={true}
       />
    </View>
 <RenderDates startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
 <RenderLocation location={location} setLocation={setLocation}/>
 <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20 }}>
        {accesses.map((access, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
                setActiveAccess(access); // Update the active access state with the selected option
 
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
              paddingVertical: 8,
              paddingHorizontal: 20,
              backgroundColor: activeAccess === access ? "#333" : '#f1f1f1',
              borderRadius: 100,
            }}
          >
             {React.cloneElement(accessIcons[access], {
              color: activeAccess === access ? '#fff' : '#bbb',
            })}
            <Text
              style={{
                marginLeft: 10,
                color: activeOption === access ? '#fff' : '#bbb',
                fontWeight: '300',
                fontSize: 12,
              }}
            >
              {access}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      
        </ScrollView>
        <View
        style={{
            alignItems: 'center',
            justifyContent: 'center',
           
        
        }}
        >
        <TouchableOpacity
           onPress={handleCreateEvent} 
       style={{
              backgroundColor: '#000',
              borderWidth:3,
              borderColor:"#9790e03f",
              padding: 15,
              paddingVertical: 20,
              borderRadius: 50,
              marginTop: 10,
              width: "90%",
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              position: 'absolute',
                bottom: 20,
       }}

       >
        <Text
        style={{
            fontSize: 20,
            fontWeight: '500',
            color: '#fff',
        
        }}
        >
            Next
        </Text>
        <View
        style={{
           
            marginLeft: 10,
     
        
        }}
        >

       
        {/* <Ionicons name="chevron-forward-outline" size={24} color="white" /> */}
        </View>
       </TouchableOpacity>
       </View>
      </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    form_input:{
        borderWidth: 0.3,
        borderColor: "#333",
      
        textTransform:'uppercase',
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontWeight: "400",
        fontSize: 18,
        borderRadius: 60,
        color:"#333",
        width: "100%",
      marginTop: 10,
      
   
        
    },
    form_text:{
   
        fontWeight:"800",
        fontSize: 12,
        color:"#7c7c825e",
      

    },
    form_box:{
        paddingVertical:10
    }
  });