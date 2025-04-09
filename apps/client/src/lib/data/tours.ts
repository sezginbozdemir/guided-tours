import axios from "axios";
import { Tour } from "@/types/globals";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAllTours = async (): Promise<Tour[]> => {
  try {
    const response = await axios.get<Tour[]>(`${API_URL}/api/tours`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tours:", error);
    return [];
  }
};
