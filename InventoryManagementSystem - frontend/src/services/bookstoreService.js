import axios from "axios";

const API_BASE_URL = "http://localhost:5002/api"; 

export const addBookstore = async (bookstoreData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/bookstores/add`,
      bookstoreData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookstores = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookstores`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
