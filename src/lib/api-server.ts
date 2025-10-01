import { RestaurantTrends, Restaurant } from "./types";

export async function fetchOrderTrends(restaurantId: number): Promise<RestaurantTrends[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/orders/trends?restaurant_id=${restaurantId}`, {
    next: { revalidate: 60 },
  });
  return res.json();
}



export async function fetchTopRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/restaurants/top`, {
    next: { revalidate: 60 },
  });
  return res.json();
}
