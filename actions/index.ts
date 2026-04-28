"use server";

import { revalidatePath } from "next/cache";
import { VillaService } from "@/services/villa.service";
import { ReservationService } from "@/services/reservation.service";
import { VillaSchema, ReservationSchema, VillaInput, ReservationInput } from "@/schemas";

export async function createVilla(data: VillaInput) {
  const validated = VillaSchema.parse(data);
  const villa = await VillaService.create(validated);
  revalidatePath("/");
  revalidatePath("/villas");
  return villa;
}

export async function updateVilla(id: string, data: VillaInput) {
  const validated = VillaSchema.parse(data);
  const villa = await VillaService.update(id, validated);
  revalidatePath("/");
  revalidatePath("/villas");
  return villa;
}

export async function deleteVilla(id: string) {
  await VillaService.delete(id);
  revalidatePath("/");
  revalidatePath("/villas");
}

export async function createReservation(data: ReservationInput) {
  try {
    const validated = ReservationSchema.parse(data);
    const reservation = await ReservationService.create(validated);
    revalidatePath("/");
    revalidatePath("/reservations");
    revalidatePath(`/villas/${data.villaId}`);
    return { success: true, data: reservation };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
