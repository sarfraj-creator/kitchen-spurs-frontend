import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const fetchTopRestaurants = async (params?: any) =>
  axios.get(`${API_BASE}/restaurants/top`, { params });

export const fetchOrderTrends = async (params?: any) =>
  axios.get(`${API_BASE}/orders/trends`, { params });
