import { prisma } from "@/lib/prisma";
import { VillaInput } from "@/schemas";

export class VillaService {
  static async getAll() {
    return prisma.villa.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async getById(id: string) {
    return prisma.villa.findUnique({
      where: { id },
    });
  }

  static async create(data: VillaInput) {
    return prisma.villa.create({
      data,
    });
  }

  static async update(id: string, data: VillaInput) {
    return prisma.villa.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.villa.delete({
      where: { id },
    });
  }
}
