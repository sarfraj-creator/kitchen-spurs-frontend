import { Restaurant } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{restaurant.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>📍 {restaurant.location}</p>
        <p>🍽️ {restaurant.cuisine}</p>
        <p>💰 Revenue: ₹{restaurant.orders_sum_order_amount}</p>
        <Button asChild className="mt-2 w-full">
          <Link href={`/restaurant/${restaurant.id}`}>
            📊 View Full Report
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
