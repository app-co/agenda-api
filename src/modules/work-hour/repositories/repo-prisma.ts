/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prisma } from '@/lib/prisma';
import { Prisma, Workhour } from '@prisma/client';

import { IRepoWorkhour } from './repo-work-hour';

export class PrismaWordHour implements IRepoWorkhour {
  async create(data: Prisma.WorkhourUncheckedCreateInput): Promise<Workhour> {
    const create = await prisma.workhour.create({
      data,
    });

    return create;
  }

  async findById(id: string): Promise<Workhour | null> {
    const find = await prisma.workhour.findUnique({ where: { id } });

    return find;
  }

  async findByProvider(provider_id: string): Promise<Workhour | null> {
    const find = await prisma.workhour.findFirst({
      where: { fk_provider_id: provider_id },
    });

    return find;
  }

  async delete(id: string): Promise<Workhour> {
    const del = await prisma.workhour.delete({ where: { id } });
    return del;
  }

  async listAll(): Promise<Workhour[]> {
    const list = await prisma.workhour.findMany();
    return list;
  }

  async update(
    data: Prisma.WorkhourUpdateInput,
    id: string,
  ): Promise<Workhour> {
    const up = await prisma.workhour.update({
      where: { id },
      data,
    });

    return up;
  }
}
