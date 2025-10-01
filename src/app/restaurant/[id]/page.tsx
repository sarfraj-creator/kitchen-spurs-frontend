"use client";

import { useState } from "react";
import OrderTrendsChart from "@/components/OrderTrendsChart";
import TrendsFiltersPanel from "@/components/TrendsFiltersPanel";
import { RestaurantTrends } from "@/lib/types";
import { fetchOrderTrends } from "@/lib/api-client";
import { filtersSchema } from "@/lib/validation";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurantId = Number(params.id);
  const [filters, setFilters] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    peakHour: number | null;
    minOrderAmount: number | null;
  }>({
    startDate: null,
    endDate: null,
    peakHour: null,
    minOrderAmount: null,
  });

  const [trends, setTrends] = useState<RestaurantTrends[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadFilteredTrends = async () => {
    setIsLoading(true);
    setError("");

    try {
      const params: Record<string, string | number> = {};
      if (filters.startDate)
        params.start_date = filters.startDate.toISOString().split("T")[0];
      if (filters.endDate)
        params.end_date = filters.endDate.toISOString().split("T")[0];
      if (filters.peakHour !== null) params.peak_hour = filters.peakHour;
      if (filters.minOrderAmount !== null)
        params.min_order_amount = filters.minOrderAmount;

      const validated = filtersSchema.safeParse(params);
      if (!validated.success) {
        setError(validated.error.issues[0]?.message || "Invalid filters");
        return;
      }

      const res = await fetchOrderTrends({
        restaurant_id: restaurantId,
        ...params,
      });
      setTrends(res.data);
    } catch {
      setError("Failed to load trends");
    } finally {
      setIsLoading(false);
    }
  };

  const totalRevenue = trends.reduce((sum, t) => sum + t.total, 0);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 Order Trends</h1>
      <TrendsFiltersPanel
        filters={filters}
        setFilters={setFilters}
        onApply={loadFilteredTrends}
      />

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : error ? (
        <Alert variant="destructive">
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      ) : trends.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed rounded-md p-6 text-center text-muted">
          <span className="text-4xl mb-2">📉</span>
          <p className="text-sm">No results found for the selected filters.</p>
          <p className="text-xs text-muted-foreground">
            Try adjusting the date range, peak hour, or order amount.
          </p>
        </div>
      ) : (
        <>
          <p className="text-lg font-medium text-center">
            Total Revenue: ₹{totalRevenue.toLocaleString()}
          </p>
          <OrderTrendsChart data={trends} />
        </>
      )}
    </main>
  );
}
