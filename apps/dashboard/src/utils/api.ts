import axios from "axios";
import { Tour } from "../types/globals";
const API_URL = import.meta.env.VITE_API_URL;
import { Location } from "../types/globals";

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
export const createTour = async (
  tourData: Omit<Tour, "id" | "createdAt" | "status">
): Promise<Tour | null> => {
  try {
    const response = await axios.post<Tour>(`${API_URL}/api/tours`, tourData);
    return response.data;
  } catch (error) {
    console.error("Failed to create tour:", error);
    return null;
  }
};
export const deleteTour = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/api/tours/${id}`);
    return true;
  } catch (error) {
    console.error(`Failed to delete tour with id ${id}:`, error);
    return false;
  }
};

export const uploadImages = async (
  files: { file: File; preview: string }[]
) => {
  try {
    const formData = new FormData();

    files.forEach(({ file }) => {
      formData.append("files", file);
    });
    const response = await axios.post(`${API_URL}/api/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Images uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading images:", error);
    return null;
  }
};

export const fetchAllLocations = async (): Promise<Location[]> => {
  try {
    const response = await axios.get<Location[]>(`${API_URL}/api/locations`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    return [];
  }
};
export const createLocation = async (
  locationData: Omit<Location, "id">
): Promise<Location | null> => {
  try {
    const response = await axios.post<Location>(
      `${API_URL}/api/locations`,
      locationData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create location:", error);
    return null;
  }
};
export const deleteLocation = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/api/locations/${id}`);
    return true;
  } catch (error) {
    console.error(`Failed to delete location with id ${id}:`, error);
    return false;
  }
};
