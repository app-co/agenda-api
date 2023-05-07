/* eslint-disable import/no-extraneous-dependencies */
import { InMemoryUser } from '@/modules/repositories/in-memory-user';
import { PrismaUserRepository } from '@/modules/repositories/prisma-users-repository';
import { compare } from 'bcryptjs';
import { describe, expect, test, it } from 'vitest';

import { UserAlredyExist } from './errors/user-alredy-existes-error';
import { RegisterUseCase } from './register';

describe('Register Use case', () => {
  it('Deve poder criar uma conta', async () => {
    const repo = new InMemoryUser();
    const caseUser = new RegisterUseCase(repo);

    const { user } = await caseUser.execute({
      nome: 'wil',
      email: 'w@w.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('shold hash user password upon register', async () => {
    const repo = new InMemoryUser();
    const caseUser = new RegisterUseCase(repo);

    const { user } = await caseUser.execute({
      nome: 'wil',
      email: 'w@w.com',
      password: '123456',
    });

    const ispass = await compare('123456', user.password_hash);

    expect(ispass).toBe(true);
  });

  it('Não pode registrar com o mesmo email', async () => {
    const repo = new InMemoryUser();
    const caseUser = new RegisterUseCase(repo);

    await caseUser.execute({
      nome: 'wil',
      email: 'w@w.com',
      password: '123456',
    });

    await expect(() =>
      caseUser.execute({
        nome: 'wil',
        email: 'w@w.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlredyExist);
  });
});
