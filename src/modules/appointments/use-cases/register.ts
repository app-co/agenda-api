/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IRepoServices } from '@/modules/services/repositories/repo-services';
import { AppError } from '@/shared/app-error/AppError';
import { Appointment } from '@prisma/client';
import { hash } from 'bcryptjs';
import {
  addMinutes,
  daysInWeek,
  format,
  isAfter,
  isMatch,
  isWithinInterval,
  subMinutes,
  subMonths,
} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { condition } from '../conditions';
import { IRepoAppointment } from '../repositories/repo-appointment';
import { isInterval } from '../utils/units-convers';
import { UserNotFound } from './errors/user-not-found';

interface IResponse {
  appointment: Appointment;
}

interface ICreate {
  service: string;
  date: Date | string;
  client_name: string;
  fk_client_id: string;
  fk_provider_id: string;
}

interface IUpdate {
  id: string;
  from?: number;
  at?: number;
  fk_client_id?: string;
  fk_provider_id?: string;
  service?: string;
  client_name: string;
}

export class AppontmentUseCase {
  constructor(
    private repoAppointment: IRepoAppointment,
    private repoService: IRepoServices,
  ) {}

  async create(data: ICreate): Promise<IResponse> {
    const service = await this.repoService.findByName(data.service);
    const appointments = await this.repoAppointment.listAll();
    const startDate = new Date(data.date);

    if (!service) {
      throw new AppError('Serviço não encontrado');
    }

    appointments.forEach(h => {
      const duration = service.duration - 1;
      const { start, end } = h;

      const from = isInterval(addMinutes(startDate, 1), start, end);
      const at = isInterval(addMinutes(startDate, duration), start, end);

      if (from || at) {
        throw new AppError(
          `Horário já agendado: ${format(h.start, 'HH:mm')} - ${format(
            h.end,
            'HH:mm',
          )}`,
        );
      }
    });

    const appointment = await this.repoAppointment.create({
      service: service.name,
      start: startDate,
      end: addMinutes(startDate, service.duration),
      fk_client_id: data.fk_client_id,
      fk_provider_id: data.fk_provider_id,
      client_name: data.client_name,
    });

    return {
      appointment,
    };
  }

  async update(data: IUpdate): Promise<IResponse> {
    const findUser = await this.repoAppointment.findById(data.id);
    if (!findUser) {
      throw new UserNotFound();
    }

    let pass = '';

    if (data.password) {
      pass = await hash(data.password!, 6);
    }

    const dt = {
      ...data,
      password: pass,
    };

    const client = await this.repoAppointment.update(dt, data.id);

    return {
      client,
    };
  }

  async listAll(): Promise<Appointment[]> {
    const list = await this.repoAppointment.listAll();

    return list;
  }

  async byPrestador(providerId: string): Promise<Appointment[]> {
    const find = await this.repoAppointment.findByPrestador(providerId);

    return find;
  }

  async delete(id: string): Promise<Appointment> {
    const find = await this.repoAppointment.findById(id);

    if (!find) {
      throw new UserNotFound();
    }

    const list = await this.repoAppointment.delete(id);

    return list;
  }
}
