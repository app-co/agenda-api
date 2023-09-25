import { Prisma, Service } from '@prisma/client';

export interface IRepoServices {
  create(data: Prisma.ServiceUncheckedCreateInput): Promise<Service>;
  findById(id: string): Promise<Service | null>;
  findByName(name: string): Promise<Service | null>;
  delete(id: string): Promise<Service>;
  listAll(): Promise<Service[]>;
  update(data: Prisma.ServiceUpdateInput, id: string): Promise<Service>;
}
