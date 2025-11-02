import axios from "axios";

const BASE_URL = "http://api.aviationstack.com/v1";
const API_KEY = import.meta.env.VITE_AVIATION_KEY;

export async function getFlightByNumber(flightNumber) {
  try {
    const response = await axios.get(`${BASE_URL}/flights`, {
      params: {
        access_key: API_KEY,
        flight_iata: flightNumber, // e.g., AI101
      },
    });
    return response.data.data; // usually returns an array
  } catch (error) {
    console.error("Error fetching flight:", error);
    throw error;
  }
}
