import { CACHE_DURATION, isClient } from "@/services";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { ChangeEvent } from "react";
export interface DataType {
  data: string | undefined | ArrayBuffer;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to get cached data
export const getCachedData = (key) => {
  if (!isClient) return null;

  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    return isExpired ? null : data;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return null;
  }
};

// Function to set cached data
export const setCachedData = (key, data) => {
  if (!isClient) return;

  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error writing to localStorage", error);
  }
};

export const getBaseImage = async (e: ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;
  const files = Array.from(e.target.files);

  const data: DataType[] = [];

  for (const file of files) {
    if (file.type.startsWith("image/")) {
      const result = await readFile(file);
      data.push(result);
    } else {
    }
  }

  return data;
};

const readFile = (file: File): Promise<DataType> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        const result: DataType = { data: reader.result };
        resolve(result);
      } else {
        reject(new Error("Failed to read file."));
      }
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
};

const path = "https://api.cloudinary.com/v1_1/ddtagvynp/upload";

export const imageUpload = async (image: any) => {
  try {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "webfood");
    data.append("clound_name", "ddtagvynp");
    const res = await axios.post(path, data);
    return res.data.url;
  } catch (error: any) {
    console.log(error.response.data);
  }
};
