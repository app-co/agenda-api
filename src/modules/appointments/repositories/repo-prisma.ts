/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prisma } from '@/lib/prisma';
import { Prisma, Appointment } from '@prisma/client';

import { IRepoAppointment } from './repo-appointment';

export class PrismaAppointment implements IRepoAppointment {
  async create(
    data: Prisma.AppointmentUncheckedCreateInput,
  ): Promise<Appointment> {
    const create = await prisma.appointment.create({
      data: {
        client_name: data.client_name,
        fk_client_id: data.fk_client_id,
        fk_provider_id: data.fk_provider_id,
        service: data.service,
        start: data.start,
        end: data.end,
      },
    });

    return create;
  }

  async findById(id: string): Promise<Appointment | null> {
    const find = await prisma.appointment.findUnique({ where: { id } });

    return find;
  }

  async findByPrestador(fk_provider_id: string): Promise<Appointment[]> {
    const find = await prisma.appointment.findMany({
      where: { fk_provider_id },
    });

    return find;
  }

  async findByClient(fk_client_id: string): Promise<Appointment | null> {
    const find = await prisma.appointment.findFirst({
      where: { fk_client_id },
    });

    return find;
  }

  async delete(id: string): Promise<Appointment> {
    const del = await prisma.appointment.delete({ where: { id } });
    return del;
  }

  async listAll(): Promise<Appointment[]> {
    const list = await prisma.appointment.findMany();
    return list;
  }

  async update(
    data: Prisma.AppointmentUpdateInput,
    id: string,
  ): Promise<Appointment> {
    const up = await prisma.appointment.update({
      where: { id },
      data,
    });

    return up;
  }
}
