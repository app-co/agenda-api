import { Prisma, Workhour } from '@prisma/client';

export interface IRepoWorkhour {
  create(data: Prisma.WorkhourUncheckedCreateInput): Promise<Workhour>;
  findById(id: string): Promise<Workhour | null>;
  findByProvider(provider_id: string): Promise<Workhour | null>;
  delete(id: string): Promise<Workhour>;
  listAll(): Promise<Workhour[]>;
  update(data: Prisma.WorkhourUpdateInput, id: string): Promise<Workhour>;
}
