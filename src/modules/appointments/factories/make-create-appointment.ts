import { PrismaService } from '@/modules/services/repositories/repo-prisma';

import { PrismaAppointment } from '../repositories/repo-prisma';
import { AppontmentUseCase } from '../use-cases/register';

export function makeCreateAppointment() {
  const repoService = new PrismaService();
  const repoAppointment = new PrismaAppointment();

  const make = new AppontmentUseCase(repoAppointment, repoService);

  return make;
}
