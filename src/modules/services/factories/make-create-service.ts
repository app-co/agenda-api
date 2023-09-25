import { PrismaService } from '../repositories/repo-prisma';
import { ServiceUseCase } from '../use-cases/register';

export function makeServiceCreate() {
  const repo = new PrismaService();
  const make = new ServiceUseCase(repo);

  return make;
}
