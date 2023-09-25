/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prisma } from '@/lib/prisma';
import { Prisma, Client } from '@prisma/client';

import { IRepoClient } from './repo-client';

export class PrismaClient implements IRepoClient {
  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    const create = await prisma.client.create({
      data,
    });

    return create;
  }

  async findById(id: string): Promise<Client | null> {
    const find = await prisma.client.findUnique({ where: { id } });

    return find;
  }

  async findByEmail(email: string): Promise<Client | null> {
    const find = await prisma.client.findFirst({ where: { email } });

    return find;
  }

  async delete(id: string): Promise<Client> {
    const del = await prisma.client.delete({ where: { id } });
    return del;
  }

  async listAll(): Promise<Client[]> {
    const list = await prisma.client.findMany();
    return list;
  }

  async update(data: Prisma.ClientUpdateInput, id: string): Promise<Client> {
    const up = await prisma.client.update({
      where: { id },
      data,
    });

    return up;
  }
}
