import { PrismaProvider } from '@/modules/providers/repositories/repo-prisma';

import { PrismaWordHour } from '../repositories/repo-prisma';
import { WorkHourRegisterUseCase } from '../use-cases/register';

export function makeRegisterWorkhour() {
  const repoWork = new PrismaWordHour();
  const repoProvider = new PrismaProvider();

  const make = new WorkHourRegisterUseCase(repoWork, repoProvider);

  return make;
}
