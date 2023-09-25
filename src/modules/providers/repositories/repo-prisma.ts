/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prisma } from '@/lib/prisma';
import { Prisma, Provider } from '@prisma/client';

import { IRepoProvider } from './repo-providers';

export class PrismaProvider implements IRepoProvider {
  async create(data: Prisma.ProviderCreateInput): Promise<Provider> {
    const create = await prisma.provider.create({
      data,
    });

    return create;
  }

  async findById(id: string): Promise<Provider | null> {
    const find = await prisma.provider.findUnique({
      where: { id },
      include: {
        appointment: true,
        Service: true,
        Vocation: true,
        workhour: true,
      },
    });

    return find;
  }

  async findByCnpj(cnpj: string): Promise<Provider | null> {
    const find = await prisma.provider.findUnique({
      where: { cnpj },
      include: {
        appointment: true,
        Service: true,
      },
    });

    return find;
  }

  async findByCpf(cpf: string): Promise<Provider | null> {
    const find = await prisma.provider.findUnique({
      where: { cpf },
      include: {
        appointment: true,
        Service: true,
      },
    });

    return find;
  }

  async findByEmail(email: string): Promise<Provider | null> {
    const find = await prisma.provider.findFirst({
      where: { email },
    });

    return find;
  }

  async delete(id: string): Promise<Provider> {
    const del = await prisma.provider.delete({ where: { id } });
    return del;
  }

  async listAll(): Promise<Provider[]> {
    const list = await prisma.provider.findMany();
    return list;
  }

  async update(
    data: Prisma.ProviderUpdateInput,
    id: string,
  ): Promise<Provider> {
    const up = await prisma.provider.update({
      where: { id },
      data,
    });

    return up;
  }
}
