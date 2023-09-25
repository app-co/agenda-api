import { Prisma, Client } from '@prisma/client';

export interface IRepoClient {
  create(data: Prisma.ClientCreateInput): Promise<Client>;
  findById(id: string): Promise<Client | null>;
  findByEmail(email: string): Promise<Client | null>;
  delete(id: string): Promise<Client>;
  listAll(): Promise<Client[]>;
  update(data: Prisma.ClientUpdateInput, id: string): Promise<Client>;
}
