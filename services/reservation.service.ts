import { prisma } from "@/lib/prisma";
import { ReservationInput } from "@/schemas";

export class ReservationService {
  static async create(data: ReservationInput) {
    const { villaId, checkIn, checkOut } = data;

    const overlap = await prisma.reservation.findFirst({
      where: {
        villaId,
        OR: [
          {
            checkIn: { lte: checkIn },
            checkOut: { gt: checkIn },
          },
          {
            checkIn: { lt: checkOut },
            checkOut: { gte: checkOut },
          },
          {
            checkIn: { gte: checkIn },
            checkOut: { lte: checkOut },
          },
        ],
      },
    });

    if (overlap) {
      throw new Error("The selected dates overlap with an existing reservation for this villa.");
    }

    return prisma.reservation.create({
      data,
    });
  }

  static async getAll() {
    return prisma.reservation.findMany({
      include: {
        villa: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { checkIn: "desc" },
    });
  }

  static async getByVillaId(villaId: string) {
    return prisma.reservation.findMany({
      where: { villaId },
      orderBy: { checkIn: "asc" },
    });
  }
}
