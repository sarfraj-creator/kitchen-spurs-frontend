import RestaurantGrid from "@/components/RestaurantGrid";
import { fetchTopRestaurants } from "@/lib/api-server";

export default async function HomePage() {
  const restaurants = await fetchTopRestaurants();

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🏆 Top Restaurants by Revenue</h1>
      <RestaurantGrid initialData={restaurants} />
    </main>
  );
}
