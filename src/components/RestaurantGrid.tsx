"use client";

import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import FiltersPanel from "./FiltersPanel";
import { Restaurant, Filters } from "@/lib/types";
import { fetchTopRestaurants } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { filtersSchema } from "@/lib/validation";

interface Props {
  initialData?: Restaurant[]; 
}

export default function RestaurantGrid({ initialData = [] }: Props) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(initialData);
  const [filters, setFilters] = useState<Filters>({
    startDate: null,
    endDate: null,
  });
  const [page, setPage] = useState(1);
  const limit = 6;
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadFiltered = async () => {
    setIsLoading(true);
    setError("");

    try {
      const offset = (page - 1) * limit;

      const filterParams: Record<string, string> = {};
      if (filters.startDate)
        filterParams.start_date = filters.startDate.toISOString().split("T")[0];
      if (filters.endDate)
        filterParams.end_date = filters.endDate.toISOString().split("T")[0];

      const validated = filtersSchema.safeParse(filterParams);
      if (!validated.success) {
        setError(validated.error.issues[0]?.message || "Invalid filters");
        return;
      }

      const res = await fetchTopRestaurants({
        ...filterParams,
        limit: String(limit),
        offset: String(offset),
      });

      setRestaurants(res.data);
      setHasMore(res.data.length === limit);
    } catch {
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFiltered();
  }, [page]);

  return (
    <>
      <FiltersPanel
        filters={filters}
        setFilters={setFilters}
        onApply={() => {
          setPage(1);
          loadFiltered();
        }}
      />

   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
  {isLoading ? (
    <>
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </>
  ) : error ? (
    <Alert variant="destructive">
      <AlertTitle>{error}</AlertTitle>
    </Alert>
  ) : restaurants.length === 0 ? (
    <p className="text-muted text-center col-span-3">No top restaurants found for selected range.</p>
  ) : (
    restaurants.map((r) => <RestaurantCard key={r.id} restaurant={r} />)
  )}
</div>


      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <Button onClick={() => setPage((p) => p + 1)} disabled={!hasMore}>
          Next
        </Button>
      </div>
    </>
  );
}
