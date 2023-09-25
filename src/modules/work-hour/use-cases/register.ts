/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IRepoProvider } from '@/modules/providers/repositories/repo-providers';
import { ProviderNotFound } from '@/modules/providers/use-cases/errors/provider-not-found';
import { Prisma, Service, workhour } from '@prisma/client';
import { number, string } from 'zod';

import { IRepoServices } from '../repositories/repo-services';
import { IRepoWorkhour } from '../repositories/repo-work-hour';
import { ServiceExist } from './errors/service-exist';
import { ServiceNotFound } from './errors/service-not-found';

interface IResponse {
  work: workhour;
}

interface ICreate {
  from: number;
  at: number;
  week: string[];
  fk_provider_id: string;
}

interface IUpdate {
  id: string;
  name?: string;
  amount?: number;
  duration?: number;
  image?: string;
  week?: any[];
}

export class WorkHourRegisterUseCase {
  constructor(
    private repoWork: IRepoWorkhour,
    private repoProvider: IRepoProvider,
  ) {}

  async create(data: ICreate): Promise<IResponse> {
    const provider = await this.repoProvider.findById(data.fk_provider_id);
    const workHour = await this.repoWork.findByProvider(data.fk_provider_id);

    console.log(workHour);

    if (!provider) {
      throw new ProviderNotFound();
    }

    let work = null;

    if (!workHour) {
      work = await this.repoWork.create(data);
    } else {
      work = await this.repoWork.update(data, workHour.id);
    }

    return {
      work,
    };
  }

  async update(data: IUpdate): Promise<IResponse> {
    const findService = await this.repoWork.findById(data.id);

    if (!findService) {
      throw new ServiceNotFound();
    }

    const client = await this.repoWork.update(data, data.id);

    return {
      client,
    };
  }

  async listAll(): Promise<Service[]> {
    const list = await this.repoWork.listAll();

    return list;
  }

  async delete(id: string): Promise<Service> {
    const find = await this.repoWork.findById(id);

    if (!find) {
      throw new ServiceNotFound();
    }

    const list = await this.repoWork.delete(id);

    return list;
  }
}
