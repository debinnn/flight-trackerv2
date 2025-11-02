import axios from "axios";

const BASE_URL = "http://api.aviationstack.com/v1";
const API_KEY = "f40b8b1783b1b40b6996ddf6643834ba"; 

export async function getFlights() {
  try {
    const response = await axios.get(`${BASE_URL}/flights`, {
      params: { access_key: API_KEY, limit: 1 }
    });
    return response.data.data; // return only the flight list
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
}
