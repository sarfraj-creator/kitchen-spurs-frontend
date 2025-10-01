"use client";

import { Button } from "@/components/ui/button";
import { Filters } from "@/lib/types";
import DatePicker from "./ui/date-picker";

interface Props {
  filters: Filters;
  setFilters: (f: Filters) => void;
  onApply: () => void;
}

export default function FiltersPanel({ filters, setFilters, onApply }: Props) {
  return (
    <div className="flex gap-4 items-end">
      <DatePicker
        selected={filters.startDate}
        onSelect={(date: Date) => setFilters({ ...filters, startDate: date })}
        placeholder="Start Date"
      />
      <DatePicker
        selected={filters.endDate}
        onSelect={(date: Date) => setFilters({ ...filters, endDate: date })}
        placeholder="End Date"
      />
      <Button
        onClick={onApply}
        disabled={Boolean(
          filters.startDate &&
          filters.endDate &&
          filters.startDate > filters.endDate
        )}
      >
        Apply Filters
      </Button>
    </div>
  );
}
