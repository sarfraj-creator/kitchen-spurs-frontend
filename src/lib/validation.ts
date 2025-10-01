import { z } from "zod";

export const filtersSchema = z
  .object({
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    peak_hour: z.number().min(0).max(23).optional(),
        min_order_amount: z.number().min(0).optional(),
  })
  .refine(
    (data) => {
      if (!data.start_date || !data.end_date) return true;
      return new Date(data.start_date) <= new Date(data.end_date);
    },
    {
      message: "Start date must be before end date",
      path: ["start_date"],
    }
  );

export type FiltersSchemaType = z.infer<typeof filtersSchema>;
