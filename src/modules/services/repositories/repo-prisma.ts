/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prisma } from '@/lib/prisma';
import { Prisma, Service } from '@prisma/client';

import { IRepoServices } from './repo-services';

export class PrismaService implements IRepoServices {
  async create(data: Prisma.ServiceUncheckedCreateInput): Promise<Service> {
    const create = await prisma.service.create({
      data,
    });

    return create;
  }

  async findById(id: string): Promise<Service | null> {
    const find = await prisma.service.findUnique({ where: { id } });

    return find;
  }

  async findByName(name: string): Promise<Service | null> {
    const find = await prisma.service.findFirst({ where: { name } });

    return find;
  }

  async delete(id: string): Promise<Service> {
    const del = await prisma.service.delete({ where: { id } });
    return del;
  }

  async listAll(): Promise<Service[]> {
    const list = await prisma.service.findMany();
    return list;
  }

  async update(data: Prisma.ServiceUpdateInput, id: string): Promise<Service> {
    const up = await prisma.service.update({
      where: { id },
      data,
    });

    return up;
  }
}
