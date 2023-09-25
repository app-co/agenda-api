import { PrismaProvider } from '../repositories/repo-prisma';
import { ProviderUseCase } from '../use-cases/register';

export function makeProvider() {
  const repo = new PrismaProvider();

  const make = new ProviderUseCase(repo);

  return make;
}
