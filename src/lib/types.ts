export interface Restaurant {
  id: number;
  name: string;
  location: string;
  cuisine: string;
  orders_sum_order_amount: string;
}

export interface Filters {
  startDate: Date | null;
  endDate: Date | null;
}


export interface RestaurantTrends {
  day: string; 
  total: number;
  order_count: number;
  average_order_value: number;
  peak_hour: number;
}
