import axios from "axios";

const API_BASE_URL = "http://localhost:5002/api/books";

export const addBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, bookData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const scrappingBook = async (bookName, quantityScrapping) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/scrapping/${bookName}`, {
      quantityScrapping,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sellBook = async (sellData) => {
  console.log(sellData);
  try {
    const response = await axios.put(
      `${API_BASE_URL}/sell/${sellData.bookName}`,
      sellData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
