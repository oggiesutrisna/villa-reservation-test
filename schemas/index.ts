import { z } from "zod";

export const VillaSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().positive("Price must be positive"),
  location: z.string().min(1, "Location is required"),
  capacity: z.coerce.number().int().positive("Capacity must be at least 1"),
});

export type VillaInput = z.infer<typeof VillaSchema>;

export const ReservationSchema = z.object({
  villaId: z.string().min(1, "Villa ID is required"),
  checkIn: z.coerce.date().refine((date) => date >= new Date(), {
    message: "Check-in date cannot be in the past",
  }),
  checkOut: z.coerce.date(),
  guestName: z.string().min(1, "Guest name is required"),
  guestEmail: z.string().email("Invalid email address"),
}).refine((data) => data.checkOut > data.checkIn, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});

export type ReservationInput = z.infer<typeof ReservationSchema>;
