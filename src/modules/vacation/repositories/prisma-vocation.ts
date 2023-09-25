import { prisma } from '@/lib/prisma';
import { Prisma, Vocation } from '@prisma/client';

import { IRepoVocation } from './repo-vocation';

export class PrismaVocation implements IRepoVocation {
  async create(data: Prisma.VocationUncheckedCreateInput): Promise<Vocation> {
    const create = await prisma.vocation.create({ data });

    return create;
  }

  async listAll(): Promise<Vocation[]> {
    const list = await prisma.vocation.findMany();

    return list;
  }

  async delete(id: string): Promise<void> {
    await prisma.vocation.delete({ where: { id } });
  }

  async update(data: Prisma.VocationUncheckedUpdateInput): Promise<Vocation> {
    const up = await prisma.vocation.update({ where: { id: data.id }, data });
    return up;
  }

  async listByPrestador(prestadorId: string): Promise<Vocation | null> {
    throw new Error('Method not implemented.');
  }

  async listById(id: string): Promise<Vocation | null> {
    const find = await prisma.vocation.findUnique({ where: { id } });

    return find;
  }
}
