import { getCachedData, setCachedData } from "@/lib/utils";
import { apiClient } from ".";
import { NewsListResponse, NewsType } from "@/types/news";

// Get all news
export const getNews = async (): Promise<NewsListResponse> => {
  const CACHE_KEY = "news_cache";

  try {
    const cachedNews = getCachedData(CACHE_KEY);
    if (cachedNews) {
      console.log("Returning cached news");
      return cachedNews;
    }

    const response = await apiClient.get("/news");
    const news = response.data;

    setCachedData(CACHE_KEY, news);
    return news;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

// Get a single news item by ID
export const getNewsById = async (title: string): Promise<NewsType> => {
  const CACHE_KEY = `news_detail`;

  try {
    const cachedItem = getCachedData(CACHE_KEY);
    if (cachedItem) {
      console.log(`Returning cached news with title ${title}`);
      return cachedItem;
    }

    const response = await apiClient.get(`/news/${title}`);
    const newsItem = response.data;

    setCachedData(CACHE_KEY, newsItem);
    return newsItem;
  } catch (error) {
    console.error(`Error fetching news with ID ${id}:`, error);
    throw error;
  }
};
