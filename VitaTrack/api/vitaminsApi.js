// vitaminsApi.js
import axios from 'axios';
import { getAuthData, clearAuthData } from '../auth'; // Adjust the import path as per your project structure

const fetchVitamins = async () => {
  try {
    const { accessToken } = await getAuthData();
   

    const response = await axios.get('http://192.168.1.148:8000/api/vitamin/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

  
    return response.data; // Return data or set state as needed
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Propagate other errors to handle in the UI or other parts of your code
  }
};

export default fetchVitamins;
