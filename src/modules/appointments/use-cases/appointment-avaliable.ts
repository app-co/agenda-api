import { prisma } from '@/lib/prisma';
import { AppError } from '@/shared/app-error/AppError';
import { getDate } from 'date-fns';

import { avaliable } from '../conditions';

interface I {
  providerId: string;
  day: string;
  month: string;
  service: string;
}

export class AppointmentAvaliable {
  constructor() {}

  async execute(data: I) {
    const service = await prisma.service.findFirst({
      where: {
        AND: [{ name: data.service }, { fk_provider_id: data.providerId }],
      },
    });

    if (!service) {
      throw new AppError('Serviço não encontrado');
    }

    const { error, agenda } = await avaliable({
      providerId: data.providerId,
      duration: service.duration,
      service: data.service,
      day: Number(data.day),
      month: Number(data.month),
    });

    return agenda;
  }
}
