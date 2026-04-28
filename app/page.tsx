import { VillaService } from "@/services/villa.service";
import { ReservationService } from "@/services/reservation.service";
import VillaForm from "@/components/VillaForm";
import ReservationForm from "@/components/ReservationForm";

export const dynamic = "force-dynamic";

export default async function VillaManagementPage() {
  const villas = await VillaService.getAll();
  const reservations = await ReservationService.getAll();

  return (
    <div className="container mx-auto py-10 px-4 space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Villa Management System</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Manage your units and handle reservations with strict validation.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <section className="space-y-6">
          <div className="bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
             <VillaForm />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Existing Villas</h2>
            {villas.length === 0 ? (
              <p className="text-zinc-500 italic">No villas added yet.</p>
            ) : (
              <div className="grid gap-4">
                {villas.map((villa) => (
                  <div key={villa.id} className="p-4 border rounded-lg flex justify-between items-center bg-white dark:bg-zinc-900 shadow-sm">
                    <div>
                      <h3 className="font-bold text-lg">{villa.name}</h3>
                      <p className="text-sm text-zinc-500">{villa.location} • Capacity: {villa.capacity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(villa.price)}
                      </p>
                      <p className="text-xs text-zinc-400 uppercase tracking-wider">per night</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="space-y-6 lg:sticky lg:top-10">
          <div className="bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
            <ReservationForm villas={villas.map(v => ({ id: v.id, name: v.name }))} />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Existing Reservations</h2>
            {reservations.length === 0 ? (
              <p className="text-zinc-500 italic">No reservations found.</p>
            ) : (
              <div className="grid gap-4">
                {reservations.map((res) => (
                  <div key={res.id} className="p-4 border rounded-lg bg-white dark:bg-zinc-900 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{res.villa.name}</h3>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{res.guestName}</p>
                      </div>
                      <div className="text-right text-xs text-zinc-400">
                        {new Date(res.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded">
                        <p className="text-xs text-zinc-500 uppercase">Check In</p>
                        <p className="font-semibold">{new Date(res.checkIn).toLocaleDateString()}</p>
                      </div>
                      <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded">
                        <p className="text-xs text-zinc-500 uppercase">Check Out</p>
                        <p className="font-semibold">{new Date(res.checkOut).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-zinc-500 italic">{res.guestEmail}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
