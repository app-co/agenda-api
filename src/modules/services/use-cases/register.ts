/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AppError } from '@/shared/app-error/AppError';
import { Prisma, Service } from '@prisma/client';

import { IRepoServices } from '../repositories/repo-services';
import { ServiceExist } from './errors/service-exist';
import { ServiceNotFound } from './errors/service-not-found';

interface IResponse {
  client: Service;
}

interface IUpdate {
  id: string;
  name?: string;
  amount?: number;
  duration?: number;
  image?: string;
}

export class ServiceUseCase {
  constructor(private repoService: IRepoServices) {}

  async create(data: Prisma.ServiceUncheckedCreateInput): Promise<IResponse> {
    const findService = await this.repoService.findByName(data.name);

    if (findService) {
      throw new AppError('Serviço ja cadastrado');
    }

    const client = await this.repoService.create({
      name: data.name,
      amount: data.amount,
      fk_provider_id: data.fk_provider_id,
      description: data.description,
      duration: data.duration,
    });

    return {
      client,
    };
  }

  async update(data: IUpdate): Promise<IResponse> {
    const findService = await this.repoService.findById(data.id);

    if (!findService) {
      throw new ServiceNotFound();
    }

    const client = await this.repoService.update(data, data.id);

    return {
      client,
    };
  }

  async listAll(): Promise<Service[]> {
    const list = await this.repoService.listAll();

    return list;
  }

  async delete(id: string): Promise<Service> {
    const find = await this.repoService.findById(id);

    if (!find) {
      throw new ServiceNotFound();
    }

    const list = await this.repoService.delete(id);

    return list;
  }
}
