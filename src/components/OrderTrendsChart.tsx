"use client";

import { RestaurantTrends } from "@/lib/types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  data: RestaurantTrends[];
}

export default function OrderTrendsChart({ data }: Props) {
  if (data.length === 0) {
    return <p className="text-muted text-center">No trend data available for this range.</p>;
  }

  const labels = data.map((d) => d.day);
  const revenue = data.map((d) => d.total);
  const orders = data.map((d) => d.order_count);
  const avgValue = data.map((d) => d.average_order_value);
  const peakHour = data.map((d) => d.peak_hour);

  return (
    <div className="space-y-6 h-64">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Revenue (₹)",
              data: revenue,
              borderColor: "#4f46e5",
              backgroundColor: "rgba(79,70,229,0.2)",
              tension: 0.3,
            },
            {
              label: "Orders",
              data: orders,
              borderColor: "#10b981",
              backgroundColor: "rgba(16,185,129,0.2)",
              tension: 0.3,
            },
            {
              label: "Avg Order Value (₹)",
              data: avgValue,
              borderColor: "#f59e0b",
              backgroundColor: "rgba(245,158,11,0.2)",
              tension: 0.3,
            },
            {
              label: "Peak Hour",
              data: peakHour,
              borderColor: "#ef4444",
              backgroundColor: "rgba(239,68,68,0.2)",
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
              },
            },
          },
        }}
      />
    </div>
  );
}
