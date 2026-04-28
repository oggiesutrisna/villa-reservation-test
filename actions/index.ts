"use server";

import { revalidatePath } from "next/cache";
import { VillaService } from "@/services/villa.service";
import { ReservationService } from "@/services/reservation.service";
import { VillaSchema, ReservationSchema, VillaInput, ReservationInput } from "@/schemas";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
}

export async function createVilla(data: VillaInput) {
  try {
    const validated = VillaSchema.parse(data);
    const villa = await VillaService.create(validated);
    revalidatePath("/");
    revalidatePath("/villas");
    return { success: true, data: villa };
  } catch (error: unknown) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function updateVilla(id: string, data: VillaInput) {
  try {
    const validated = VillaSchema.parse(data);
    const villa = await VillaService.update(id, validated);
    revalidatePath("/");
    revalidatePath("/villas");
    return { success: true, data: villa };
  } catch (error: unknown) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function deleteVilla(id: string) {
  try {
    await VillaService.delete(id);
    revalidatePath("/");
    revalidatePath("/villas");
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function createReservation(data: ReservationInput) {
  try {
    const validated = ReservationSchema.parse(data);
    const reservation = await ReservationService.create(validated);
    revalidatePath("/");
    revalidatePath("/reservations");
    revalidatePath(`/villas/${data.villaId}`);
    return { success: true, data: reservation };
  } catch (error: unknown) {
    return { success: false, error: getErrorMessage(error) };
  }
}
