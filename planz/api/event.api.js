import axios from 'axios';
import { ip } from '../config/ip';

class EventAPI {
  constructor() {
    this.baseUrl = `http://${ip}/api/events`; // Change the base URL to your event control endpoint
  }

  async createEvent(event) {
    try {
      const response = await axios.post(`${this.baseUrl}/create`, event);
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

  async getEvents() {
    try {
      const response = await axios.get(`${this.baseUrl}/`);
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

  async getEventById(eventId) {
    try {
      const response = await axios.get(`${this.baseUrl}/${eventId}`);
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

  async updateEvent(eventId, updatedEvent) {
    try {
      const response = await axios.put(`${this.baseUrl}/${eventId}`, updatedEvent);
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

  async deleteEvent(eventId) {
    try {
      const response = await axios.delete(`${this.baseUrl}/${eventId}`);
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

export default new EventAPI();
