"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createVilla } from "@/actions";
import { VillaInput } from "@/schemas";

export default function VillaForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data: VillaInput = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      location: formData.get("location") as string,
      capacity: Number(formData.get("capacity")),
    };

    try {
      await createVilla(data);
      (e.target as HTMLFormElement).reset();
      router.refresh();
      alert("Villa created successfully!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-sm bg-white dark:bg-zinc-900">
      <h2 className="text-xl font-bold">Add New Villa</h2>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Name</label>
        <input name="name" required className="p-2 border rounded bg-transparent" placeholder="Antique Villa Ubud" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Price per Night</label>
          <input name="price" type="number" required className="p-2 border rounded bg-transparent" placeholder="1500000" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Capacity</label>
          <input name="capacity" type="number" required className="p-2 border rounded bg-transparent" placeholder="4" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Location</label>
        <input name="location" required className="p-2 border rounded bg-transparent" placeholder="Canggu, Bali, Indonesia" />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-black text-white p-2 rounded hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black"
      >
        {loading ? "Creating..." : "Create Villa"}
      </button>
    </form>
  );
}
