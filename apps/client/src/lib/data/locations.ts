import axios from "axios";
import { Location } from "@/types/globals";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAllLocations = async (): Promise<Location[]> => {
  try {
    const response = await axios.get<Location[]>(`${API_URL}/api/locations`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    return [];
  }
};
