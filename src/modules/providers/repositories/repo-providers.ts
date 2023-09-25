import { Prisma, Provider } from '@prisma/client';

export interface IRepoProvider {
  create(data: Prisma.ProviderCreateInput): Promise<Provider>;
  findById(id: string): Promise<Provider | null>;
  findByCnpj(id: string): Promise<Provider | null>;
  findByCpf(id: string): Promise<Provider | null>;
  findByEmail(email: string): Promise<Provider | null>;
  delete(id: string): Promise<Provider>;
  listAll(): Promise<Provider[]>;
  update(data: Prisma.ProviderUpdateInput, id: string): Promise<Provider>;
}
