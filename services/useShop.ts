import { getCachedData, setCachedData } from "@/lib/utils";
import { apiClient } from ".";
import { ShopType } from "@/types/shop";

// Function to fetch all shops with caching
export const getShops = async (): Promise<ShopType[]> => {
  const CACHE_KEY = "shops_cache";

  try {
    const cachedShops = getCachedData(CACHE_KEY);
    if (cachedShops) {
      console.log("Returning cached shops");
      return cachedShops;
    }

    const response = await apiClient.get("/shops");
    const shops = response.data;

    setCachedData(CACHE_KEY, shops);
    return shops;
  } catch (error) {
    console.error("Error fetching shops:", error);
    throw error;
  }
};

// Function to fetch a single shop by ID with caching
export const getShopById = async (id: string): Promise<ShopType> => {
  const CACHE_KEY = `shop_${id}`;

  try {
    const cachedShop = getCachedData(CACHE_KEY);
    if (cachedShop) {
      console.log(`Returning cached shop with ID ${id}`);
      return cachedShop;
    }

    const response = await apiClient.get(`/shops/${id}`);
    const shop = response.data;

    setCachedData(CACHE_KEY, shop);
    return shop;
  } catch (error) {
    console.error(`Error fetching shop with ID ${id}:`, error);
    throw error;
  }
};
