import { AppError } from '@/shared/app-error/AppError';
import { VocationType } from '@prisma/client';
import { set } from 'date-fns';

import { IRepoVocation } from '../repositories/repo-vocation';

interface I {
  prestadorId: string;
  start: string;
  end: string;
  weekend?: number[];
  type: VocationType;
}
export class VocatotionUseCase {
  constructor(private repoVocation: IRepoVocation) {}

  async register(data: I) {
    const [day, month, year, startHour, startMin] = data.start
      .split(':')
      .map(Number);

    const [endday, endmonth, endyear, endHour, endMin] = data.end
      .split(':')
      .map(Number);

    let start = null;
    let end = null;

    start = set(new Date(), {
      date: day,
      hours: startHour,
      minutes: startMin,
      month: month - 1,
      year,
    });

    end = set(start, {
      hours: endHour,
      minutes: endMin,
    });

    const vocation = await this.repoVocation.create({
      fk_provider_id: data.prestadorId,
      type: data.type,
      start,
      end,
      weekend: data.weekend,
    });

    return vocation;
  }

  async listAll() {}

  async delete(id: string): Promise<void> {
    const vocation = await this.repoVocation.listById(id);

    if (!vocation) {
      throw new AppError('Folga não encontrada');
    }

    await this.repoVocation.delete(id);
  }

  async update() {}
}
