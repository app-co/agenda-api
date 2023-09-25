import { PrismaVocation } from '../repositories/prisma-vocation';
import { VocatotionUseCase } from '../use-cases/vocation-use-case';

export function makeVocation() {
  const repoVocation = new PrismaVocation();

  const make = new VocatotionUseCase(repoVocation);

  return make;
}
