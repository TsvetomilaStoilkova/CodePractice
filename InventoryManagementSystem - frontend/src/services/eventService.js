import axios from 'axios';

const BASE_URL = 'http://localhost:5002'

export const getEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/events`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};