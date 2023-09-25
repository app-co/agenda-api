/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Client, Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';

import { IRepoClient } from '../repositories/repo-client';
import { UserAlredyExist } from './errors/user-alredy-existes-error';
import { UserNotFound } from './errors/user-not-found';

interface IResponse {
  client: Client;
}

interface IUpdate {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
  cell?: string;
}

export class ClientUseCase {
  constructor(private repoClient: IRepoClient) {}

  async create({
    name,
    email,
    password,
    cell,
  }: Prisma.ClientCreateInput): Promise<IResponse> {
    const findUser = await this.repoClient.findByEmail(email);
    if (findUser) {
      throw new UserAlredyExist();
    }
    const password_hash = await hash(password, 6);

    const client = await this.repoClient.create({
      name,
      email,
      cell,
      password: password_hash,
    });

    return {
      client,
    };
  }

  async update(data: IUpdate): Promise<IResponse> {
    const findUser = await this.repoClient.findById(data.id);
    if (!findUser) {
      throw new UserNotFound();
    }

    let pass = data.password;

    if (data.password) {
      pass = await hash(data.password!, 6);
    }

    const dt = {
      ...data,
      password: pass,
    };

    const client = await this.repoClient.update(dt, data.id);

    return {
      client,
    };
  }

  async listAll(): Promise<Client[]> {
    const list = await this.repoClient.listAll();

    return list;
  }

  async delete(id: string): Promise<Client> {
    const find = await this.repoClient.findById(id);

    if (!find) {
      throw new UserNotFound();
    }

    const list = await this.repoClient.delete(id);

    return list;
  }
}
