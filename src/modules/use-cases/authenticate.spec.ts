/* eslint-disable import/no-extraneous-dependencies */
import { InMemoryUser } from '@/modules/repositories/in-memory-user';
import { PrismaUserRepository } from '@/modules/repositories/prisma-users-repository';
import { compare, hash } from 'bcryptjs';
import { describe, expect, test, it } from 'vitest';

import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentials } from './errors/invalide-auth-credentials';
import { UserAlredyExist } from './errors/user-alredy-existes-error';
import { RegisterUseCase } from './register';

describe('Autenticação de usuário', () => {
  it('Deve poder se autenticar', async () => {
    const repo = new InMemoryUser();
    const caseUser = new AuthenticateUseCase(repo);

    await repo.create({
      nome: 'wil',
      email: 'w@wil.com',
      password_hash: await hash('1234', 6),
    });

    const { user } = await caseUser.execute({
      email: 'w@wil.com',
      password: '1234',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('Nao deve poder autenticar com email invalido', async () => {
    const repo = new InMemoryUser();
    const caseUser = new AuthenticateUseCase(repo);

    await repo.create({
      nome: 'wil',
      email: 'w@wil.com',
      password_hash: await hash('1234', 6),
    });

    await expect(() =>
      caseUser.execute({
        email: 'w@wi.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });

  it('Nao deve poder se autenticar com senha invalida', async () => {
    const repo = new InMemoryUser();
    const caseUser = new AuthenticateUseCase(repo);

    await repo.create({
      nome: 'wil',
      email: 'w@wil.com',
      password_hash: await hash('1234', 6),
    });

    await expect(() =>
      caseUser.execute({
        email: 'w@wil.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });
});
