import axios from "@/lib/axios";
import { Restaurant, RestaurantTrends } from "./types";

export const fetchTopRestaurants = async (
  params?: Record<string, string>
): Promise<{ data: Restaurant[] }> => {
  return axios.get("/restaurants/top", { params });
};

export const fetchOrderTrends = async (
  params: Record<string, string | number>
): Promise<{ data: RestaurantTrends[] }> => {
  return axios.get("/orders/trends", { params });
};
