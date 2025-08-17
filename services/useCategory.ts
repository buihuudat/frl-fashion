import { getCachedData, setCachedData } from "@/lib/utils";
import { apiClient } from ".";

// Get all categories
export const getCategory = async (): Promise<string[]> => {
  const CACHE_KEY = "category_cache";

  try {
    const cachedCategory = getCachedData(CACHE_KEY);
    if (cachedCategory) {
      console.log("Returning cached category");
      return cachedCategory;
    }

    const response = await apiClient.get("/categories"); // <-- Đảm bảo đúng endpoint
    const categories = response.data;

    setCachedData(CACHE_KEY, categories);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
