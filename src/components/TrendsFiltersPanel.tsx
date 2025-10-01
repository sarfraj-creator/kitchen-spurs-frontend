"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import DatePicker from "./ui/date-picker";

interface Props {
  filters: {
    startDate: Date | null;
    endDate: Date | null;
    peakHour: number | null;
    minOrderAmount: number | null;
  };
  setFilters: (f: Props["filters"]) => void;
  onApply: () => void;
}

export default function TrendsFiltersPanel({ filters, setFilters, onApply }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <DatePicker
          selected={filters.startDate}
          onSelect={(date) => setFilters({ ...filters, startDate: date })}
          placeholder="Start Date"
        />
        <DatePicker
          selected={filters.endDate}
          onSelect={(date) => setFilters({ ...filters, endDate: date })}
          placeholder="End Date"
        />
      </div>
      <div className="flex gap-4 items-center">
        <label className="text-sm">Peak Hour:</label>
        <Slider
          defaultValue={[filters.peakHour ?? 12]}
          min={0}
          max={23}
          step={1}
          onValueChange={(val) => setFilters({ ...filters, peakHour: val[0] })}
        />
      </div>
      <Input
        type="number"
        placeholder="Min Order Amount"
        value={filters.minOrderAmount ?? ""}
        onChange={(e) =>
          setFilters({ ...filters, minOrderAmount: Number(e.target.value) })
        }
      />
      <Button onClick={onApply}>Apply Filters</Button>
    </div>
  );
}
