import { getCachedData, setCachedData } from "@/lib/utils";
import { apiClient, CACHE_DURATION, isClient } from ".";
import { Product } from "@/types/product";

export interface PaginationType {
  page?: number;
  perPage?: number;
  categorySelected?: string[];
  storeSelected?: string[];
  tagsSelected?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductCartType extends Product {
  count: number;
}

export interface CartType {
  _id?: string;
  user: string;
  products: ProductCartType[];
  totalPrice: number;
}

export const InitialCart: CartType = {
  user: "",
  products: [],
  totalPrice: 0,
};

export enum OrderStatus {
  done = "done",
  success = "success",
  pending = "pending",
  access = "access",
  refuse = "refuse",
}

export enum PayMethod {
  payNow = "payNow",
  lastPay = "lastPay",
}

export enum PayStatus {
  pending = "pending",
  falure = "falure",
  success = "success",
}
export interface PayType {
  method: PayMethod;
  amount: number;
  status: PayStatus;
}

export interface OrderItemType {
  _id?: string;
  products: ProductCartType[];
  totalPrice: number;
  status: OrderStatus;
  message?: string;
  pay: PayType;
  createdAt?: Date;
  updatedAt?: Date;
}

export const getProducts = async (pagination?: PaginationType) => {
  const CACHE_KEY = "products_cache";

  try {
    // Nếu không có pagination => kiểm tra cache
    if (!pagination) {
      const cachedProducts = getCachedData(CACHE_KEY);
      if (cachedProducts) {
        console.log("Returning cached products");
        return cachedProducts;
      }

      const response = await apiClient.get("/products");
      const products = response.data;
      setCachedData(CACHE_KEY, products);
      return products;
    }

    // Nếu có pagination => build query string
    const queryParams = new URLSearchParams();

    if (pagination.page) queryParams.append("page", pagination.page.toString());

    if (pagination.perPage)
      queryParams.append("perPage", pagination.perPage.toString());

    if (pagination.categorySelected?.length)
      queryParams.append("category", pagination.categorySelected.join(","));

    if (pagination.storeSelected?.length)
      queryParams.append("shop", pagination.storeSelected.join(","));

    if (pagination.minPrice != null)
      queryParams.append("minPrice", pagination.minPrice.toString());

    if (pagination.maxPrice != null)
      queryParams.append("maxPrice", pagination.maxPrice.toString());

    const apiUrl = `/products?${queryParams.toString()}`;
    const response = await apiClient.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Function to fetch a single product by ID with caching
export const getProductById = async (id: string) => {
  const cacheKey = `product_${id}`;

  try {
    const cachedProduct = getCachedData(cacheKey);
    if (cachedProduct) {
      console.log(`Returning cached product with ID ${id}`);
      return cachedProduct;
    }

    const response = await apiClient.get(`/products/${id}`);
    const product = response.data;

    setCachedData(cacheKey, product);
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export const getProductSimilar = async ({ category, tags }) => {
  const cacheKey = `product_similar`;

  try {
    // const cachedProduct = getCachedData(cacheKey);
    // if (cachedProduct) {
    //   return cachedProduct;
    // }

    const response = await apiClient.post(`/products/similar`, {
      category,
      tags,
    });
    const product = response.data;

    // setCachedData(cacheKey, product);
    return product;
  } catch (error) {
    throw error;
  }
};

export const addReview = async ({
  productId,
  userId,
  content,
  commentId,
  rate,
}: {
  productId: string;
  userId: string;
  content: string;
  commentId: string;
  rate: number;
}) =>
  await apiClient.post(`/comments/product/${productId}/user/${userId}`, {
    content,
    commentId,
    rate,
  });

export const createOrder = async ({
  userId,
  order,
}: {
  userId: string;
  order: OrderItemType;
}) => {
  try {
    const res = await apiClient.post(`/orders/user/${userId}`, { order });
    return res.data;
  } catch (error) {
    console.log({ error });
  }
};

export const getOrders = async (userId: string) => {
  try {
    const res = await apiClient.get(`/orders/user/${userId}`);
    return res.data;
  } catch (error) {
    console.log({ error });
  }
};

export const cancelOrder = async (
  userId: string,
  orderId: string,
  status: PayStatus
) => {
  try {
    const res = await apiClient.put(`/orders/${orderId}/user/${userId}`, {
      status,
    });
    return res.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const getOrder = async ({
  userId,
  orderId,
}: {
  userId: string;
  orderId: string;
}) => {
  try {
    const res = await apiClient.get(`/orders/${orderId}/user/${userId}`);
    return res.data;
  } catch (error) {
    console.log({ error });
  }
};

export const getCommentProduct = async (productTitle: string) => {
  try {
    const res = await apiClient.get(`/comments/${productTitle}`);
    return res?.data;
  } catch (error) {
    console.log({ error });
  }
};
