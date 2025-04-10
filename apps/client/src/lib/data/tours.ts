// lib/data/tours.ts
import axios from "axios";
import { Tour } from "@/types/globals";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAllTours = async (location?: string): Promise<Tour[]> => {
  try {
    const url = location
      ? `${API_URL}/api/tours?location=${location}`
      : `${API_URL}/api/tours`;

    const response = await axios.get<Tour[]>(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tours:", error);
    return [];
  }
};
