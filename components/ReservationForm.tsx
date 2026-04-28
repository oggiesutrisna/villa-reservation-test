"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createReservation } from "@/actions";
import { ReservationInput } from "@/schemas";

interface Props {
  villas: { id: string; name: string }[];
}

export default function ReservationForm({ villas }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const data: ReservationInput = {
      villaId: formData.get("villaId") as string,
      checkIn: new Date(formData.get("checkIn") as string),
      checkOut: new Date(formData.get("checkOut") as string),
      guestName: formData.get("guestName") as string,
      guestEmail: formData.get("guestEmail") as string,
    };

    try {
      const result = await createReservation(data);

      if (result.success) {
        (e.target as HTMLFormElement).reset();
        router.refresh();
        alert("Reservation confirmed!");
      } else {
        alert(`Error: ${result.error}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-sm bg-white dark:bg-zinc-900">
      <h2 className="text-xl font-bold">Book a Villa</h2>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Select Villa</label>
        <select name="villaId" required className="p-2 border rounded bg-transparent">
          <option value="">Select a unit...</option>
          {villas.map((villa) => (
            <option key={villa.id} value={villa.id}>{villa.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Check-in</label>
          <input name="checkIn" type="date" required className="p-2 border rounded bg-transparent" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Check-out</label>
          <input name="checkOut" type="date" required className="p-2 border rounded bg-transparent" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Guest Name</label>
        <input name="guestName" required className="p-2 border rounded bg-transparent" placeholder="John Doe" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Guest Email</label>
        <input name="guestEmail" type="email" required className="p-2 border rounded bg-transparent" placeholder="john@example.com" />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-black text-white p-2 rounded hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black"
      >
        {loading ? "Confirming..." : "Book Now"}
      </button>
    </form>
  );
}
