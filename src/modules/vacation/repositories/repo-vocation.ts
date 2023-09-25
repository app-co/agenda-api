import { Prisma, Vocation } from '@prisma/client';

export interface IRepoVocation {
  create(data: Prisma.VocationUncheckedCreateInput): Promise<Vocation>;
  listAll(): Promise<Vocation[]>;
  delete(id: string): Promise<void>;
  update(data: Prisma.VocationUncheckedUpdateInput): Promise<Vocation>;
  listByPrestador(prestadorId: string): Promise<Vocation | null>;
  listById(id: string): Promise<Vocation | null>;
}
