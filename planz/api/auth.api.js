import axios from 'axios';
import { ip } from '../config/ip';

class AuthAPI {
  constructor() {
    this.baseUrl = `http://${ip}/api/auth` ; 
    console.log(this.baseUrl)
  }

  async registerUser(user) {
    try {
      const response = await axios.post(`${this.baseUrl}/register`, user);
      return response.data;
    } catch (error) {

      if (error.response) {
   
        throw error.response.data.error;
      } else {
        alert(error.message)
        throw error.message;
      }
    }
  }
  async loginUser(credentials) {
    try {
      const response = await axios.post(`${this.baseUrl}/login`, credentials);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data.error;
      } else {
        alert(error.message);
        throw error.message;
      }
    }
  }
  async verifyToken(token) {
    try {
      const response = await axios.post(`${this.baseUrl}/verify`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data.error;
      } else {
        alert(error.message);
        throw error.message;
      }
    }
  }
  
}

export default new AuthAPI();
