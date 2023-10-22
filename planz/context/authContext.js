import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authApi from '../api/auth.api';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

 
  const login = async (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
 
    await AsyncStorage.setItem("token", authToken);
        
  };

 
  const logout = () => {
    setUser(null);
    setToken(null);
   
  };
useEffect(() => {
  const fetchStoredData = async () => {
    try {
 
      //const storedUserData = await AsyncStorage.getItem('userData');
      const storedToken = await AsyncStorage.getItem('token');
 
      if ( storedToken) {
        //setUser(JSON.parse(storedUserData));
        setToken(storedToken);
      

     
        try {
          const response = await authApi.verifyToken(storedToken);
     
          if (response) {
        
            setUser(response.user)
     
          
          } else {
        
            console.error('Invalid token:', response.message);
          }
        } catch (error) {
 
          console.error('Error verifying token:', error.message);
          await AsyncStorage.removeItem('token')
        }
      }
    } catch (error) {
      console.error('Error retrieving user data and token from storage:', error);
    }
  };

  fetchStoredData();
}, []);
 






  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
