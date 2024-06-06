import axios from "axios";
import { Platform } from "react-native";
import { StorageAdapter } from "../adapters/async-storage";

const STAGE = process.env.EXPO_PUBLIC_STAGE;
const PROD_URL = process.env.EXPO_PUBLIC_API_URL;
const DEV_URL_IOS = process.env.EXPO_PUBLIC_API_URL_IOS;
const DEV_URL_ANDROID = process.env.EXPO_PUBLIC_API_URL_ANDROID;

export const API_URL = (STAGE === "development") ? 
  PROD_URL : 
  Platform.OS === "ios" ? DEV_URL_IOS : DEV_URL_ANDROID;

const tesloApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors
tesloApi.interceptors.request.use(
  async (config) => {
    const token = await StorageAdapter.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  }
)


export {
  tesloApi
}