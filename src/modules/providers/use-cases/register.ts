/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AppError } from '@/shared/app-error/AppError';
import { Prisma, Provider } from '@prisma/client';
import { compare, hash } from 'bcryptjs';

import { IRepoProvider } from '../repositories/repo-providers';
import { CnpjAlredyExist } from './errors/cNPJ-alredy-exist';
import { CpfAlredyExist } from './errors/cpf-alredy-exist';
import { ProviderExist } from './errors/provider-exist';
import { ProviderNotFound } from './errors/provider-not-found';

interface IResponse {
  provider: Provider;
}

interface IUpdate {
  id: string;
  name?: string;
  password?: string;
  email?: string;
  avatar?: string;
  cell?: string;
  cnpj?: string;
  cpf?: string;
  city?: string;
  locality?: string;
  home_number?: string;
  postal_code?: string;
  region_code?: string;
  razao_social?: string;
}

export class ProviderUseCase {
  constructor(private repoProvider: IRepoProvider) {}

  async create(data: Prisma.ProviderCreateInput): Promise<IResponse> {
    const findProvider = await this.repoProvider.findByEmail(data.email);
    const findByCnpj = await this.repoProvider.findByCnpj(data.cnpj);
    const findByCpf = await this.repoProvider.findByCpf(data.cpf);

    if (findProvider) {
      throw new ProviderExist();
    }

    if (findByCnpj) {
      throw new CnpjAlredyExist();
    }

    if (findByCpf) {
      throw new CpfAlredyExist();
    }

    const pass = await hash(data.password, 6);
    const dt = {
      ...data,
      password: pass,
    };

    const provider = await this.repoProvider.create(dt);

    return {
      provider,
    };
  }

  async update(data: IUpdate): Promise<IResponse> {
    const provider = await this.repoProvider.findById(data.id);

    if (!provider) {
      throw new ProviderNotFound();
    }

    let pass = provider.password;

    if (data.password) {
      pass = await hash(data.password, 6);
    }

    if (data.email) {
      const findProvider = await this.repoProvider.findByEmail(data.email);
      if (findProvider) {
        throw new ProviderExist();
      }
    }

    if (data.cpf) {
      const findByCnpj = await this.repoProvider.findByCnpj(data.cnpj!);

      if (findByCnpj) {
        throw new CnpjAlredyExist();
      }
    }

    if (data.cnpj) {
      const findByCpf = await this.repoProvider.findByCpf(cpf);
      if (findByCpf) {
        throw new CpfAlredyExist();
      }
    }

    const dt = {
      ...data,
      password: pass,
    };

    const client = await this.repoProvider.update(dt, data.id);

    return {
      client,
    };
  }

  async listAll(): Promise<Provider[]> {
    const list = await this.repoProvider.listAll();

    return list;
  }

  async listById(id: string): Promise<Provider> {
    const list = await this.repoProvider.findById(id);

    if (!list) {
      throw new ProviderNotFound();
    }

    return list;
  }

  async delete(id: string): Promise<Provider> {
    const find = await this.repoProvider.findById(id);

    if (!find) {
      throw new ProviderNotFound();
    }

    const list = await this.repoProvider.delete(id);

    return list;
  }

  async session({ email, password }: IProps): Promise<IResponse> {
    const provider = await this.repoProvider.findByEmail(email);

    if (!provider) {
      throw new AppError('Prestador não encontrado');
    }

    const compareHash = await compare(password, provider.password);

    if (!compareHash) {
      throw new AppError('Senha inválida');
    }

    return {
      provider,
    };
  }
}
