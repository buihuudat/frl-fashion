import { getCachedData, setCachedData } from "@/lib/utils";
import { apiClient } from ".";

// Get all tags
export const getTags = async (): Promise<string[]> => {
  const CACHE_KEY = "tags_cache";

  try {
    const cachedTags = getCachedData(CACHE_KEY);
    if (cachedTags) {
      console.log("Returning cached tags");
      return cachedTags;
    }

    const response = await apiClient.get("/tags"); // <- Cập nhật nếu endpoint khác
    const tags = response.data;

    setCachedData(CACHE_KEY, tags);
    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};
